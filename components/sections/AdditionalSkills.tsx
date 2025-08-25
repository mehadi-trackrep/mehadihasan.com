import Section from '@/components/sections/Section';

import Experience from '@/components/Experience';

const exp: ExperienceProps[] = [
  {
    bulletPoints: [
      'ACM ICPC Dhaka Regional 2018: I have participated with a team of three members. Rank: 63 among 298 teams.',
      'Hackathon: Champion of Hackathon in IUT 9th ICT Fest, 2017, Dept. of CSE, IUT.',
      'SQL(HackerRank): Solved all the problems and got five stars.',
      'Solved 1130+ problems in various online judges such as 215+ on Leetcode (136+ Medium), 135+ on Codeforces, 100+ on LightOj, etc.',
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
