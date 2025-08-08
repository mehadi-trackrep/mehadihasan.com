To quickly resolve the issues and get back to green status, there are a couple of steps.
cancel long running tasks if cancellable true
clear the fielddata cache (POST /_cache/clear?fielddata=true)
reassign the unassigned shard using rerouting command (POST /_cluster/reroute?retry_failed=true)
tune shard allocation filtering settings
For the 2nd and 3rd steps, before we have to add cluster_permissions:
   - "cluster_monitor"
   - "cluster_composite_ops"
Hopefully this will help to recover quickly.
Moreover if this happens frequently then we focus on --
first of all balancing the traffic;
query optimisation;
don't use fielddata: true field if really don't required;
balance sharding;
finally scale-up or scale-out the cluster.