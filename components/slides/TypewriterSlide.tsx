'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function TypewriterSlide() {
  const text = "CLAUDE CODE IS THE BEST";
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50); // 50ms delay between characters

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black">
      <div className="text-6xl font-bold text-center text-white flex items-baseline justify-center">
        <span>{displayedText}</span>
        <motion.span
          className="inline-block w-1 h-20 bg-white ml-2"
          style={{ transform: 'translateY(0.3em)' }}
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
    </div>
  );
}