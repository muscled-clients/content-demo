'use client';

import { motion } from 'framer-motion';

export default function FourthSlideB() {
  const tools = [
    { id: 1, name: 'GITHUB', description: 'Version Control' },
    { id: 2, name: 'CLAUDE CODE', description: 'AI Assistant' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const boxVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black">
      
      <div className="max-w-6xl w-full px-8 z-10">
        <div className="grid grid-cols-2 gap-8">
          {/* GitHub - static (no animation) */}
          <div className="relative bg-black rounded-lg p-12 flex flex-col items-center justify-center min-h-[250px] shadow-2xl cursor-pointer overflow-hidden">
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-75">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500"
                animate={{
                  background: [
                    'linear-gradient(0deg, #3b82f6, #8b5cf6, #ec4899)',
                    'linear-gradient(90deg, #ec4899, #f59e0b, #3b82f6)', 
                    'linear-gradient(180deg, #f59e0b, #10b981, #8b5cf6)',
                    'linear-gradient(270deg, #10b981, #3b82f6, #ec4899)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
            <div className="absolute inset-[4px] bg-black rounded-lg" />
            <div className="relative z-10">
              <h2 className="text-white text-3xl font-bold text-center mb-3">
                GITHUB
              </h2>
              <p className="text-gray-400 text-sm uppercase tracking-wider">
                Version Control
              </p>
            </div>
          </div>
          
          {/* Claude Code - animated (new box) */}
          <motion.div
            variants={boxVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            className="relative bg-black rounded-lg p-12 flex flex-col items-center justify-center min-h-[250px] shadow-2xl cursor-pointer overflow-hidden"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-75">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500"
                animate={{
                  background: [
                    'linear-gradient(0deg, #3b82f6, #8b5cf6, #ec4899)',
                    'linear-gradient(90deg, #ec4899, #f59e0b, #3b82f6)', 
                    'linear-gradient(180deg, #f59e0b, #10b981, #8b5cf6)',
                    'linear-gradient(270deg, #10b981, #3b82f6, #ec4899)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
            <div className="absolute inset-[4px] bg-black rounded-lg" />
            <div className="relative z-10">
              <h2 className="text-white text-3xl font-bold text-center mb-3">
                CLAUDE CODE
              </h2>
              <p className="text-gray-400 text-sm uppercase tracking-wider">
                AI Assistant
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}