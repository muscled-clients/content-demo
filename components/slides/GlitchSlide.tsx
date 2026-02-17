'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function GlitchSlide() {
  const [glitchVariant, setGlitchVariant] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchVariant(prev => (prev + 1) % 3);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Different glitch patterns
  const glitchVariants = [
    // Variant 1: Heavy horizontal displacement
    {
      x: [0, -4, 2, -3, 5, 0, -2, 4, 0],
      textShadow: [
        "0 0 0 rgba(255,0,0,0), 0 0 0 rgba(0,255,255,0)",
        "5px 0 0 rgba(255,0,0,1), -5px 0 0 rgba(0,255,255,1)",
        "0 0 0 rgba(255,0,0,0), 0 0 0 rgba(0,255,255,0)",
        "-3px 0 0 rgba(255,0,0,0.8), 3px 0 0 rgba(0,255,255,0.8)",
        "0 0 0 rgba(255,0,0,0), 0 0 0 rgba(0,255,255,0)",
        "2px 0 0 rgba(255,0,0,0.9), -2px 0 0 rgba(0,255,255,0.9)",
        "0 0 0 rgba(255,0,0,0), 0 0 0 rgba(0,255,255,0)",
        "-6px 0 0 rgba(255,0,0,1), 6px 0 0 rgba(0,255,255,1)",
        "0 0 0 rgba(255,0,0,0), 0 0 0 rgba(0,255,255,0)"
      ],
      filter: ["hue-rotate(0deg)", "hue-rotate(180deg)", "hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)", "hue-rotate(270deg)", "hue-rotate(0deg)", "hue-rotate(45deg)", "hue-rotate(0deg)"]
    },
    // Variant 2: Vertical shake with different colors
    {
      x: [0, 1, -1, 0, 2, -2, 1, 0, -1],
      y: [0, -2, 1, -1, 2, 0, -3, 1, 0],
      textShadow: [
        "0 0 0 rgba(0,255,0,0), 0 0 0 rgba(255,0,255,0)",
        "0 3px 0 rgba(0,255,0,0.9), 0 -3px 0 rgba(255,0,255,0.9)",
        "0 0 0 rgba(0,255,0,0), 0 0 0 rgba(255,0,255,0)",
        "2px 2px 0 rgba(0,255,0,0.7), -2px -2px 0 rgba(255,0,255,0.7)",
        "0 0 0 rgba(0,255,0,0), 0 0 0 rgba(255,0,255,0)",
        "-1px 1px 0 rgba(0,255,0,0.8), 1px -1px 0 rgba(255,0,255,0.8)",
        "0 0 0 rgba(0,255,0,0), 0 0 0 rgba(255,0,255,0)",
        "0 -4px 0 rgba(0,255,0,1), 0 4px 0 rgba(255,0,255,1)",
        "0 0 0 rgba(0,255,0,0), 0 0 0 rgba(255,0,255,0)"
      ],
      filter: ["saturate(1)", "saturate(2)", "saturate(1)", "saturate(0.5)", "saturate(1)", "saturate(1.5)", "saturate(1)", "saturate(0)", "saturate(1)"]
    },
    // Variant 3: Chaotic multi-directional
    {
      x: [0, -3, 4, -2, 1, 3, -4, 2, 0],
      y: [0, 2, -3, 1, -2, 3, -1, 2, 0],
      scale: [1, 1.02, 0.98, 1.01, 0.99, 1.03, 0.97, 1.01, 1],
      textShadow: [
        "0 0 0 rgba(255,255,0,0), 0 0 0 rgba(255,0,255,0)",
        "3px -2px 0 rgba(255,255,0,0.8), -2px 3px 0 rgba(255,0,255,0.8)",
        "0 0 0 rgba(255,255,0,0), 0 0 0 rgba(255,0,255,0)",
        "-4px 1px 0 rgba(255,255,0,0.9), 4px -1px 0 rgba(255,0,255,0.9)",
        "0 0 0 rgba(255,255,0,0), 0 0 0 rgba(255,0,255,0)",
        "1px 3px 0 rgba(255,255,0,0.7), -1px -3px 0 rgba(255,0,255,0.7)",
        "0 0 0 rgba(255,255,0,0), 0 0 0 rgba(255,0,255,0)",
        "-2px -4px 0 rgba(255,255,0,1), 2px 4px 0 rgba(255,0,255,1)",
        "0 0 0 rgba(255,255,0,0), 0 0 0 rgba(255,0,255,0)"
      ],
      filter: ["brightness(1)", "brightness(1.5)", "brightness(0.8)", "brightness(1.2)", "brightness(0.9)", "brightness(1.4)", "brightness(0.7)", "brightness(1.3)", "brightness(1)"]
    }
  ];

  const currentVariant = glitchVariants[glitchVariant];

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black">
      <motion.h1 
        className="text-6xl font-bold text-center text-white relative"
        animate={currentVariant}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: Math.random() * 1 + 0.5, // Random delay between 0.5-1.5s
          times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1],
          ease: "linear"
        }}
        key={glitchVariant} // Force re-render on variant change
      >
        DISRUPTING THE INDUSTRY
        
        {/* Randomized glitch overlay bars */}
        <motion.div
          className="absolute inset-0 bg-red-500 mix-blend-screen opacity-80"
          animate={{
            clipPath: glitchVariant === 0 ? [
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              "polygon(0% 20%, 100% 15%, 100% 25%, 0% 30%)",
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              "polygon(0% 60%, 100% 55%, 100% 75%, 0% 70%)",
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
            ] : glitchVariant === 1 ? [
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              "polygon(0% 10%, 100% 5%, 100% 15%, 0% 20%)",
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              "polygon(0% 80%, 100% 85%, 100% 90%, 0% 95%)",
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
            ] : [
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              "polygon(0% 30%, 100% 25%, 100% 35%, 0% 40%)",
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              "polygon(0% 50%, 100% 45%, 100% 55%, 0% 60%)",
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
            ]
          }}
          transition={{
            duration: 0.18,
            repeat: Infinity,
            repeatDelay: Math.random() * 0.8 + 0.3,
            times: [0, 0.2, 0.4, 0.7, 1]
          }}
          key={`red-${glitchVariant}`}
        />
        
        <motion.div
          className="absolute inset-0 bg-cyan-500 mix-blend-screen opacity-80"
          animate={{
            clipPath: glitchVariant === 0 ? [
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              "polygon(0% 40%, 100% 35%, 100% 45%, 0% 50%)",
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              "polygon(0% 5%, 100% 0%, 100% 10%, 0% 15%)",
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
            ] : glitchVariant === 1 ? [
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              "polygon(0% 25%, 100% 20%, 100% 30%, 0% 35%)",
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              "polygon(0% 70%, 100% 65%, 100% 75%, 0% 80%)",
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
            ] : [
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              "polygon(0% 15%, 100% 10%, 100% 20%, 0% 25%)",
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              "polygon(0% 85%, 100% 80%, 100% 90%, 0% 95%)",
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
            ]
          }}
          transition={{
            duration: 0.22,
            repeat: Infinity,
            repeatDelay: Math.random() * 0.6 + 0.4,
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
          key={`cyan-${glitchVariant}`}
        />

        {/* Additional dynamic glitch layer */}
        <motion.div
          className={`absolute inset-0 mix-blend-screen opacity-60 ${glitchVariant === 0 ? 'bg-green-500' : glitchVariant === 1 ? 'bg-yellow-500' : 'bg-purple-500'}`}
          animate={{
            clipPath: [
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              `polygon(0% ${Math.random() * 20 + 10}%, 100% ${Math.random() * 20 + 5}%, 100% ${Math.random() * 20 + 15}%, 0% ${Math.random() * 20 + 20}%)`,
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              `polygon(0% ${Math.random() * 30 + 60}%, 100% ${Math.random() * 30 + 55}%, 100% ${Math.random() * 30 + 85}%, 0% ${Math.random() * 30 + 80}%)`,
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
            ]
          }}
          transition={{
            duration: 0.16,
            repeat: Infinity,
            repeatDelay: Math.random() * 1.2 + 0.2,
            times: [0, 0.3, 0.5, 0.8, 1]
          }}
          key={`dynamic-${glitchVariant}`}
        />
      </motion.h1>
    </div>
  );
}