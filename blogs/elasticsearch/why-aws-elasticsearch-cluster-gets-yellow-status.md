---
title: 'Why does an AWS Elasticsearch cluster get a yellow status'
date: '2025-08-11'
description: 'We may encounter an yellow cluster status of an AWS Elasticsearch cluster. Do we know why dpes the cluster run in yellow state?'
cover_image: '/images/blogs/elasticsearch/why-aws-elasticsearch-cluster-gets-yellow-status.png'
categories:
  - aws
  - elasticsearch
  - yellow status
  - es best practices
---

![Why does an AWS Elasticsearch cluster get a yellow status](/images/blogs/elasticsearch/why-aws-elasticsearch-cluster-gets-yellow-status.png "Why does an AWS Elasticsearch cluster get a yellow status")

# ❓ Why does an AWS Elasticsearch cluster get a yellow status?

> #### This post will provide a comprehensive look at all the common cluster issues. Read on for a detailed analysis.

⏳ Let's dive deep into the underlying architectural and query perspectives. 

ℹ️ Suppose the overall configuration of our AWS Elasticsearch cluster is –
* Total data nodes - 3. Per node configuration —
    * Instance type: r6g.2xlarge.search [32 GiB RAM]
    * Volume type: EBS
    * Volume size: 1150
* Total master nodes - 2
* Total shards - 168
* Field data cache size - 18
* Max clause count - 2000
* Total indices - 15 where two indices are the big ones named '**mehadi_v0.49**' & '**test-v1.0**'.
* Shard configuration for each index: 5 primary shards & 1 replicas. So, 'mehadi_v0.49' has 5 primary shards & 5 replica shards. Same for 'test-v1.0' index.

🧠 Let's examine whether this cluster configuration aligns with best practices. 

📌 First, we need to understand the common recommendations which are –
 * Use VPC domain of cluster deployment.
 * Use fine-grained access control.
 * Enable encryptions.
 * Choose the right instance types.
 * Use dedicated master nodes for ensuring cluster stability.
 * If budget is not problem the use Instance Store (local NVMs).
 * 10-50GiB for searching & 30-50GiB for indexing.
 * Keep the number of documents on each shard below 200 million.
 * Use warm or cold data storage tiers.
 * To enhance fault-tolerance, use multiple AZs & proper sharding.
 * For time-series data, use ILM.
 * Enable slow logs.
 * And as a general rule of thumb, we should have fewer than 3000 indices per GB of heap on master nodes.

If we don't follow best practices, the cluster can become unstable. This instability can cause the cluster status to change from **green** to **yellow** or *even* **red**. This happens when one or more replica shards are in an unassigned state.

This might occur when the JVM memory pressure is above **75%** or even** 92%**. If it consistently goes above 95% for a while, the cluster will trigger the circuit breaker to prevent it from crashing due to an out-of-memory issue.

💡 The potential **root causes** include:

1. Oversized shard
2. Uneven shard allocation (hot node problem)
3. Large field data caching
4. Heavy aggregations 
5. Inefficient queries
6. Over max clause count settings
7. Low EBS PIOPS

And the **affected metrics** are:

1. ClusterWriteIndexingBlocked
2. Request Rejections (SearchThreadPoolRejected & IndexingThreadPoolRejected)
3. Too Many Requests (429)
4. High CPU Utilization
5. Frequent/full GCs
6. Cache Evictions(Loss of cached results and fielddata)
7. High Search Latency
8. High Indexing Latency
9. Long running queries
10. Yellow Cluster Status


Hence, we have 3 data nodes to get an even shard allocation –

At first, for *mehadi_v0.49* (**582 GiB**) index:

* Calculation: 582 GiB/40 GiB per shard ≈ 14.5
* Recommendation: Create a new index with 15 primary shards [**5 shards in each data node**]

and for *test-v1.0* (**374 GiB**) index:

* Calculation: 374 GiB/40 GiB per shard ≈ 9.35 ≈ 12
* Recommendation: Create a new index with 12 primary shards. [**4 shards in each data node**]


💡 To resolve these issues, a practical and cost-effective approach is to temporarily scale the existing cluster and use the _reindex API. This method is a more efficient alternative to a blue/green deployment.

> ** Blue/Green Deployment: This involves setting up an entirely new, parallel cluster (the 'green' environment), reindexing data to it from the current cluster (the 'blue' environment), and then cutting over traffic. Although it ensures zero downtime, it is more costly. In contrast, using the **reindexing API** is a more cost-effective method that also provides near-zero downtime.

To perform reindexing with temporary scaling, follow these key steps:
1. Scale out the cluster by adding one or more data nodes.
2. Create the new indices, ensuring they are configured correctly.
For example:


```
PUT /mehadi_v0.50
{
    "settings": {
         "index": {
           "number_of_shards": 15,
           "number_of_replicas": 1
         }
       },
       "mappings": {
        // Copy mappings from mehadi_v0.49
      }
}
```
```
PUT /test-v1.1
{
    "settings": {
         "index": {
           "number_of_shards": 12,
           "number_of_replicas": 1
         }
       },
       "mappings": {
        // Copy mappings from test-v1.0
      }
}
```
```
POST /_reindex
{
    "source": {
        "index": "my-old-index"
},
    "dest": {
        "index": "my-new-index"
    }
}
```
3. Finally scale down the cluster to the previous state.


#### Summary:
If the issues discussed above are encountered, we should first verify that the cluster's configuration—including data volume, instances, and queries—adheres to recommended best practices. If all best practices are being followed, the next step is to scale the cluster either up or out.

Happy learning! 📚