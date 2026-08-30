import Section from './Section';
import LabelWithGraphic from '@/components/label-with-graphic';

// components
import TitleWithLink from '@/components/resume/TitleWithLink';

const certificates: CertificateProps[] = [
  {
    title: 'Big Data Fundamentals with PySpark',
    org: {
      name: '',
      logo: '',
    },
    time: '2026 - ',
    link: 'https://www.datacamp.com/statement-of-accomplishment/course/063b85cd92a4776557238404d56f7ee28d3a16f0?raw=1',
  },
  {
    title: 'Intermediate DBT',
    org: {
      name: '',
      logo: '',
    },
    time: '2026 - ',
    link: 'https://www.datacamp.com/statement-of-accomplishment/course/a136dd06707d348d078a3704417c7dbb4421dbb3?raw=1',
  },
  {
    title: 'SQL (Advanced) Certificate - HackerRank',
    org: {
      name: '',
      logo: '',
    },
    time: '2023 - ',
    link: 'https://www.hackerrank.com/certificates/f3ef0110e659',
  },
  {
    title: 'Understanding and Visualizing Data with Python',
    org: {
      name: '',
      logo: '',
    },
    time: '2020 - ',
    link: 'https://www.coursera.org/account/accomplishments/certificate/WFYBF6VSFBH3',
  },
  {
    title: 'Neural Networks and Deep Learning',
    org: {
      name: '',
      logo: '',
    },
    time: '2020 - ',
    link: 'https://www.coursera.org/account/accomplishments/certificate/YDBBF7U3JJEA',
  }
];

function Certificate({ title, link, org, time }: CertificateProps) {
  return (
    <section className="text-base leading-[25px] text-zinc-700 dark:text-zinc-300">
      <div className="flex flex-wrap justify-between">
        <div className="flex gap-x-2 flex-wrap">
          <span>
            <TitleWithLink title={title} link={link} />
          </span>
        </div>
      </div>
      <LabelWithGraphic image={org.logo} content={org.name} />
    </section>
  );
}

export default function CertificateSection() {
  return (
    <Section title="CERTIFICATES" classes="relative">
      <div className="flex flex-row flex-wrap justify-between gap-y-1">
        {certificates.map((cert, index) => (
          <Certificate key={index} {...cert} />
        ))}
      </div>

      {/* <div className="absolute right-[8%] top-0 mt-1 text-sm font-bold">
        <TitleWithLink
          title="(check over 50 cert?)"
          link="https://github.com/sajibcse68/certificates"
        />
      </div> */}
    </Section>
  );
}
