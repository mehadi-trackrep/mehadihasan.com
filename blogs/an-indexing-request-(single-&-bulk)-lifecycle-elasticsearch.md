---
title: 'An Indexing Request (Single & Bulk) Lifecycle - Elasticsearch'
date: '2025-08-03'
description: 'When a client initiates a search or indexing request to Elasticsearch, the system follows a defined sequence of processing steps. Do you know why what are the steps?'
cover_image: '/images/blogs/elasticsearch-end-to-end-request-process-flow.webp'
categories:
  - aws
  - elasticsearh
  - coordinating node
  - learning
---

![An Indexing Request (Single & Bulk) Lifecycle - Elasticsearch](/images/blogs/an-indexing-request-(single-&-bulk)-lifecycle-elasticsearch.webp 'An Indexing Request (Single & Bulk) Lifecycle - Elasticsearch')

# An Indexing Request (Single & Bulk) Lifecycle 🧠


💡 When we send a document to be indexed, here is the sequence of events that must happen before our client/service gets a 200 OK or 201 Created response:
   1. **Route to Primary Shard**: The coordinating node receives the request and routes it to the data node holding the primary shard.
   2. **Write to Primary's Buffer & Translog**: The primary shard does `two` things:
       * It writes the document to its `in-memory buffer`. Then `refresh` operation takes all documents from the *in-memory buffer* and writes them into **a new, immutable segment** in the operating system's *filesystem cache*. Once the segment is written, then its contents are available for search queries. [refresh ensures **`searchability`**].
       * It appends the document to the `transaction log (translog)` on disk. The translog is like a write-ahead-log; this disk write is a `lightweight fsync` (e.g. **flush**) and is the key to the request's **`durability`**.
   3. **Forward to Replicas**: The primary shard forwards the indexing request to its replica shards on other data nodes.
   4. **Write to Replica's Buffer & Translog**: Each required replica shard performs the same action as the primary: it writes the document to its `in-memory buffer` and appends it to its own *translog*.
   5. **Replicas Acknowledge**: The replicas report success back to the primary shard.
   6. **Primary Acknowledges & Client Gets Response**: Once the primary has received acknowledgements from the required number of replicas (controlled by the wait_for_active_shards setting), it reports success to the coordinating node, which then sends the final success response to your client.


### Trace a document's path through the memory layers:

   1. Indexing: Our document arrives.
       * => It is written to the In-Memory Buffer (inside the JVM heap).
       * => It is also written to the Transaction Log (on physical disk, for safety).
       * At this point, the document is NOT searchable.

   2. Refresh (e.g., after 1 second):
       * => The contents of the In-Memory Buffer are written into a new Lucene segment file.
       * => This new segment file is written to the OS Filesystem Cache (in the server's RAM).
       * Now the document IS searchable, because Elasticsearch can read the segment from the fast OS cache.

   3. Flush (e.g., after 30 minutes):
       * => The OS is commanded (via fsync) to take the segment file from its Filesystem Cache and write it permanently to the physical disk.
       * => The corresponding entries in the Transaction Log are cleared.
       * Now the document is fully durable and will survive after server reboot.

 > ℹ️ A document **always** will be indexed it's corresponding primary shard.


📌 Let's expalin all more..

The coordinating node does not forward the request to all data nodes rather it needs to determine which shard the document belongs to. By default, it calculates the destination shard (primar shard) using this formula:
`shard_number = hash(routing_value) % (number_of_primary_shards)` where the routing_value might be **_id** or **_routing**.
Therefore, the entire system relies on a simple, fast, and deterministic routing formula:

Then the coordinating node decides to which data node holds the shard currently by utilizing the cluster state. 
Finally, the request is considered successful once the primary shard and the configurable number of replica shards have completed the operation. The coordinating node then sends a confirmation back to the client/service. That ends the total lifecycle of the request (search, index, bulk etc.).

The data node holding the primary shard executes the indexing operation. Replica shards only used to serve the search, get operations. Once the operation is successful on the primary shard, that node then forwards the same request to all of its replica shards, which are located on other data nodes.

> An index (your entire collection of documents) is split into one or more pieces called shards. A shard is a self-contained, fully functional "sub-index." Elasticsearch distributes these shards across the various nodes in the cluster. A single node can hold multiple shards.
>
> Therefore, A shard is not a node(/server); it's a piece of an index that runs on a node.

💡 **Analogy**: Let's think of *your cluster* is a **library (cluster)**. Each **bookshelf** in the library is *a node*. You have a *10-volume encyclopedia*, which is your **index**. To make it manageable, you can't put *all 10 volumes in one spot*. Each *individual volume* is **a primary shard**. You place these volumes (shards) on different bookshelves (nodes). In that way, the primary shards have been distributed accross all data nodes.

___
### Let's see an example!
Suppose, a bulk indexing request of 1000 documents came to the coordinating node — which will calculate the shard_number (destination shard id) for every single document in the payload. Then it groups these resultant shard numbers by the target Data Node.
The result is a `set` of **smaller, parallel bulk requests**. For instance:
> * A request for **Data Node A** containing the *350 documents* that **map to shards on that node**.
> * A request for **Data Node B** containing the *320 documents* that **map to its shards**.
> * A request for **Data Node C** containing the *330 documents* that **map to its shards**.

After being written, each node add the changes `in-memory buffer` till `refresh`. After being refreshed with the specified `time interval`, the document can be searchable. Subsequently, the node forwards the indexing / bulk indexing request to it's corresponding replica shards (/replicas).

Finally, the coordinating node waits until it receives confirmations/acknowledgements from the data nodes. Whereas the data nodes waits to get acknowledgements from replicas. Obtain the **chain of confirmations**; it redirects the response to the end-user / service.

💡 **Analogy here** —  think of the coordinating node as a postal sorting supervisor. It doesn't send a copy of every letter to every post office in the country. Instead, it reads the ZIP code (the _id), determines the single correct destination post office (the Data Node), and sends the letter there directly. Same thing goes for other data nodes as well in that duration.


Happy learning!