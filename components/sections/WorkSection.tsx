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
      'Deployed a self-hosted OSS LLM (llama.cpp) on a GPU-backed AWS EC2 instance, serving Lambda workloads for news categorization & company-name detection — raising data quality 70%→90% and eliminating per-token inference costs.',

      'Built and shipped an MCP server enabling natural-language querying and actions on company data from any MCP client (Claude, ChatGPT), cutting manual effort ~90% on key workflows via intelligent auto tool-calling.',

      'Built an LLM-based customer profile enrichment system, adding 15+ attributes per profile and driving a 12% increase in lead conversion rates.',

      'Designed an LLM-powered contact classification pipeline categorizing job titles into function/seniority taxonomies, replacing brittle rule-based matching.',

      'Developed an NER-based company extraction and news-tag detection service, improving extraction accuracy by 25% and reducing Elasticsearch load by 38%.',

      'Deployed an AI-assisted crawling service (Crawl4ai) on EC2 as a resilient fallback layer, recovering structured contact data from JS-heavy sites where conventional scrapers failed.',

      'Architected the core company data & metadata indexing pipeline processing 5M+ records daily — the retrieval backbone for downstream AI features — cutting query response time 800ms→570ms across 300M+ documents.',

      'Optimized AWS infra costs by 43% and cut sync time 86% via OpenSearch re-architecture (resharding, instance upgrades, 2 fewer data nodes) and S3 access-pattern improvements.',
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
      'Built a company matching service (AWS Elasticsearch) for large-scale user file imports & CRM sync, plus a keyword extraction API for company activity texts.',
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
      'Built a collaborative-filtering similarity engine to surface related companies across multiple data dimensions in users’ portfolios.',
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
