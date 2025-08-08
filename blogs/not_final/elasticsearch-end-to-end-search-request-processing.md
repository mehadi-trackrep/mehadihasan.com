 regarding the aws elasticsarch, if a search request comes to a coordinating node then does it only forwards the all of the   │
│    replicas where the primary shard don't exist or ?                                                                            │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯

✦ That's an excellent question that gets to the heart of how Elasticsearch distributes search load.

  The short answer is: no, it does not forward only to replicas.


  A coordinating node forwards the search request to one active copy of each required shard. This copy can be either the primary
  shard or a replica shard.

  Here's a more detailed breakdown of the process:

  The Two Phases of a Search Request

  A search operation in Elasticsearch happens in two main phases:

  1. Query Phase (The "Scatter" Phase)


   1. Request Arrives: Your client sends a search request to any node in the cluster. This node becomes the coordinating node for
      that specific request.
   2. Identify Shards: The coordinating node looks at the request and determines which shards are needed to fulfill it. For
      example, if you are searching a specific index, it knows exactly which shards (e.g., shards 0, 1, and 2) make up that
      index.
   3. Select a Copy (Primary or Replica): For each required shard, the coordinating node needs to get a result. It does not need
      to query the primary and all its replicas. Instead, it selects just one active copy of that shard to send the request to.
   4. Load Balancing (Adaptive Replica Selection): The choice between the primary and a replica isn't random. Elasticsearch uses a
       system called Adaptive Replica Selection. It keeps track of which nodes are under heavy load and will intelligently route
      the request to the node (holding the required shard) that is least busy. This is the key to distributing the search workload
       across the cluster.
   5. Local Execution: The selected shards (a mix of primaries and replicas on different nodes) execute the query locally and
      return a lightweight set of results to the coordinating node—essentially just a list of matching document IDs and their
      relevance scores.

  2. Fetch Phase (The "Gather" Phase)


   1. Merge and Sort: The coordinating node receives the lightweight results from all the queried shards. It merges these lists
      and sorts them to create the final, globally ordered result set.
   2. Retrieve Full Documents: The coordinating node then identifies the specific documents needed for the current page of
      results (e.g., the top 10). It then issues GET requests to retrieve the full _source for only those documents from the
      shards that hold them.
   3. Final Response: Once the full documents are retrieved, the coordinating node assembles the final JSON response and sends it
      back to the client.


  In summary: The coordinating node's goal is to balance the search load. It achieves this by selecting the least busy copy
  (either primary or replica) of each necessary shard during the query phase, ensuring that no single node becomes a bottleneck.

╭─────────────────────────────────────────────────────────────────────────────────────╮
│  > Give an example with a search query, shards, corresponding nodes and documents.  │
╰─────────────────────────────────────────────────────────────────────────────────────╯

✦ Of course. Let's create a simple, concrete example to illustrate the entire search process.

  The Setup

  Imagine we have a small e-commerce store with products stored in Elasticsearch.


  1. The Cluster:
   * 3 Nodes: Node 1, Node 2, Node 3

  2. The Index:
   * Name: product_index
   * Configuration: 2 primary shards (P0, P1) and 1 replica for each (R0, R1).


  3. The Shard Placement:
  Elasticsearch automatically distributes these shards across the nodes. A primary and its replica will never be on the same node.
   A possible layout could be:


   * Node 1: Contains P0 (Primary Shard 0)
   * Node 2: Contains R0 (Replica of Shard 0) and P1 (Primary Shard 1)
   * Node 3: Contains R1 (Replica of Shard 1)


  4. The Documents:
  Let's say we have four products. When a document is indexed, Elasticsearch uses its ID to determine which primary shard it
  belongs to.


   * doc_1: { "name": "Quantum Laptop", "type": "laptop" } -> Belongs to Shard 0
   * doc_2: { "name": "Photon Mouse", "type": "peripheral" } -> Belongs to Shard 1
   * doc_3: { "name": "Gravity Keyboard", "type": "peripheral" } -> Belongs to Shard 0
   * doc_4: { "name": "Nova Monitor", "type": "monitor" } -> Belongs to Shard 1


  This means the data is physically stored like this:
   * Node 1 (P0): doc_1, doc_3
   * Node 2 (R0, P1): doc_1, doc_3 (in R0) and doc_2, doc_4 (in P1)
   * Node 3 (R1): doc_2, doc_4

  ---

  The Search Request


  Now, a user wants to find all products of the type "peripheral".

  The Query:
  GET /product_index/_search

   1 {
   2   "query": {
   3     "match": {
   4       "type": "peripheral"
   5     }
   6   }
   7 }



  Let's trace the request.

  Phase 1: Query (The "Scatter")

   1. Request Arrives: The client sends the search request to Node 2. Node 2 now becomes the coordinating node for this request.


   2. Identify Shards: The coordinating node sees the request is for product_index. It knows this index is composed of Shard 0
      and Shard 1. To get a complete answer, it must get results from both.


   3. Adaptive Replica Selection (The Key Step): The coordinating node must now choose one copy of each shard to send the query
      to.
       * For Shard 0: It can query P0 (on Node 1) or R0 (on itself, Node 2). It checks the internal metrics and sees that Node 1
         is currently less busy.
           * Decision: It forwards the query for Shard 0 to `Node 1`.
       * For Shard 1: It can query P1 (on itself, Node 2) or R1 (on Node 3). It checks its metrics and finds that Node 3 has the
         lowest search load right now.
           * Decision: It forwards the query for Shard 1 to `Node 3`.


      > This is the crucial point: The coordinating node (Node 2) sent the query to the primary on Node 1 and the replica on Node
  3, distributing the work based on load. It did not just pick replicas.


   4. Local Execution:
       * Node 1 receives the query, runs it on shard P0, and finds a match: doc_3 ("Gravity Keyboard").
       * Node 3 receives the query, runs it on shard R1, and finds a match: doc_2 ("Photon Mouse").


   5. Return to Coordinator: Node 1 and Node 3 return a very lightweight result to the coordinating node (Node 2). This is just a
      list of matching document IDs and their scores, not the full documents.
       * Node 1 sends back: [ { id: doc_3, score: 1.23 } ]
       * Node 3 sends back: [ { id: doc_2, score: 1.23 } ]

  Phase 2: Fetch (The "Gather")


   1. Merge and Sort: The coordinating node (Node 2) receives the two lists. It merges them into a final, sorted list of results.
      Let's say the final order is doc_2, then doc_3.


   2. Retrieve Full Documents: The coordinating node now knows it needs to show the user doc_2 and doc_3. It needs the actual
      document content (_source).
       * It knows doc_2 is on P1 (itself) and R1 (Node 3). It can just get it locally from P1.
       * It knows doc_3 is on P0 (Node 1) and R0 (itself). It can just get it locally from R0.


   3. Final Response: The coordinating node (Node 2) fetches the full content for doc_2 and doc_3 from its local shards,
      assembles the final JSON response, and sends it back to the client.


  This example shows how the load is spread across Node 1 and Node 3 for the initial, expensive query phase, even though the
  request originally landed on Node 2.
