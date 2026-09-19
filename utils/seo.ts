export function getSiteMetaData({
  title = 'Md. Mehadi Hasan | Senior Data & AI Engineer',
  description = 'SSE | Data Engineering & AI | Python, Elasticsearch, SQL, ETL/ELT, Iceberg Lakehouse, Athena, AWS, LLM, MCP, RAG | 6 yrs, 10M+ records/day, 300M+ curated docs | Open to remote & relocation.',
  type = 'website',
  author = '@mehadihasan',
  images = ['https://mehadihasan-com.vercel.app/images/og/website.png'],
  creator = '@mehadihasan',
  keywords = [
    'Data Engineer',
    'AI Engineer',
    'Elasticsearch',
    'SQL',
    'Data modeling',
    'ETL/ELT',
    'Iceberg Lakehouse',
    'Athena',
    'Scrapy',
    'Crawl4ai',
    'Playwright',
    'FastAPI',
    'Pytest',
    'AWS',
    'LLM',
    'AI',
    'MCP',
    'RAG',
  ],
}: {
  title?: string;
  description?: string;
  type?: 'website' | 'article';
  author?: string;
  images?: string[];
  creator?: string;
  keywords?: string[];
}) {
  return {
    metadataBase: new URL('https://mehadihasan-com.vercel.app'),
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type,
      author,
      creator,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      author,
      creator,
      images,
    },
  };
}
