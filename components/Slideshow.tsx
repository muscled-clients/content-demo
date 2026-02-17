'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import PreviewSlide from './slides/PreviewSlide';
import FirstSlide from './slides/FirstSlide';
import SecondSlide from './slides/SecondSlide';
import ThirdSlide from './slides/ThirdSlide';
import FourthSlideA from './slides/FourthSlideA';
import FourthSlideB from './slides/FourthSlideB';
import FourthSlideC from './slides/FourthSlideC';
import FourthSlide from './slides/FourthSlide';
import FifthSlide from './slides/FifthSlide';
import SixthSlide from './slides/SixthSlide';
import TypewriterSlide from './slides/TypewriterSlide';
import GlitchSlide from './slides/GlitchSlide';
import ProgressBarSlide from './slides/ProgressBarSlide';
import NumberCounterSlide from './slides/NumberCounterSlide';
import LineGraphSlide from './slides/LineGraphSlide';
import BarGraphSlide from './slides/BarGraphSlide';
import StackedBoxesSlide from './slides/StackedBoxesSlide';
import StackedMdFilesSlide from './slides/StackedMdFilesSlide';
import PromptDisplaySlide from './slides/PromptDisplaySlide';

const slides = [
  { id: 0, component: PreviewSlide, noTransition: false },
  { id: 1, component: FirstSlide, noTransition: false },
  { id: 2, component: SecondSlide, noTransition: false },
  { id: 3, component: ThirdSlide, noTransition: false },
  { id: 4, component: FourthSlideA, noTransition: true },
  { id: 5, component: FourthSlideB, noTransition: true },
  { id: 6, component: FourthSlideC, noTransition: true },
  { id: 7, component: FourthSlide, noTransition: true },
  { id: 8, component: FifthSlide, noTransition: false },
  { id: 9, component: SixthSlide, noTransition: false },
  { id: 10, component: TypewriterSlide, noTransition: false },
  { id: 11, component: GlitchSlide, noTransition: false },
  { id: 12, component: ProgressBarSlide, noTransition: false },
  { id: 13, component: NumberCounterSlide, noTransition: false },
  { id: 14, component: LineGraphSlide, noTransition: false },
  { id: 15, component: BarGraphSlide, noTransition: false },
  { id: 16, component: StackedBoxesSlide, noTransition: false },
  { id: 17, component: StackedMdFilesSlide, noTransition: false },
  { id: 18, component: PromptDisplaySlide, noTransition: false },
];

export default function Slideshow() {
  const searchParams = useSearchParams();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideParam = searchParams.get('slide');
    if (slideParam) {
      const slideNumber = parseInt(slideParam);
      if (slideNumber >= 0 && slideNumber < slides.length) {
        setCurrentSlide(slideNumber);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        const newSlide = (currentSlide + 1) % slides.length;
        setCurrentSlide(newSlide);
        const url = new URL(window.location.href);
        url.searchParams.set('slide', newSlide.toString());
        window.history.pushState({}, '', url.toString());
      } else if (e.key === 'ArrowLeft') {
        const newSlide = (currentSlide - 1 + slides.length) % slides.length;
        setCurrentSlide(newSlide);
        const url = new URL(window.location.href);
        url.searchParams.set('slide', newSlide.toString());
        window.history.pushState({}, '', url.toString());
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const handleSlideSelect = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('slide', slideIndex.toString());
    window.history.pushState({}, '', url.toString());
  };

  const CurrentSlideComponent = slides[currentSlide].component;
  const currentSlideConfig = slides[currentSlide];

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {currentSlideConfig.noTransition ? (
        <div className="absolute inset-0">
          {currentSlide === 0 ? (
            <CurrentSlideComponent onSlideSelect={handleSlideSelect} />
          ) : (
            <CurrentSlideComponent />
          )}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {currentSlide === 0 ? (
              <CurrentSlideComponent onSlideSelect={handleSlideSelect} />
            ) : (
              <CurrentSlideComponent />
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}