---
title: 'Quick Kickstarts of AWS OpenSearch(/Elasticsearch)'
date: '2025-08-01'
description: 'A Quick overview of what is AWS Elasticsearch, when it is a perfect choice, cluster data distribution, sharding, replicas, configurations and common issues.'
cover_image: '/images/blogs/elasticsearch/quick-kickstarts-of-aws-elasticsearch.webp'
categories:
  - aws
  - elasticsearch
  - data engineering
---

![Quick Kickstarts of AWS OpenSearch(/Elasticsearch)](/images/blogs/elasticsearch/quick-kickstarts-of-aws-elasticsearch.webp 'Quick Kickstarts of AWS OpenSearch(/Elasticsearch')

# Quick Kickstarts of AWS OpenSearch(/Elasticsearch) 🚀

👋 After a couple of years of consistently working in AWS OpenSearch cluster, I have found that it's not really easy to have an master knowledge on Elasticsearch. Here I am working for peoples to demystify some core knowledge. A very quick overview to get started.

## [Part-1]

Are we familiar with Elasticsearch ⁉️
I'm referring to AWS Elasticsearch, which is now known as OpenSearch.

💡 This service is an excellent choice for a variety of use cases, particularly when you need to perform powerful searches on massive amounts of text data. It's built on OpenSearch, a community-driven, open-source search and analytics suite derived from Elasticsearch.

Elasticsearch, built on top of Apache Lucene, offers a powerful distributed system that enhances scalability and fault tolerance, and is a fully managed service. Under the hood, Amazon utilizes EC2 VMs to manage the distributed system.

Configuring the Elasticsearch cluster involves selecting the appropriate number of data and master nodes, along with provisioning EBS (Elastic Block Store) volumes for the data nodes.
There are a couple of instance types (General Purpose, Memory Optimized, and Previous Generations). Different instance type VMs have their defined memory size, throughput, cores & network performance.

Moving on. 🚶‍➡️

Being a distributed system, it employs sharding and replication.
Sharding refers to partitioning data (manageable chunks) across different nodes, enhancing efficiency and minimizing risk.

Sharding --> primary shard &
                      replica shard (copy of the primary shard), which can be multiple.
Replicas are copies of shards, enhancing data redundancy and search performance. Each replica resides on a different node from the primary shard, ensuring data availability even if a node fails. While replicas help distribute search queries for faster processing, they consume additional memory, disk space, and compute power.
Unlike primary shards, the number of replicas can be adjusted at any time.

ℹ️ So, Shards and replicas form the backbone of Elasticsearch's distributed architecture.

However, finding the right balance in the number of shards is crucial. Too few shards can slow down query execution, while too many can consume excessive memory and disk space, impacting performance.
Generally, each shard should hold between 10-50 GB of data.

To set the settings for an index sensor, we can run this query:-
```  
  PUT /sensor
    {
    "settings": {
    "index": {
    "number_of_shards": 6,
    "number_of_replicas": 2
    }
    }
    }
```
By configuring these settings for the sensor index:
The number of primary shards is 6.
Each primary shard has 2 replicas.
Therefore, the total number of shards becomes 6 + (6 * 2) = 18.

Furthermore, shards can exist in various states:-
- initializing
- started
- relocating
- unassigned

When managing a production-level OpenSearch cluster, you may encounter performance issues. The most common: HTTP 429 (Too Many Requests); Write rejections; High JVM memory pressure; High CPU utilization; Frequent or "tired" GC, High WriteThreadPool, High SearchThreadPool, etc.

To address these issues, you can take several actions.
We will discuss it in the next part, inshaAllah. ⏭️

Keep learning! 📚

