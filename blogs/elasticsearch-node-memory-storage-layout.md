---
title: 'How Elasticsearch Cluster Manages Node Memory and Storage Layout?'
date: '2025-08-08'
description: 'When a client initiates a search or indexing request to Elasticsearch, the system follows a defined sequence of processing steps. Do you know why what are the steps?'
cover_image: '/images/blogs/elasticsearch-node-memory-storage-layout.png'
categories:
  - aws
  - elasticsearh
  - RAM
  - JVM Heap
  - JVM & OS Caches
  - learning
---

![How Elasticsearch Cluster Manages Node Memory and Storage Layout?](/images/blogs/elasticsearch-node-memory-storage-layout.png 'How Elasticsearch Cluster Manages Node Memory and Storage Layout?')

# How Elasticsearch Cluster Manages Node Memory and Storage Layout? 🧠

💡 AWS OpenSearch (/Elasticsearch) manages each node's memory and storage similar to a computer.
But it interpretes the things in its own management system and working paths.

A simple & easily understandable layout diagram shown in the picture.
Concisely it depicts like:
#### `[ Physical RAM ]`
       │
       ├── [ JVM Process (Elasticsearch) ]
       │         │
       │         ├── [ JVM Heap Memory ]
       │         │         ├── Java objects
       │         │         ├── Threadpools
       │         │         ├── Indexing buffers
       │         │         └── (Optional) Heap Data Structure object
       │         │
       │         └── [ Other JVM Memory: Stack, Metaspace, Native Memory ]
       │
       └── [ OS Page Cache, Other Processes, etc. ]


Let's see simply again the working paths (Indexing Path & Search Path).

### Indexing Path
```
    Client
    ↓
    Threadpool (write/bulk)  [JVM Heap]
    ↓
    Indexing buffer          [JVM Heap]
    ↓
    Lucene in-memory segment
    ↓ (flush)
    OS Page Cache            [RAM outside JVM heap]
    ↓
    EBS Volume               [Persistent disk storage]

```

### Search Path
```
    Client
    ↓
    Threadpool (search)      [JVM Heap]
    ↓
    Lucene segment read
    ↓ (hits OS page cache if warm, else EBS read)
    OS Page Cache            [RAM outside JVM heap]
    ↓
    Optional: Query Cache    [JVM Heap]
    ↓
    Response sent to client
```


Happy learning! 📚