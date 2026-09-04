import Section from './Section';

export default function SkillSection() {
  const aiSkills = [
    'LLM',
    'RAG',
    'llama.cpp',
    'MCP',
    'NER',
    'Prompt Engineering',
    'Function/Tool Calling',
    'Crawl4ai',
    'PyTorch',
    'Python',
    'FastAPI',
  ];

  const coreSkills = [
    'Elasticsearch/OpenSearch',
    'SQL',
    'AWS',
    'Pydantic',
    'Celery',
    'Pandas',
    'Scrapy',
    'Playwright',
    'Git',
    'Pytest',
  ];

  const alsoFamiliar = ['DBT', 'PySpark', 'Kafka', 'Airflow', 'Iceberg'];

  return (
    <div className="w-full">
      <Section
        classes="text-zinc-900 w-full dark:text-zinc-200"
        title="SKILLS"
      >
        <div className="space-y-1">
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {aiSkills.map((skill) => (
              <li key={skill} className="whitespace-nowrap">•&nbsp; {skill}</li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {coreSkills.map((skill) => (
              <li key={skill} className="whitespace-nowrap">•&nbsp; {skill}</li>
            ))}
          </ul>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Also familiar: {alsoFamiliar.join(', ')}
          </p>
        </div>
      </Section>
    </div>
  );
}
