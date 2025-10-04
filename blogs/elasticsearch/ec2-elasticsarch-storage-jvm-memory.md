---
title: 'Understanding of EC2 and Elasticsearch Storage and JVM Memory'
date: '2025-08-04'
description: 'It is must required to know about AWS EC2 and Elasticsarch storage options and types especially how the JVM memory performs.'
cover_image: '/images/blogs/elasticsearch/ec2-elasticsarch-storage-jvm-memory.webp'
categories:
  - aws
  - elasticsearch
  - ec2 storage
  - jvm memory
---

![Understanding of EC2 and Elasticsearch Storage and JVM Memory](/images/blogs/elasticsearch/ec2-elasticsarch-storage-jvm-memory.webp 'Understanding of EC2 and Elasticsearch Storage and JVM Memory')

# Understanding of EC2 and Elasticsearch Storage and JVM Memory 🧠

It's must required to know about AWS EC2 and Elasticsarch storage options and types especially how the JVM memory performs.


## Let’s deep dive on AWS Elasticsearch & EC2 storage.

### AWS provides the following storage options:
* S3 (Object Storage),
* EBS (Block Storage), and
* EFS (File Storage).

Additionally, EBS supports **three** volume types:-
1. Solid State Drive (SSD)
2. Hard Disk Drive (HDD)
3. Previous Generation Volumes

Moreover, **SSD-backed** volume types include **Provisioned IOPS** (io1/io2) & General Purpose (gp2/gp3). [*IOPS* stands for Input/Output Operations Per Second]

When using gp2 or gp3, the maximum IOPS — 16,000 (64 KiB I/O 4), which means 16,000 IOPS with 64 Kibibytes (!= Kilobytes) of IO operations along with max concurrency 4.
Additionally, the maximum throughput for gp3 — 1,000 MiB/s. [Mebibytes(MiB) != Megabytes(MB)].

Moving on!

### Why do EC2 instances require storage?
* Operating System (Boot Volume / Root Volume)
* Applications (Software and Dependency Installation)
* Data (User files, databases, logs, temporary files, etc.)

From an Elasticsearch perspective,
EC2 instances primarily offer two types of storage — **EBS** & **Instance Store**. Both can utilize either **SSD** or **HDD-based** underlying storage.
Primarily, Elasticsearch and EC2 use either EBS or Instance Store for data storage and I/O operations.

For example, the AWS *i3.16xlarge.search* instance offers:
* 64 vCPUs, 
* 488 GiB of **RAM**, and 
* 8 NVMe **SSD-based** **instance store** volumes, each with 1900 GB, resulting in a total of 15,200 GB (15.2 TB) of local storage, and the maximum **EBS volume** size is 64 TiB.

**Instance Store** offers significantly higher IOPS and lower latency compared to EBS, although the modern *gp3* EBS volume also delivers impressive performance.

Anyway, to demystify the storage based components of a node (whether a data node or a master node), let’s imagine a node as a small workshop where —
* **RAM** is the **Workbench**: This is our active workspace. Part of it is dedicated to the **JVM heap** (where we're building things), and the other part is the **filesystem cache** (where we keep our most-used tools for quick access).
* **Disk** is the **Storage Room**: This is where we keep all our materials. It can either be a super-fast, built-in pantry (**Instance Store**) or a large, separate warehouse connected by a corridor (**EBS**) like an external hard drive.

We always work on the workbench (RAM), but how quickly we can get new materials depends on which storage room (Disk) we're using.

Furthermore, it follows the 50% Rule for JVM Heap:-
1. JVM Heap (~50% of RAM): This is the memory dedicated directly to the OpenSearch application. It's used for:
    * Indexing buffers
    * Query processing and aggregations
    * Internal caches (e.g., field data cache, query cache)
    * Storing cluster state information
Filesystem Cache (~50% of RAM): Lucene, the search library keeps it for operating systems (OS).

Happy learning!
