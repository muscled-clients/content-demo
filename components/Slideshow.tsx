'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FirstSlide from './slides/FirstSlide';
import SecondSlide from './slides/SecondSlide';
import ThirdSlide from './slides/ThirdSlide';
import FourthSlide from './slides/FourthSlide';
import FifthSlide from './slides/FifthSlide';

const slides = [
  { id: 1, component: FirstSlide },
  { id: 2, component: SecondSlide },
  { id: 3, component: ThirdSlide },
  { id: 4, component: FourthSlide },
  { id: 5, component: FifthSlide },
];

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <CurrentSlideComponent />
        </motion.div>
      </AnimatePresence>

    </div>
  );
}