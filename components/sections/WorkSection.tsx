import Section from './Section';

import Experience from '@/components/Experience';
import LabelWithGraphic from '@/components/label-with-graphic';
import { Icons } from '@/components/icons';

// components
import TitleWithLink from '@/components/resume/TitleWithLink';

const exp: ExperienceProps[] = [
  {
    head1: (
      <LabelWithGraphic
        icon={Icons.Briefcase}
        content="Senior Software Engineer"
      />
    ),
    head2: (
      <TitleWithLink
        title="Goava Sales Intelligence AB 🇸🇪"
        link="https://www.goava.com"
      />
    ),
    head4: '03/25 - Pres.',
    bulletPoints: [
      'Re-architected the OpenSearch cluster — reindexed 2 major indices with optimized sharding, upgraded to newer-gen instances, and cut data node count by 2, driving major cost savings & performance gains.',

      'Built and shipped an MCP (Model Context Protocol) server that lets users query and act on company data in natural language from their own MCP client (Claude, ChatGPT, etc.), cutting manual effort by ~90% on key workflows via intelligent auto tool-calling.',

      'Architected a core company data & metadata indexing pipeline processing 5M+ records daily, improving retrieval speed by 28.6% and cutting query response time from 800ms to 570ms across 60% of the system’s data (300M+).',

      'Optimized AWS infrastructure costs by 43% through Elasticsearch query and S3 access pattern improvements, reducing sync operation time by 86%.',

      'Built an LLM-based customer profile enrichment system, adding 15+ attributes per profile and driving a 12% increase in lead conversion rates.',

      'Developed an NER-based company extraction & news tags detection tool, improving data extraction accuracy by 25% and reducing Elasticsearch load by 38%.',
    ],
  },
  {
    head1: (
      <LabelWithGraphic
        icon={Icons.Briefcase}
        content="Software Engineer"
      />
    ),
    head2: (
      <TitleWithLink
        title="Goava Sales Intelligence AB 🇸🇪"
        link="https://www.goava.com"
      />
    ),
    head4: '10/22 - 03/25',
    bulletPoints: [
      'Built a company matching service using AWS Elasticsearch to support large-scale user file imports and downstream CRM sync operations.',

      'Co-developed a Pub/Sub-based event bus system to process and route user request events across services.',

      'Built a keyword extraction tool and exposed it as an API for retrieving each company’s activity texts.',
    ],
  },
  {
    head1: (
      <LabelWithGraphic
        icon={Icons.Briefcase}
        content="Junior Software Engineer"
      />
    ),
    head2: (
      <TitleWithLink
        title="Goava Sales Intelligence AB 🇸🇪"
        link="https://www.goava.com"
      />
    ),
    head4: '11/20 - 10/22',
    bulletPoints: [
      'Developed a collaborative filtering tool to find similarities across specific data dimensions among users’ sets of company data.',

      'Built a Grafana dashboard and alerting system for logs and metadata across several data pipelines, integrated with Slack to notify the team of internal incidents.',

      'Performed data modeling and schema design for MySQL, Athena with Iceberg tables, and Elasticsearch.',
    ],
  },
];

export default function WorkSection() {
  return (
    <Section classes="w-full lg:w-[59%] print:w-[59%]" title="WORK EXPERIENCE">
      <div className="space-y-4">
        <div className="">
          {exp.map((e, index) => (
            <Experience key={index} {...e} hideHead3 />
          ))}
        </div>
      </div>
    </Section>
  );
}
