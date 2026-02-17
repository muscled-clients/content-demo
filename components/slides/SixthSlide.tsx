'use client';

import { motion } from 'framer-motion';

export default function SixthSlide() {
  const text = "THIS IS HOW WE RUN MUSCLED";
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
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black">
      <motion.h1 
        className="text-6xl font-bold text-center text-white max-w-6xl"
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
              width: item === " " ? "0.5em" : "auto"
            }}
          >
            {item === " " ? "\u00A0" : item}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}