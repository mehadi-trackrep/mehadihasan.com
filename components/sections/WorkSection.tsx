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
      'Re-architected the OpenSearch cluster — reindexed 2 major indices with optimized sharding and newer-gen instances, dropping 2 data nodes.',

      'Built an MCP (Model Context Protocol) server to query and act on company data in natural language from Claude or ChatGPT, cutting effort ~90%.',

      'Architected the core company and metadata indexing pipeline — 10M+ records daily, 1B+ a year — over a curated 300M+ document index, cutting query time 800ms → 570ms on 60% of platform data.',

      'Built on-demand open-source LLM serving on AWS spot instances, cutting inference cost on enrichment workloads.',

      'Co-developed a contacts pipeline turning unstructured web pages into structured contact records via SERP API, headless browsers, and Crawl4ai LLM extraction — coverage 75% → 95%.',

      'Built an LLM-based profile enrichment system adding 15+ attributes per profile; KPI reporting showed 12% lift in lead conversion after rollout.'
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
      'Cut AWS infrastructure costs 43% by tuning Elasticsearch queries and S3 access patterns; sync time dropped 86%.',

      'Co-developed the ingestion architecture across real-time and batch paths, including a Pub/Sub event bus for Discover app events.',

      'Built a real-time company matching service on AWS Elasticsearch handling millions of rows per import, powering user file uploads and CRM sync.',

      'Built an NER-based company extraction and news tagging service, improving extraction accuracy 25% and cutting Elasticsearch load 38%.',

      'Built Goava Data Monitor — an OpenSearch dashboard tracking log metrics across major pipelines and microservices.',
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
      'Built a collaborative-filtering tool that surfaces look-alike companies across users’ saved company sets.',
      
      'Built and maintained Scrapy spiders collecting recruitment job postings from 12 recruitment sites and partner APIs, including Indeed via ScrapeOps residential proxies — 25k records/day.',

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
