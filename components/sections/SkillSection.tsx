import { FaGit, FaJs, FaReact } from 'react-icons/fa';

import Section from './Section';

export default function SkillSection() {
  const topSkills = [
    'Python',
    'SQL',
    'AWS ES',
    'Scrapy',
    'Playwright',
    'PySpark',
    'Kafka',
    'Airflow',
    'Pandas',
    'Iceberg',
    'Crawl4ai',
    'Pydantic',
    'Pytest',
    'FastAPI',
    'LLM',
    'Langchain',
    'Git',
    'UV',
    'Celery',
    'N8N'
  ];

  const stackOverflowBadges = [
    {
      name: 'gold',
      value: 9,
      color: '#FFCC00',
    },
    {
      name: 'silver',
      value: 68,
      color: '#B4B8BC',
    },
    {
      name: 'bronze',
      value: 79,
      color: '#D1A684',
    },
  ];

  return (
    <div className="flex w-full max-w-xs flex-col items-start justify-between lg:w-auto lg:max-w-none lg:flex-row print:max-w-none print:flex-row">
      <Section
        classes="text-zinc-900 w-full lg:w-auto print:w-auto dark:text-zinc-200"
        title="SKILLS"
      >
        <div className="space-y-2">
          <ul className="grid grid-cols-4 gap-x-1 gap-y-1">
            {topSkills.map((skill) => (
              <li key={skill}>•&nbsp; {skill}</li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}
