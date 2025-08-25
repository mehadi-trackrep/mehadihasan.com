'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Tooltip, VariantType } from 'react-tooltip';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { SectionHeaderTitle } from '@/components/resume/SectionHeaderTitle';

import { socialLinks } from '@/utils/constants';

type Props = {
  usage?: 'live' | 'pdf';
};

const summary = [
  '~5 years driving data-backend development, building scalable data pipelines & systems.',
  'Proficient in Python, SQL, Elasticsearch (~5Y); AWS Services (~5Y); Scrapy, Kafka (~3Y).',
  'Proven track record in optimizing large-scale ETL workflows and reducing infra costs.',
  'Hands-on experience in delivering AI-driven data solutions since 2023.',
];

export default function HeaderSection({ usage }: Props) {
  const { theme } = useTheme();

  const leftColumn = () => (
    <div className="flex w-full flex-col items-center justify-center lg:w-[28%] lg:items-start lg:justify-start print:w-[28%] print:items-start print:justify-start">
      <div className="flex items-start justify-center lg:justify-start print:justify-start">
        <h1 className="text-[23px] font-bold text-black dark:text-white">
          Md. Mehadi Hasan
        </h1>
        <div className="flex items-center mt-1 ml-3 text-zinc-900 dark:text-zinc-200">
          {socialLinks.map(({ name, icon: Icon, link }) => (
            <>
              <Link
                key={name}
                href={link}
                target="_blank"
                className="ml-1 text-zinc-700 dark:text-zinc-400"
                data-tooltip-id={name}
                data-tooltip-content={name}
                data-tooltip-float={true}
              >
                <Icon className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
              </Link>

              <Tooltip id={name} variant={theme as VariantType} />
            </>
          ))}
        </div>
      </div>
      <h2 className="text-[20px] mb-3">Senior Software Engineer</h2>

      <div className="space-y-2 text-zinc-800 dark:text-zinc-400">
        <Link
          href="mailto:mehadi541@gmail.com"
          className="flex items-center gap-2"
        >
          <FaEnvelope />
          <span>mehadi541@gmail.com</span>
        </Link>
        <Link href="tel:+8801796777157" className="flex items-center gap-2">
          <FaPhone />
          <span>+8801796777157</span>
        </Link>
      </div>
    </div>
  );

  const rightColumn = () => (
    <div className="w-full lg:w-[72%] print:w-[72%]">
      <div className="bg-[#f1f8ff] pl-6 pr-2 py-2 rounded-lg dark:bg-zinc-800">
        <SectionHeaderTitle
          title="Professional Summary"
          classes={['text-center mt-0']}
        />

        <p className="text-base text-zinc-900 dark:text-zinc-200">
          {summary.map((sum, index) => (
            <li key={index}>{sum}</li>
          ))}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <section className="flex flex-col gap-4 lg:flex-row print:flex-row max-w-md print:max-w-none lg:max-w-none">
        {leftColumn()}

        {rightColumn()}
      </section>
    </>
  );
}
