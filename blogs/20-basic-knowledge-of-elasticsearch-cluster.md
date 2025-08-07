1. High JVM Usage (a possible root cause) :arrow_right: Unassigned Replicas (the direct reason for the yellow status) :arrow_right: Initializing Replicas (the recovery process).

If JVM memory pressure exceed 80%. Then it indicates High JVM Usage. If it exceeds 92% for 30 minutes, all write operations to ES the cluster will be blocked which denoted as ClusterIndexWritesBlocked metric.
OpenSearch Service sends certain health events (notification) with Severity. For example -- Insufficient GC, High JVM Usage,
10:38
A red or yellow cluster health status indicates one or more shards are not assigned to a node.
Red health status: The cluster has some unassigned primary shards, which means that some operations such as searches and indexing may fail.
Yellow health status: The cluster has no unassigned primary shards but some unassigned replica shards. This increases your risk of data loss and can degrade cluster performance.