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
        'An effective hotel search web app which fetches the hotel info from booking.com and agoda.com based on user input and shows the best matches.',
      ],
    },
    {
      head1: (
        <TitleWithLink
          // image="/images/logos/tailwind.webp"
          title="ETL: Athena to Elasticsearch & DynaoDB"
          link="https://github.com/sajibcse68/css-advanced-animations"
        />
      ),
      head2: <LabelWithGraphic icon={Icons.Stack} content="UV, Pydantic, Factory design pattern, SOLID principles" />,
      head3: <LabelWithGraphic icon={Icons.Star} content="" />,
      bulletPoints: [
        'An etl pipeline - fetch data from AWS Athena and store them into ES/OpenSearch & DynamoDB using `uv` package manager.',
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
        'Vulnerability prediction for groundwater resources using DRASTIC model, which is a widely used method for assessing groundwater vulnerability.',
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
