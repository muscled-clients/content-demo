'use client';

import { motion } from 'framer-motion';

export default function FourthSlide() {
  const tools = [
    { id: 1, name: 'GITHUB', description: 'Version Control' },
    { id: 2, name: 'CLAUDE CODE', description: 'AI Assistant' },
    { id: 3, name: 'SUPERWHISPER', description: 'Dictation Tool' },
    { id: 4, name: 'VS CODE', description: 'Code Editor' }
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
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-gray-950">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900" />
      
      <div className="max-w-6xl w-full px-8 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-8"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.id}
              variants={boxVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="bg-white rounded-lg p-12 flex flex-col items-center justify-center min-h-[250px] shadow-2xl cursor-pointer"
            >
              <h2 className="text-gray-900 text-3xl font-bold text-center mb-3">
                {tool.name}
              </h2>
              <p className="text-gray-600 text-sm uppercase tracking-wider">
                {tool.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Optional title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <h1 className="text-white text-2xl font-light">Development Toolkit</h1>
        </motion.div>
      </div>
    </div>
  );
}