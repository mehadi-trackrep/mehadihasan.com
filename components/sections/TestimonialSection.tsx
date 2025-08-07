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
    name: 'Ashraful Islam',
    img: '/images/people/ashraful-islam.jpeg',
    designation:
      'Senior Software Engineer | BigData | NoSql | GraphDB | Machine Learning',
    caption: 'January 15, 2024, Ashraful Islam worked with Mehadi in the same data team',
    text: "From the perspective of a team leader, I had the pleasure of working alongside Md. Mehadi Hasan, and he consistently impressed me with his dedication, integrity, and collaborative spirit. His expertise in Python, SQL, ElasticSearch, Data Engineering, and DevOps, coupled with his strong understanding of Scraping, OOP, API Development, and Git, make him a highly sought-after developer and an invaluable asset to any team. Beyond his technical skills, Mehadi is an exemplary team player. His honesty, dedication, and willingness to collaborate make him a true asset to any team. He consistently goes the extra mile, shares his knowledge readily, and fosters a positive and productive work environment. Without hesitation, I recommend Md. Mehadi Hasan for any backend or data-related system development project. He is a skilled developer, a dedicated team player, and a true asset to any organization.",
    linkedinLink: 'https://www.linkedin.com/in/ashraful-islam-a336b271',
  },
  {
    name: 'Sabbir Amin',
    img: '/images/people/sabbir-amin.jpeg',
    designation:
      'Technical Lead at TechCare | Ex Senior Software Engineer at Goava | Machine Learning | Recommendation System | Opensource Contributor',
    caption: 'February 25, 2024, Sabbir Amin worked with Mehadi in different teams',
    text: "Md. Mehadi Hasan bhai is one of the youngest minds I've been fortunate to work with. He excells in Data Engineering with lots of industry experiences and edge cases. He is honest, energetic, punctual and shows genuine interest in Data Pipeline. Once as his colleague, I wonder his frank apporach, `never-bored-to-learn` attitude and believing in doing matra to face any challenges. It's an honour to share same working space with such a nice person like him. I wish him all the best.",
    linkedinLink: 'https://www.linkedin.com/in/sabbir-amin-035009120',
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
          <h2 className="text-carouselItems text-2xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            LinkedIn Recommendations
          </h2>

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
                <Link
                  href="https://www.linkedin.com/in/sajibkhan/details/recommendations"
                  target="_blank"
                >
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
                    <p
                      className="text-[1rem] text-left text-gray-800 dark:text-white mb-4"
                      dangerouslySetInnerHTML={{ __html: testimonial.text }}
                    ></p>

                    {/* <a
                    href={testimonial.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                  >
                    View on LinkedIn <FaLinkedin className="w-5 h-5" />
                  </a> */}
                  </div>
                </Link>
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
