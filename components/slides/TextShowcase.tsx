'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TextShowcaseProps {
  onSlideSelect: (index: number) => void;
}

export default function TextShowcase({ onSlideSelect }: TextShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Word-by-word animation (Slide 8)
  const WordAnimation = () => {
    const words = ["IF", "YOU'RE", "NOT", "USING", "CLAUDE", "CODE,", "YOU'RE", "MISSING", "OUT."];
    
    const container = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2
        }
      }
    };

    const word = {
      hidden: {
        opacity: 0,
        y: 40,
        scale: 0.5,
        rotateX: -90
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200
        }
      }
    };

    return (
      <motion.h1 
        className="text-5xl font-bold text-center text-white flex flex-wrap justify-center gap-3"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {words.map((item, index) => (
          <motion.span
            key={index}
            variants={word}
            className="inline-block"
          >
            {item}
          </motion.span>
        ))}
      </motion.h1>
    );
  };

  // Letter-by-letter animation (Slide 9)
  const LetterAnimation = () => {
    const text = "IF YOU'RE NOT USING CLAUDE CODE, YOU'RE MISSING OUT.";
    const letters = text.split("");
    
    const container = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.03,
          delayChildren: 0.3
        }
      }
    };

    const letter = {
      hidden: {
        opacity: 0,
        filter: "blur(10px)",
        x: -20
      },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        x: 0,
        transition: {
          duration: 0.4,
          ease: "easeOut"
        }
      }
    };

    return (
      <motion.h1 
        className="text-5xl font-bold text-center text-white"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {letters.map((item, index) => (
          <motion.span
            key={index}
            variants={letter}
            className="inline-block"
            style={{
              display: item === " " ? "inline" : "inline-block",
              width: item === " " ? "0.3em" : "auto"
            }}
          >
            {item === " " ? "\u00A0" : item}
          </motion.span>
        ))}
      </motion.h1>
    );
  };

  // Typewriter animation (updated version)
  const TypewriterAnimation = () => {
    const text = "BUILD SOMETHING AMAZING TODAY";
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayedText(text.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, 50);

        return () => clearTimeout(timer);
      }
    }, [currentIndex, text]);

    return (
      <div className="text-5xl font-bold text-center text-white flex items-baseline justify-center">
        <span>{displayedText}</span>
        <motion.span
          className="inline-block w-1 h-16 bg-white ml-2"
          style={{ transform: 'translateY(0.3em)' }}
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
    );
  };

  // Glitch animation (new example)
  const GlitchAnimation = () => {
    return (
      <motion.h1 
        className="text-5xl font-bold text-center text-white relative"
        animate={{
          textShadow: [
            "0 0 0 rgba(255,0,0,0), 0 0 0 rgba(0,255,255,0)",
            "2px 2px 0 rgba(255,0,0,0.8), -2px -2px 0 rgba(0,255,255,0.8)",
            "0 0 0 rgba(255,0,0,0), 0 0 0 rgba(0,255,255,0)",
          ]
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 2,
          times: [0, 0.5, 1]
        }}
      >
        DISRUPTING THE INDUSTRY
      </motion.h1>
    );
  };

  const animations = [
    {
      id: 8,
      name: "Word Slap",
      component: WordAnimation,
      file: "FifthSlide.tsx",
      description: "Words spring in with 3D rotation",
      tags: ["impact", "spring", "3D"]
    },
    {
      id: 9,
      name: "Letter Wave",
      component: LetterAnimation,
      file: "SixthSlide.tsx",
      description: "Letters fade in with blur effect",
      tags: ["smooth", "wave", "blur"]
    },
    {
      id: 10,
      name: "Typewriter",
      component: TypewriterAnimation,
      file: "TypewriterSlide.tsx (new)",
      description: "Classic typewriter with cursor",
      tags: ["classic", "cursor", "linear"]
    },
    {
      id: 11,
      name: "Glitch Effect",
      component: GlitchAnimation,
      file: "GlitchSlide.tsx (new)",
      description: "Digital glitch with color splits",
      tags: ["glitch", "digital", "tech"]
    }
  ];

  return (
    <div className="w-full h-full bg-black overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-black/95 backdrop-blur-lg z-20 border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Text Animations Showcase</h1>
          <p className="text-gray-400">All text animations in one place • Click to view full screen</p>
        </div>
      </div>

      {/* Animations List */}
      <div className="max-w-7xl mx-auto p-6 space-y-16">
        {animations.map((anim, index) => {
          const AnimationComponent = anim.component;
          return (
            <motion.section
              key={anim.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animation Info Bar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {anim.id}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{anim.name}</h2>
                    <p className="text-gray-500 text-sm">{anim.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-gray-400 text-xs">Edit in:</p>
                    <p className="text-purple-400 font-mono text-sm">{anim.file}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSlideSelect(anim.id)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
                  >
                    View Full Screen
                  </motion.button>
                </div>
              </div>

              {/* Animation Preview */}
              <div 
                className="relative min-h-[200px] flex items-center justify-center p-12 bg-gray-900/30 rounded-xl border border-gray-800 cursor-pointer hover:border-gray-700 transition-all"
                onClick={() => onSlideSelect(anim.id)}
              >
                {/* Hover Overlay */}
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl pointer-events-none"
                  />
                )}

                {/* Animation */}
                <AnimationComponent />

                {/* Tags */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {anim.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-800/80 backdrop-blur rounded-full text-xs text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Click hint */}
                <div className="absolute top-4 right-4 text-gray-600 text-xs">
                  Click to preview
                </div>
              </div>
            </motion.section>
          );
        })}

        {/* Add More Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-16 border-t border-gray-800"
        >
          <p className="text-gray-500 mb-4">Need a different animation?</p>
          <div className="bg-gray-900/50 backdrop-blur rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-gray-400 text-sm">
              Request format: Describe the text effect you need, duration, and where it will be used.
              New animations can be added to this showcase within minutes.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}