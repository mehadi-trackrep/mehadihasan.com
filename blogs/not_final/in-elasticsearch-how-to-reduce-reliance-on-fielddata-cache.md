o reduce our reliance on fielddata cache,
   * Use Doc Values: For sorting and aggregations on text, you should use doc_values on a keyword field, not fielddata on a text field. doc_values are stored on disk and are
     far more memory-efficient.
   * Check Your Mappings: Inspect the mapping of the index.
   1     GET /<index_name>/_mapping
      Look for fields of type text that you are using for aggregations or sorting. You likely need to change your mapping to include a .keyword sub-field for those
  operations.
   * Example of a better mapping:
   1     "my_text_field": {
   2       "type": "text",
   3       "fields": {
   4         "keyword": {
   5           "type": "keyword",
   6           "ignore_above": 256
   7         }
   8       }
   9     }
      With this mapping, you would use my_text_field for full-text search and my_text_field.keyword for aggregations, sorting, etc.
  To apply a new mapping, you will need to reindex your data into a new index with the corrected mapping.