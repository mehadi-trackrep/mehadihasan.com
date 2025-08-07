V.V.I.
WRITE A POST ON IT.
Regarding AWS Elasticsearch cluster, I have an index - datav03 which has only 5 primary shards though it has 218525053   │
│    documents and total size 586.32 GiB. What are the action points here?                                                    │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯

✦ That's a great observation. An index of that size with only 5 primary shards is definitely a concern. Each shard is holding
  roughly 117 GiB of data, which is well above the recommended 10-50 GiB per shard for optimal performance.


  Large shards can lead to several problems:
   * Slow Recovery: If a node fails, Elasticsearch has to move those huge shards to other nodes, which can take a very long
     time, putting your cluster in a yellow or red state for an extended period.
   * Performance Degradation: Search and indexing operations can become slower as shards grow too large.
   * Cluster Rebalancing Issues: It's difficult for Elasticsearch to efficiently balance data across nodes when the shards are
     so large and inflexible.

  Action Plan: Re-indexing

  You cannot change the number of primary shards on an existing index. The standard and safest procedure is to reindex your
  data into a new, correctly configured index.

  Here is a step-by-step action plan:


   1. Determine the Optimal Shard Count:
       * Based on the best practice of 30GB per shard, a good starting point for your new index would be: 586 GiB / 30 GB/shard
         ≈ 20 shards.
       * So, we'll aim for 20 primary shards in the new index.


   2. Create a New Index (`datav04`):
       * Create a new index with the correct number of primary shards. You'll also need to copy the mappings and settings from
         your old datav03 index to ensure compatibility.
       * I can get the mappings from the existing index to help create the new one.


   3. Reindex the Data:
       * Use the _reindex API to copy the data from the old index (datav03) to the new one (datav04). This process can take a
         significant amount of time given the data size, but it can be run in the background.


   4. Update Application/Alias:
       * If your application is pointing directly to datav03, you'll need to update it to point to datav04 after the reindex is
         complete and verified.
       * Best Practice: Ideally, your application should point to an alias (e.g., datav-current). If you use an alias, you can
         atomically switch it from datav03 to datav04 with zero downtime.


   5. Delete the Old Index:
       * Once you have verified that the new index is working correctly and all applications are using it, you can delete the
         old datav03 index to reclaim the 586 GiB of disk space.

  How I Can Help


  I can execute these steps for you. Shall I start by getting the current mappings and settings for the datav03 index so we
  can create the new datav04 index correctly?

╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│  > If we make 20 shards for the new index then does it fit for only 3 data nodes & 3 master nodes of cluster?  │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯

✦ Excellent question. That's a crucial factor to consider for cluster health and stability.

  Yes, absolutely. A configuration of 20 primary shards will fit perfectly fine on 3 data nodes.

  Here's the breakdown of why:


   1. Master Nodes vs. Data Nodes: The 3 master nodes are only responsible for managing the cluster's state (like which nodes are
      part of the cluster, what indices exist, etc.). They do not store any of your index data. The shards will only be stored on
      your 3 data nodes.


   2. Primary Shard Distribution: Elasticsearch will automatically distribute the 20 primary shards as evenly as possible across
      the 3 available data nodes. This would look like:
       * Node 1: 7 primary shards
       * Node 2: 7 primary shards
       * Node 3: 6 primary shards


   3. Replica Shards (The Important Part for HA): For high availability, you will also have replica shards. Assuming you have the
      standard setting of 1 replica for your index, you will have:
       * 20 primary shards
       * 20 replica shards
       * Total: 40 shards


      Elasticsearch is smart about this. It will ensure that a primary shard and its corresponding replica are never on the
  same data node. The total of 40 shards will be distributed across the 3 data nodes, meaning each node will hold
  approximately 13-14 shards in total.

  Conclusion


  A setup with 20 primary shards and 1 replica is a very healthy and well-balanced configuration for your 3 data nodes. Each
  node will manage a reasonable number of shards, and the total data for this index (~586 GiB) will be nicely split, with each
  node holding roughly 195 GiB.

  This is a significant improvement over the current state and aligns perfectly with best practices.