In aws elasticsearch, we have 15 indices. Two are the big ones. We face high JVM usage, Insufficient GC & yellow cluster   │
│    status frequently. The big index - 'hudai' size is 586 GiB. Where it have 5 primary shards and 1 replicas per. It has      │
│    total 10 shards. If we increase the RAM from 32 GiB to 64 GiB does it solve the issue though the shard size is out of      │
│    110GiB?                                                                                                                    │
╰───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯

✦ That's a classic and excellent AWS Elasticsearch/OpenSearch question. The situation you're describing is very common when an
  index grows beyond its initial design.

  Let's break it down.

  The Direct Answer


  No, simply increasing the instance RAM from 32 GiB to 64 GiB is unlikely to solve the root cause of your problems. It might
  provide temporary relief and reduce the frequency of yellow clusters, but the underlying issue will remain and likely reappear
  as the index grows further.

  The Core Problem: Shard Size


  The main issue is what you've already identified: the shard size. A single primary shard in your hudai index is approximately
  ~117 GiB (586 GiB / 5 primaries).

  This is far beyond the AWS and general Elasticsearch best practice, which recommends keeping shard sizes between 10 GiB and 50
  GiB.

  Why are 110+ GiB shards so problematic?


   1. Memory to Data Ratio: A node's heap memory (roughly 50% of its RAM, so ~16 GiB for your 32 GiB instances) is used for
      indexing buffers, query caches, aggregations, and managing the shard's metadata. A single massive shard can easily overwhelm
      the heap during heavy indexing or complex queries, leading directly to the high JVM usage and GC thrashing you're seeing.
      Doubling the RAM gives you a ~32 GiB heap, which is better, but still under-provisioned for a shard of that magnitude.
   2. Recovery and Rebalancing: If a node fails, the cluster has to copy that 117 GiB shard over the network to another node. This
      is a slow, resource-intensive process that puts the cluster under heavy strain and can lead to prolonged yellow or red
      states.
   3. Segment Merging: Elasticsearch periodically merges smaller data segments within a shard into larger ones. On a huge shard,
      these merge operations are massive, consuming significant CPU and I/O, which contributes to cluster instability.

  The Recommended Solution: Re-architecting the Index


  The correct long-term solution is to reduce the shard size. Since you cannot change the primary shard count of an existing
  index, you must create a new index with a better configuration and move the data over.

  Here is the strategic approach:

  Step 1: Stabilize the Cluster (Your Idea)

  First, you need a stable environment to perform the necessary work. So, your idea of scaling up is a good temporary first
  step.


   * Action: Increase the instance RAM to 64 GiB (e.g., from r6g.large.elasticsearch to r6g.xlarge.elasticsearch). This will give
     you more heap space and reduce the immediate GC pressure, making the cluster more stable for the next steps.


  Step 2: Plan and Create a New Index

  Design a new index to replace hudai. The goal is to get the shard size within the 10-50 GiB range.


   * Calculation: Let's target an average shard size of 30 GiB.
      586 GiB / 30 GiB/shard ≈ 19.5 shards
   * Action: Create a new index, let's call it hudai-v2, with 20 primary shards.


    1     PUT /hudai-v2
    2     {
    3       "settings": {
    4         "index": {
    5           "number_of_shards": 20,
    6           "number_of_replicas": 1
    7         }
    8       },
    9       "mappings": {
   10         // Copy the mappings from your original 'hudai' index here
   11       }
   12     }


  Step 3: Migrate the Data with the Reindex API

  Use the built-in _reindex API to copy documents from the old index to the new one. This process is robust and can be run in
  the background.


   * Action:


   1     POST /_reindex?wait_for_completion=false
   2     {
   3       "source": {
   4         "index": "hudai"
   5       },
   6       "dest": {
   7         "index": "hudai-v2"
   8       }
   9     }

      The wait_for_completion=false flag runs this as a background task. You can monitor its progress with the Task API using
  the task ID returned by the command.

  Step 4: Switch Over and Clean Up


  Once the reindexing is complete, update your application to read from and write to the new hudai-v2 index. After verifying
  that everything works correctly, you can safely delete the old index to reclaim disk space.


   * Action:
       1. Update application configuration (e.g., hudai -> hudai-v2).
       2. Verify functionality.
       3. DELETE /hudai


  By doing this, you will have 20 primary shards of ~30 GiB each, which is a much healthier and more scalable configuration that
  will resolve your JVM, GC, and cluster stability issues.