'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import type { UrlObject } from 'url';
import Image from 'next/image';
import { useWindowWidth } from '@react-hook/window-size';
import { FaLinkedin, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type Testimonial = {
  img: string;
  name: string;
  designation: string;
  caption: string;
  text: string;
  linkedinLink: string | UrlObject;
};

// Split the raw text on blank lines so each block renders as its own paragraph.
// Single line breaks inside a block are kept by the `whitespace-pre-line` class.
const toParagraphs = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const testimonials: Testimonial[] = [
  // {
  //   name: 'Håkan Höglund',
  //   img: '/images/people/håkan-höglund.jpeg',
  //   designation: 'Chief Technology Officer at Goava',
  //   caption: 'May 16, 2022, Håkan managed Mehadi directly',
  //   text: "I have had the privilege of working with Sajib Khan in his role as Lead Software Engineer at Goava Sales Intelligence AB. Sajib reports to me directly. Sajib joined Goava in July 2019 as Senior Software Engineer leading the front-end development team. Sajib is a very talented engineer and a dedicated and hard working employee. He is highly skilled in technologies such as JavaScript, React.js, Next.js, TypeScript, Redux, etc. Sajib is also a very capable project lead and well-versed in agile methodologies. He is a key employee at Goava and I'm certain he would perform well in any similar role.",
  //   linkedinLink: 'https://www.linkedin.com/in/h%C3%A5kan-h%C3%B6glund-03ba622',
  // },
  // {
  //   name: 'Anton Weihard',
  //   img: '/images/people/anton-weihard.jpeg',
  //   designation: 'CEO & Co-Founder at Goava',
  //   caption: 'April 24, 2022, Anton worked with Mehadi on the same team',
  //   text: 'I’m really happy to be working with Sajib. He’s a great leader with an fantastic eye for solving problems and with a strong commitment to the work he puts in. With a good understanding of user stories he helps me as a product manager to solve problems for our customers and making the product better in each and every sprint. He is also a very kind and caring person which makes him appreciate by me and his other colleagues.',
  //   linkedinLink: 'https://www.linkedin.com/in/anton-weihard',
  // },
  {
    name: 'Håkan Höglund ',
    img: '/images/people/håkan-höglund.jpeg',
    designation:
      'Chief Technology Officer at Goava',
    caption: 'September 11, 2026, Håkan managed Md. Mehadi directly',
    text: `I have had the pleasure of working with Mehadi Hasan at Goava Sales Intelligence AB since December 2020. He was promoted to Senior Software Engineer in March 2026.

Mehadi is a capable and dependable engineer with experience in backend development, data pipelines and cloud infrastructure. He takes responsibility for his systems from design through to production and pays attention to detail.

His work at Goava includes ownership of our primary company data pipeline, development of the Twingly API integration and news pipeline powering our company news and recruitment signals, and the design of our contacts data pipeline. The latter consolidates director and people data from multiple sources with reliable deduplication and full change history.

Mehadi has also made important contributions to maintaining and improving our OpenSearch infrastructure. He has worked through production incidents with a focus on identifying and addressing the underlying causes. His redesign of our sharding strategy and reindexing of two of our largest indices enabled us to right-size the cluster and commit to reserved instances. We expect these changes to reduce our AWS OpenSearch spend by around 40%.

Mehadi is proactive and takes ownership of his work. He identifies problems and cost inefficiencies and proposes practical solutions. He considers security in his design decisions and is open about trade-offs, risks and mistakes. I appreciate his honesty and straightforward communication.

I can confidently recommend Mehadi for backend development, data engineering or cloud infrastructure work. He would be a valuable addition to any development team.`,
    linkedinLink: 'https://www.linkedin.com/in/h%C3%A5kan-h%C3%B6glund-03ba622/',
  },
  {
    name: 'Asfak Mahamud',
    img: '/images/people/asfak-mahamud.jpeg',
    designation:
      'Lead Engineer (Data Team)',
    caption: 'September 11, 2026, Asfak worked with Md. Mehadi on the same team',
    text: `I have worked closely with Mehadi at Goava Data Backend Team. What stands out most is his character. People trust him. He is honest. He is consistent. He is easy to rely on, especially when things get stressful.

If he commits to something, he gets it done. If something can't be done, he tells you early. He does not wait until the last minute.

He is also a great teammate. He shares what he knows. He checks in on people. He stays calm with hard problems. This calmness makes the problems feel smaller for everyone else.

He is curious by nature. He is always learning something new. He likes to share what he learns. He does this with humility. He never makes it about himself, even when he solved the hard part.

I recommend him to any team. :)`,
    linkedinLink: 'https://www.linkedin.com/in/asfakmahamud/',
  },
  {
    name: 'Rana Asif Bin Hamid',
    img: '/images/people/rana-asif-bin-hamid.jpeg',
    designation:
      'VP of Engineering at Goava',
    caption: 'September 11, 2026, Rana Asif Bin managed Md. Mehadi directly',
    text: "Mehadi is a standout data engineer who pairs deep architectural expertise with massive bottom-line ROI. He took full ownership of our primary data infrastructure, utilizing Python, SQL, S3 Athena Iceberg, Kinesis and AWS to scale our news and contacts pipelines. What impressed me most was his ability to turn critical infrastructure crises into long-term wins. When our OpenSearch cluster faced severe CPU and JVM saturation, he didn't just resolve the incident—he re-architected the sharding strategy. This optimization allowed us to transition to reserved AWS instances, cutting our total cloud spend by an incredible 43%. Mehadi is proactive, security-minded, and possesses a transparent communication style that makes him a deeply trusted asset to any engineering organization.",
    linkedinLink: 'https://www.linkedin.com/in/rana-asif-bin-hamid-898a716/',
  },
  {
    name: 'Anton Weihard ',
    img: '/images/people/anton-weihard.jpeg',
    designation:
      'CEO & Co-Founder at Goava',
    caption: 'September 15, 2026, Anton was senior to Md. Mehadi but didn’t manage Md. Mehadi directly',
    text: `I worked with Mehadi for six years at Goava, first as CPO from 2020 to 2024 and now as CEO. In that time he was a key contributor to several of our more foundational systems, including our core company data pipeline, our news and recruitment signal pipeline, and the contacts pipeline that consolidates director and people data from multiple external sources.
One thing that stood out was his work on our OpenSearch cluster. We had a run of production incidents there, high JVM pressure, CPU saturation, exhausted thread pools, and instead of just restarting things and hoping, Mehadi consistently dug in and found the actual root cause. That work led to a redesign of our sharding strategy and a reindex of our two largest indices, which right-sized the cluster enough for us to commit to reserved instances, a change we project will meaningfully cut our AWS costs.
He takes ownership of what he’s working on without needing to be asked, and tends to flag problems early, usually with a fix already in mind. He’s also straightforward about trade-offs, risks, and his own mistakes, which made his updates easy to trust.
I'd strongly recommend Mehadi for engineering roles that call for this kind of technical depth and reliability.`,
    linkedinLink: 'https://www.linkedin.com/in/anton-weihard/',
  },

  {
    name: 'Ashraful Islam',
    img: '/images/people/ashraful-islam.jpeg',
    designation:
      'Senior Software Engineer | BigData | NoSql | GraphDB | Machine Learning',
    caption: 'January 15, 2024, Ashraful Islam worked with Mehadi in the same data team',
    text: "From the perspective of a team leader, I had the pleasure of working alongside Md. Mehadi Hasan, and he consistently impressed me with his dedication, integrity, and collaborative spirit. His expertise in Python, SQL, ElasticSearch, Data Engineering, and DevOps, coupled with his strong understanding of Scraping, OOP, API Development, and Git, make him a highly sought-after developer and an invaluable asset to any team. \n\n Beyond his technical skills, Mehadi is an exemplary team player. His honesty, dedication, and willingness to collaborate make him a true asset to any team. He consistently goes the extra mile, shares his knowledge readily, and fosters a positive and productive work environment.\n Without hesitation, I recommend Md. Mehadi Hasan for any backend or data-related system development project. He is a skilled developer, a dedicated team player, and a true asset to any organization.",
    linkedinLink: 'https://www.linkedin.com/in/ashraful-islam-a336b271',
  },
  {
    name: 'Sabbir Amin',
    img: '/images/people/sabbir-amin.jpeg',
    designation:
      'Technical Lead at TechCare | Ex Senior Software Engineer at Goava | Machine Learning | Recommendation System | Opensource Contributor',
    caption: 'February 25, 2024, Sabbir worked with Md. Mehadi but on different teams',
    text: "Md. Mehadi Hasan bhai is one of the youngest minds I've been fortunate to work with. He excells in Data Engineering with lots of industry experiences and edge cases. He is honest, energetic, punctual and shows genuine interest in Data Pipeline. Once as his colleague, I wonder his frank apporach, `never-bored-to-learn` attitude and believing in doing matra to face any challenges. It's an honour to share same working space with such a nice person like him. I wish him all the best.",
    linkedinLink: 'https://www.linkedin.com/in/sabbir-amin-035009120',
  },
  {
    name: 'Md. Ariful Islam',
    img: '/images/people/ariful-islam.jpeg',
    designation:
      'Software Engineer | Programmer | Java | C++ | Kotlin | Android',
    caption: 'August 15, 2025, Md. Ariful and Md. Mehadi studied together',
    text: "I had the privilege of working closely with Md. Mehadi Hasan during our university years, especially as group-mate for our final year thesis. From the very beginning, I was impressed by his passion for research, ability to dive deep into complex problems, and determination to deliver valuable, well-thought-out solutions. His exceptional dedication was reflected in his outstanding academic performance—ranking 4th in our department—along with numerous course projects built from scratch and achievements in competitive programming and problem-solving. \n\n What sets Mehadi apart is the blend of his strong technical expertise with his admirable personal qualities. Honest, punctual, and highly reliable, he brings excellent communication skills, natural leadership, and a proactive mindset to any team. I am confident he will deliver excellence, commitment, and creativity beyond the level in any professional environment, making him a true rare asset to any organization.",
    linkedinLink: 'https://www.linkedin.com/in/ariful45/',
  },
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState(1);
  const width = useWindowWidth();

  useEffect(() => {
    if (width < 768) {
      setCarouselItems(1);
    } else if (width < 1024) {
      setCarouselItems(2);
    } else {
      setCarouselItems(3);
    }

    setCurrentIndex(0);
  }, [width]);

  // Display three testimonials at a time
  const displayedTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + carouselItems
  );

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      currentIndex + carouselItems >= testimonials.length
        ? 0
        : prevIndex + carouselItems
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      currentIndex - carouselItems < 0
        ? testimonials.length - carouselItems
        : prevIndex - carouselItems
    );
  };

  return (
    <section className="min-h-screen py-20 md:py-20">
      <div className="max-w-7xl mx-auto text-center">
        <div className="text-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <h2 className="text-carouselItems text-2xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              LinkedIn Recommendations
            </h2>

            <span className="rounded-full bg-[#01754f] px-3 py-1 text-sm font-semibold text-white shadow-sm">
              Received ({testimonials.length})
            </span>
          </div>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Trusted by Industry Leaders
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="grid grid-cols-1 gap-4 px-5  md:grid-cols-2 lg:grid-cols-3 1.5xl:px-0">
            {displayedTestimonials.map((testimonial) => (
              <div
                className="transform rounded-lg border border-gray-300 bg-white p-6 shadow-lg transition-transform hover:scale-105 dark:border-white2-80 dark:bg-white2-40"
                key={testimonial.name}
              >
                <div>
                  <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center sm:flex-row sm:items-start justify-start mb-4">
                      <div className="shrink-0 relative w-fit h-fit">
                        <Image
                          src={testimonial.img}
                          alt={testimonial.name}
                          className="w-24 h-24 mt-0 sm:mt-1 rounded-full shadow-md border-4 border-white dark:border-gray-700"
                          width="96"
                          height="96"
                        ></Image>

                        <Link
                          href={testimonial.linkedinLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                        >
                          <FaLinkedin className="w-5 h-5" />
                        </Link>
                      </div>
                      <div className="ml-0 mt-2 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-[1rem] text-gray-600 dark:text-gray-400">
                          {testimonial.designation}
                        </p>
                        <p className="text-xs text-center md:text-left text-gray-600 dark:text-gray-400">
                          {testimonial.caption}
                        </p>
                      </div>
                    </div>
                    <div className="w-full">
                      {toParagraphs(testimonial.text).map((paragraph, i) => (
                        <p
                          key={i}
                          className="mb-4 whitespace-pre-line text-left text-[1rem] text-gray-800 dark:text-white"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* <a
                    href={testimonial.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                  >
                    View on LinkedIn <FaLinkedin className="w-5 h-5" />
                  </a> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute left-[1.5rem] 1.5xl:left-0 top-[42%] -translate-x-12 w-[calc(100%+3rem)] 1.5xl:w-[calc(100%+6rem)] flex justify-between px-6">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-transform transform hover:scale-110"
            >
              <FaChevronLeft className="text-gray-800 dark:text-white w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-transform transform hover:scale-110"
            >
              <FaChevronRight className="text-gray-800 dark:text-white w-6 h-6" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {new Array(Math.ceil(testimonials.length / carouselItems))
              .fill('')
              .map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i * carouselItems)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentIndex / carouselItems === i
                      ? 'bg-blue-600'
                      : 'bg-gray-400 dark:bg-gray-600'
                  }`}
                ></button>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
