import Section from './Section';
import Experience from '@/components/Experience';
import LabelWithGraphic from '@/components/label-with-graphic';
import { Icons } from '@/components/icons';

// components
import TitleWithLink from '@/components/resume/TitleWithLink';

export default function ProjectSection() {
  const exp: ExperienceProps[] = [
    {
      head1: (
        <TitleWithLink
          // image="/images/logos/nextjs.png"
          title="Booking-Agoda Hotel Scraper"
          link="https://github.com/mehadi-trackrep/booking-agoda-hotel-scraper"
        />
      ),
      head2: (
        <LabelWithGraphic
          icon={Icons.Stack}
          content="Scrapy, Celery, Playwright, Redis, Docker"
        />
      ),
      head3: <LabelWithGraphic icon={Icons.Star} content="" />,
      bulletPoints: [
        'Hotel search app that pulls listings from booking.com and agoda.com for a user’s criteria and surfaces the best matches.',
      ],
    },
    {
      head1: (
        <TitleWithLink
          // image="/images/logos/tailwind.webp"
          title="ETL: Athena to Elasticsearch & DynamoDB"
          link="https://github.com/mehadi-trackrep/etl-athena-to-es-dynamodb"
        />
      ),
      head2: <LabelWithGraphic icon={Icons.Stack} content="UV, Pydantic, Factory design pattern, SOLID principles" />,
      head3: <LabelWithGraphic icon={Icons.Star} content="" />,
      bulletPoints: [
        'ETL pipeline that moves data from AWS Athena into Elasticsearch/OpenSearch and DynamoDB.',
      ],
    },
    {
      head1: (
        <TitleWithLink
          title="DRASTIC Vulnerabilities Prediction"
          link="https://github.com/mehadi-trackrep/DRASTIC-Vulnerabilities-Prediction"
        />
      ),
      head2: <LabelWithGraphic icon={Icons.Stack} content="Pandas, Scikit-Learn, Ensemble, OneVsRestClassifier" />,
      head3: <LabelWithGraphic icon={Icons.Star} content="" />,
      bulletPoints: [
        'Groundwater vulnerability prediction built on the DRASTIC model with ensemble multi-class classifiers.',
      ],
    },
  ];

  return (
    <Section title="PROJECT">
      <div className="flex flex-col gap-y-1">
        {exp.map((e, index) => (
          <Experience key={index} {...e} />
        ))}
      </div>
    </Section>
  );
}
