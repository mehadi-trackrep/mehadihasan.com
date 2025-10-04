---
title: 'How Fielddata Cache Can Degrade ES Performance?'
date: '2025-08-16'
description: 'We need to use field data caching to utilize fast aggregation and sort queries. However, caching too many fields can degrade Elasticsearch performance by reducing
  available JVM memory.'
cover_image: '/images/blogs/elasticsearch/how-to-reduce-reliance-on-fielddata-cache.png'
categories:
  - aws
  - elasticsearch
  - fielddata cache
  - doc_value
---

![How Fielddata Cache Can Degrade ES Performance?](/images/blogs/elasticsearch/how-to-reduce-reliance-on-fielddata-cache.png "How Fielddata Cache Can Degrade ES Performance?")

# 🧠 How Fielddata Cache Can Degrade ES Performance? 

We need to use field data caching to utilize fast aggregation and sort queries. However, caching too many fields can degrade Elasticsearch performance by reducing available JVM memory.

💡 To reduce our reliance on fielddata cache,
  * Use Doc Values: For sorting and aggregations on text, we should use **doc_values** on a keyword field, not fielddata on a text field. doc_values are stored on disk and are
    far more memory-efficient.
  * Check wer Mappings: Inspect the mapping of the index.
> GET /<index_name>/_mapping

Look for fields of type text that we are using for aggregations or sorting. we likely need to change wer mapping to include a .keyword sub-field for those operations.

--> Example of a better mapping:

```
     "my_text_field": {
       "type": "text",
       "fields": {
         "keyword": {
           "type": "keyword",
           "ignore_above": 256
         }
       }
     }
```

instead of 

    "my_text_field": {
      "type": "text",
      "fielddata": true
    }

With this mapping, we would use my_text_field for **full-text search** and my_text_field.**keyword** for *aggregations*, *sorting*, etc. To apply a new mapping, we will need to *reindex* wer data into a new index with the corrected mapping.