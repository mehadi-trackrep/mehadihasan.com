 Regarding AWS Elasticsearch, what does mean in the graph - ThreadpoolSearchRejected Maximum?  │
╰──────────────────────────────────────────────────────────────────────────────────────────────────╯

 ╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
 │ ✔  GoogleSearch Searching the web for: "AWS Elasticsearch ThreadpoolSearchRejected Maximum"                          │
 │                                                                                                                      │
 │    Search results for "AWS Elasticsearch ThreadpoolSearchRejected Maximum" returned.                                 │
 ╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ In AWS Elasticsearch (now Amazon OpenSearch Service), the ThreadpoolSearchRejected metric indicates that your cluster is
  unable to process incoming search requests because its resources are at full capacity. The "Maximum" value in a graph of this
  metric represents the peak number of search requests that were rejected during a specific time period.

  Here's a breakdown of what that means:


   * Search Thread Pool: Elasticsearch uses a thread pool to manage search requests. Each request is assigned to a thread.
   * Search Queue: If all threads are busy, new requests are placed in a queue. In AWS OpenSearch, this queue has a fixed size
     of 1,000 requests per node.
   * Rejection: When both the thread pool and the queue are full, the cluster has no choice but to reject new search requests.
     This is what the ThreadpoolSearchRejected metric tracks.

  In short, a `ThreadpoolSearchRejected` value greater than zero means your cluster is overloaded and cannot keep up with the
  search demand.


  Common causes for search rejections include:


   * High Request Volume: A sudden spike in search traffic can overwhelm the cluster.
   * Long-Running Queries: A few complex or inefficient queries can tie up search threads for a long time, causing a backlog.
   * Insufficient Resources: The cluster may not have enough CPU or memory to handle the workload.
   * Uneven Shard Distribution: If data is not distributed evenly across the nodes, some nodes may become overloaded while
     others are idle.

  To resolve this issue, you can:


   * Scale your cluster: Either scale up to larger instances (vertical scaling) or add more nodes (horizontal scaling).
   * Optimize your queries: Identify and rewrite slow or expensive queries.
   * Implement retries: In your application, add logic to retry failed requests with **exponential backoff**.