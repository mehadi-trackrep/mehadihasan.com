

### `ThreadpoolSearchThreads` size calculation formula:
```
    int((# of available_processors * 3) / 2) + 1
```
For example, **m5.large.search** instance with **2 vCPUs** will have `int((2 * 3) / 2) + 1 = 4` threads for search operations. 


### `ThreadpoolWriteThreads` size calculation formula:
```
    # of available_processors
```
For example, **m5.large.search** instance with **2 vCPUs** will have `2` threads for write operations. 

The queue sizes for the search and write thread pools are not dependent on the instance type. They are fixed values for the AWS OpenSearch service, 
regardless of whether we are using an instance type.

Therefore, the queue sizes by default are:

   * Search Queue Size: 1,000
   * Write/Bulk Queue Size: 10,000

We can not change these configurations.
If we need more size then have to upscale the node or cluster.