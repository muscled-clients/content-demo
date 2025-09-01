'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { rawMarkdownContent, highlightMarkdown } from './RawMarkdown';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const mdItemVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function FirstSlide() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10" />
      
      <div className="flex gap-6 max-w-7xl w-full px-8 z-10">
        {/* File Structure - Left Side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-[400px]"
        >
          <motion.div 
            className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl h-auto"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-gray-400 text-xs ml-3 font-mono">File Explorer</span>
            </div>
            
            <div className="font-mono text-xs space-y-1">
              <motion.div variants={itemVariants} className="flex items-center gap-2">
                <span className="text-gray-500">📁</span>
                <span className="text-blue-400 font-semibold">Unpuzzle-MVP</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-2 pl-4">
                <span className="text-gray-500">├── 📁</span>
                <span className="text-cyan-400">logs</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-2 pl-8">
                <span className="text-gray-500">└── 📁</span>
                <span className="text-cyan-400">2025-08-31</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-2 pl-12">
                <span className="text-gray-500">└── 📄</span>
                <span className="text-orange-400 bg-orange-400/20 px-1 rounded">Refactoring-Principles.md</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-2 pl-4">
                <span className="text-gray-500">├── 📁</span>
                <span className="text-cyan-400">src</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-2 pl-8">
                <span className="text-gray-500">├── 📁</span>
                <span className="text-purple-400">components</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-2 pl-8">
                <span className="text-gray-500">├── 📁</span>
                <span className="text-pink-400">features</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-2 pl-8">
                <span className="text-gray-500">├── 📁</span>
                <span className="text-blue-400">hooks</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-2 pl-8">
                <span className="text-gray-500">└── 📁</span>
                <span className="text-green-400">store</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-2 pl-12">
                <span className="text-gray-500">├── 📄</span>
                <span className="text-green-300">index.ts</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-2 pl-12">
                <span className="text-gray-500">└── 📁</span>
                <span className="text-cyan-400">slices</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-2 pl-4">
                <span className="text-gray-500">├── 📄</span>
                <span className="text-red-400">package.json</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-2 pl-4">
                <span className="text-gray-500">├── 📄</span>
                <span className="text-blue-300">tsconfig.json</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-2 pl-4">
                <span className="text-gray-500">└── 📄</span>
                <span className="text-green-400">vite.config.ts</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Markdown File - Right Side (Scrollable) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1"
        >
          <motion.div 
            className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl h-[600px] flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4 flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-gray-400 text-xs ml-3 font-mono">Refactoring-Principles.md</span>
            </div>
            
            <div className="font-mono text-xs overflow-y-auto pr-2 custom-scrollbar">
              {highlightMarkdown(rawMarkdownContent)}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.7);
        }
      `}</style>

    </div>
  );
}