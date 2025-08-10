"use client";
import Image from 'next/image';

import { useEffect, useState } from "react";


export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  
  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button 
          onClick={scrollToTop}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          <Image 
            src="/icons/hand-pointing-up.png" 
            alt="hand pointing up" 
            width={50} 
            height={50}
          />
        </button>
      )}
    </div>
  );
}