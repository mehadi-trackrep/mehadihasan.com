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
        <LabelWithGraphic
          content="RAG Search POC — Companies, News & Recruitment (Client)"
        />
      ),
      head2: <LabelWithGraphic icon={Icons.Stack} content="Elasticsearch, LLM, RAG, Python, FastAPI" />,
      head3: <LabelWithGraphic icon={Icons.Star} content="" />,
      bulletPoints: [
        'Built a proof-of-concept RAG pipeline over our Elasticsearch data (companies, news, recruitment), letting clients search in natural language and get real-time, single-view summarized answers instead of manual keyword digging.',
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
