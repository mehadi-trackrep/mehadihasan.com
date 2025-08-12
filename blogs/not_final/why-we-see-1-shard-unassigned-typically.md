

Q: I get one shard unassigned frequently. How does not all of the shards of the node? Why not the 10 or 5?

Ans:
1) When a node "flaps" (disconnects and quickly reconnects), the master node does immediately mark all shards on that node as
  unassigned. For that brief moment, you would have ~7 unassigned shards.

  However, because the node usually rejoins the cluster within seconds, the recovery process starts almost instantly. Shard
  allocation is a very high-priority task for the master node. It immediately starts re-assigning the shards back to the newly
  available node.


  Here is the likely sequence of events, which happens very quickly:


   1. 10:00:00 AM: Node 3 misses a heartbeat due to a 5-second garbage collection pause.
   2. 10:00:03 AM: The master node's timeout expires. It marks Node 3 as "failed."
   3. 10:00:03.1 AM: The master unassigns all 7 shards that were on Node 3. The cluster status turns yellow.
   4. 10:00:05 AM: The garbage collection on Node 3 finishes. Node 3 sends a heartbeat to the master.
   5. 10:00:05.1 AM: The master sees Node 3 is back. It immediately starts re-allocating the 7 unassigned shards.
   6. 10:00:06 AM: The master has already successfully re-assigned 6 of the 7 shards. The process is extremely fast.
   7. 10:00:07 AM: Your monitoring system runs its check. It queries the cluster state and sees the cluster is yellow. It asks
      for the list of unassigned shards and sees there is only 1 shard still in the queue waiting to be assigned.


  So, you are not seeing the initial moment of failure; you are seeing a snapshot of the cluster in the middle of a very rapid
  recovery. The "1 unassigned shard" is simply the last one in line to be processed. A few seconds later, it would also be
  assigned, and the cluster would turn green again.

2) The Disk Watermark Exception


  There is one scenario where shards are handled one by one: the disk watermark. If a node's disk usage goes over the limit,
  Elasticsearch will try to solve the problem by moving shards off that node one at a time. In this case, it would be normal
  to see only one shard unassigned as it's being relocated. However, the "flapping node" due to CPU or memory pressure is a
  more common cause for the seeing one shard unassigned.