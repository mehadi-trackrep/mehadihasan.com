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
      'Architected a core company data (financial reports, geographical location, corporate structure, industrial categories, URLs, situation, persons, etc.)\
       & metadata indexing pipeline processing 2M+ company records daily, improving data retrieval speed by 28.6% and reducing query response time \
       from 800ms to 570ms. This is 60% of the total system’s data (222M+).',

      'Implemented automated designation categorization system using GPT-4 API, reducing manual categorization effort by 40% and processing 10K+ designations\
       weekly with 94% accuracy.',

      'Optimized AWS infrastructure costs by 43% ($6.5K monthly savings) through Elasticsearch query optimization and S3 access pattern improvements, \
      reducing sync operation time by 86%.',

      'LLM based customer profile enrichment system, enhancing customer profiles with 15+ attributes, leading to a 12% increase in lead conversion rates.',

      'Collaborated with cross-functional teams to launch seven high-impact product features.',
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
      'Developed an innovative company matching service for large file imports by users using AWS ElasticSearch, where users can perform \
      the CRM sync operations.',

      'Participated in developing an event bus system in the Pub/Sub model to process the user request events.',

      'Developed a recruitment data pipeline to extract job postings from recruitment sites, such as Indeed.com.',

      'Built a keyword extraction tool and exposed it as an API for getting each company’s activity texts.',
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
      'Developed collaborative filtering tool for finding similarities on some specific dimensions of data among the users’ set of \
      companies’ data.',

      'Developed a dashboard and alert system using Grafana for the logs and metadata of several data pipelines. We integrated it into \
      the Slack channel to notify us for any internal incidents.',

      'Done a couple of data modeling and schema design tasks for MySQL, Athena with Iceberg tables, and ElasticSearch.',
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
