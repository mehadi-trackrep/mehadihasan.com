Regarding unassigned shards (replicas) in data nodes for a particular index or indices, the cluster takes a protective action to keep the nodes alive.
In this situation, the ES cluster gives a classic CircuitBreakingException. It's a protective measure to prevent a node from running out of JVM heap memory and crashing.
  Diagnosis:
  The error message tells us the exact problem:
   * What: A shard recovery operation is failing.
   * Why: The node attempting the recovery (iSvZ8i7QSFy7EXxSWrjnAw) doesn't have enough heap memory to complete the process. The parent circuit breaker has tripped.
   * The Culprit: The required memory (15.2gb) is just over the limit (15.1gb). A significant portion of the heap is already being used by fielddata (3.2gb).
  High fielddata usage is often the root cause of this kind of memory pressure. fielddata is used for sorting and aggregating on analyzed text fields, and it loads all
  the term data into memory.
  How to Fix It
  Here are the steps to resolve this, from immediate relief to long-term solutions.
  1. Immediate Fix: Clear the Cache
  You can temporarily free up memory by clearing the fielddata cache. This might give the node enough headroom to complete the recovery and get your cluster back to a
  "green" state.
  Run this command in Dev Tools:
   1 POST /_cache/clear?fielddata=true
  After clearing the cache, you can prompt the cluster to try assigning the shard again:
   1 POST /_cluster/reroute?retry_failed=true
  This is a temporary fix. If your query patterns don't change, the fielddata will be rebuilt and the problem will likely return.
  2. Long-Term Solution: Reduce Fielddata Usage
  The best long-term solution is to reduce your reliance on fielddata.
   * Use Doc Values: For sorting and aggregations on text, you should use doc_values on a keyword field, not fielddata on a text field. doc_values are stored on disk and
     are far more memory-efficient.
   * Check Your Mappings: Inspect the mapping of the data_v0.03 index.
   1     GET /data_v0.03/_mapping
      Look for fields of type text that you are using for aggregations or sorting. You likely need to change your mapping to include a .keyword sub-field for those
  operations.
   * Example of a better mapping:
   1     "my_text_field": {
   2       "type": "text",
   3       "fields": {
   4         "keyword": {
   5           "type": "keyword",
   6           "ignore_above": 256
   7         }
   8       }
   9     }
      With this mapping, you would use my_text_field for full-text search and my_text_field.keyword for aggregations, sorting, etc.
  To apply a new mapping, you will need to reindex your data into a new index with the corrected mapping.
  3. Long-Term Solution: Scale Up or Out
  If you cannot change your mappings or query patterns, your cluster is undersized for its workload.
   * Scale Up (Vertical Scaling): Change the instance type of your data nodes to one with more memory (e.g., from r6g.large.search to r6g.xlarge.search). This directly
     increases the JVM heap size available to each node. You can do this in the AWS OpenSearch console by editing your domain configuration.
   * Scale Out (Horizontal Scaling): Add more data nodes to the cluster. This distributes the shards and memory load across more machines, reducing the pressure on any
     single node.

     PUT /index_shundori/_settings
 {
  "index.routing.allocation.require.box_type": null
 }

 We will also get the 429 & ClusterIndexWriteRejected issues during unassigned/initializing replica shard situation. Whereas RED cluster means one or more primary shards are not available and its means a data-loss and its very serious issue which requires an immediate fix. 


 ---

 What should we do if we see like unassigned shard count 1 in AWS Elasticsearch cluster?  │
╰─────────────────────────────────────────────────────────────────────────────────────────────╯

✦ An unassigned shard in an AWS OpenSearch/Elasticsearch cluster means that a shard (a piece of an index) cannot be allocated to any node in the cluster. This puts your
  cluster in a "yellow" state, indicating that all primary shards are active, but not all replica shards are. This is a risk because if a node with a primary shard fails,
  you could lose data.


  Here is a step-by-step guide to diagnose and fix the issue.

  Step 1: Identify the Unassigned Shard and Reason

  The most important step is to ask the cluster why it cannot assign the shard. You can do this using the Cluster Allocation Explain API.


  Run this command in the OpenSearch/Elasticsearch Dev Tools or via `curl`:


   1 GET /_cluster/allocation/explain


  The output will be a detailed JSON document explaining the exact reason. It might be due to one of the common causes below.

  Step 2: List the Unassigned Shards


  To see which specific shards are unassigned, use the _cat/shards API.


   1 GET /_cat/shards?v=true&h=index,shard,prirep,state,unassigned.reason&s=state



  This will give you a table of all shards, filtered to show the unassigned ones and the reason for their state.

  Common Causes and Solutions

  Here are the most common reasons for unassigned shards and how to resolve them.


  1. Insufficient Nodes for Replicas
  This is the most frequent cause. If you have number_of_replicas set to 1 for an index, you need at least 2 data nodes in your cluster. If you only have 1 node, the
  replica can never be assigned.


   * Diagnosis: The allocation/explain API will say something like "not enough nodes to assign replica".
   * Solution 1 (Recommended): Add more data nodes. Scale up your OpenSearch domain by adding another node.
   * Solution 2 (If acceptable): Reduce the replica count. If you are okay with having no replicas for that index, you can set the replica count to 0.

   1     PUT /your-index-name/_settings
   2     {
   3       "index" : {
   4         "number_of_replicas" : 0
   5       }
   6     }



  2. Disk Space Low Watermark
  OpenSearch will not allocate shards to nodes that are running low on disk space.


   * Diagnosis: The allocation/explain API will mention disk watermarks. You can also check disk usage via CloudWatch metrics for your domain.
   * Solution 1: Increase EBS volume size. Go to your AWS OpenSearch domain configuration and increase the storage size per node.
   * Solution 2: Delete old or unnecessary data. Use DELETE or DELETE_BY_QUERY to remove data from one or more indices.
   * Solution 3: Increase the watermark threshold (not generally recommended). You can temporarily raise the watermark to get the cluster green, but this only delays the
     underlying problem.


  3. Shard Allocation Filtering or Awareness
  Your cluster might be configured to only allocate shards to nodes with specific attributes (e.g., in a specific availability zone). If no such nodes are available, the
  shard will remain unassigned.


   * Diagnosis: The allocation/explain API will mention allocation filtering or awareness attributes.
   * Solution: Check your index and cluster settings for any rules like index.routing.allocation.require.* or cluster.routing.allocation.awareness.attributes. Either add a
     node that satisfies the requirements or adjust the settings.

  4. Cluster Restart or Node Failure
  When a node leaves the cluster unexpectedly, its shards must be re-allocated. This can take time, and the shards will be temporarily unassigned.


   * Diagnosis: The cluster health will be yellow, and _cat/shards will show shards in the INITIALIZING or UNASSIGNED state. Check the AWS Health Dashboard for any service
     issues and your CloudWatch logs for node-specific problems.
   * Solution: In most cases, you just need to wait. OpenSearch will automatically try to re-balance and assign the shards. If a node has permanently failed, you need to
     ensure a new one replaces it.

  Step 3: Forcing a Reroute (Use with Caution)


  If you have identified the reason and fixed it (e.g., added a node or freed up disk space), OpenSearch should automatically assign the shard. If it doesn't, you can
  prompt it to try again.


   1 POST /_cluster/reroute?retry_failed=true



  This command tells the cluster to re-evaluate the routing table and try to assign any unassigned shards.

  Last Resort: Accepting Data Loss

  If a primary shard is unassigned and its data is unrecoverable (e.g., the node it was on is gone and there was no replica), you may have to force allocate an empty
  shard to get the cluster to a "green" state.

  WARNING: This will result in the loss of the data that was in that shard.



    1 POST /_cluster/reroute
    2 {
    3   "commands": [
    4     {
    5       "allocate_stale_primary": {
    6         "index": "your-index-name",
    7         "shard": 0,
    8         "node": "your-node-name",
    9         "accept_data_loss": true
   10       }
   11     }
   12   ]
   13 }



  You would get the index, shard, and node details from the _cat/shards and _cat/nodes APIs. Only do this if you understand and accept the data loss implications.