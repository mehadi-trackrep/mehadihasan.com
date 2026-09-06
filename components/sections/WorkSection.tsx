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

      'Built and shipped an MCP (Model Context Protocol) server that lets users query and act on company data in natural language from their own MCP client (Claude, ChatGPT), cutting manual effort by ~90% on key workflows via intelligent auto tool-calling.',

      'Architected the core company data and metadata indexing pipeline processing 10M+ records daily — over a billion records a year — across a curated 300M+ document search index, improving retrieval speed 28.6% and cutting query response time from 800ms to 570ms on 60% of the system’s data.',

      'Co-developed a contacts data enrichment pipeline combining multiple data sources with SERP API and LLM-based extraction, improving data coverage roughly 85% over the previous system.',

      'Built an LLM-based customer profile enrichment system adding 15+ attributes per profile; company KPI reporting showed a 12% increase in lead conversion following rollout.'
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
      'Optimized AWS infrastructure costs by 43% through Elasticsearch query and S3 access pattern improvements, reducing sync operation time by 86%.',

      'Co-developed the ingestion architecture spanning real-time and batch paths: a Pub/Sub event bus routing Discover app events.',

      'Built a real-time company matching service on AWS Elasticsearch handling 50k–200k rows per import, powering user file uploads and CRM sync.',

      'Built an NER-based company extraction and news tagging service, improving extraction accuracy 25% and cutting Elasticsearch load 38%.',
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
      
      'Built and maintained Scrapy spiders collecting company and news data from 12 websites plus several partner APIs, averaging 25k records daily.',

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
