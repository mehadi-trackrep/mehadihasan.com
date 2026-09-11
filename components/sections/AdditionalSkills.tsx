import Section from '@/components/sections/Section';

import Experience from '@/components/Experience';

const exp: ExperienceProps[] = [
  {
    bulletPoints: [
      'ACM ICPC Dhaka Regional 2018 — ranked 63rd of 298 teams, competing in a team of three.',
      'Hackathon champion — IUT 9th ICT Fest 2017, Dept. of CSE, IUT.',
      'HackerRank SQL — solved every problem and earned a 5-star rating.',
      'Solved 1,130+ problems across online judges: 215+ on LeetCode (136+ medium), 135+ on Codeforces, 100+ on LightOJ.',
    ],
  },
];

export default function AdditionalSkills() {
  return (
    <Section classes="w-full" title="ACHIEVEMENTS">
      <div className="space-y-4">
        {exp.map((e, index) => (
          <Experience key={index} {...e} hideHead3 />
        ))}
      </div>
    </Section>
  );
}
