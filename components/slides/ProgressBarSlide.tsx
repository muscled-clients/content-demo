'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ProgressBarSlide() {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStartAnimation(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const skills = [
    { name: "React Development", percentage: 95, color: "from-blue-500 to-cyan-500" },
    { name: "JavaScript ES6+", percentage: 88, color: "from-yellow-500 to-orange-500" },
    { name: "TypeScript", percentage: 82, color: "from-blue-600 to-purple-600" },
    { name: "Node.js", percentage: 78, color: "from-green-500 to-emerald-500" },
    { name: "UI/UX Design", percentage: 72, color: "from-pink-500 to-rose-500" }
  ];

  return (
    <div className="w-full h-full flex items-center justify-center bg-black p-8">
      <div className="max-w-4xl w-full">
        <motion.h1
          className="text-5xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Skills & Expertise
        </motion.h1>

        <div className="space-y-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: startAnimation ? index * 0.2 : 0 
              }}
              className="space-y-3"
            >
              {/* Skill name and percentage */}
              <div className="flex justify-between items-center">
                <span className="text-white text-xl font-semibold">
                  {skill.name}
                </span>
                <motion.span
                  className="text-gray-400 text-lg font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    delay: startAnimation ? index * 0.2 + 0.8 : 0 
                  }}
                >
                  {skill.percentage}%
                </motion.span>
              </div>

              {/* Progress bar container */}
              <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
                {/* Background glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-20 rounded-full`} />
                
                {/* Animated progress bar */}
                <motion.div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
                  initial={{ width: 0 }}
                  animate={{ 
                    width: startAnimation ? `${skill.percentage}%` : 0 
                  }}
                  transition={{ 
                    duration: 1.2, 
                    delay: startAnimation ? index * 0.2 + 0.3 : 0,
                    ease: "easeOut"
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 1.5,
                      delay: startAnimation ? index * 0.2 + 1 : 0,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <p className="text-gray-500 text-lg">
            Continuously improving and learning new technologies
          </p>
        </motion.div>
      </div>
    </div>
  );
}