'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function StackedCardsSlide() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const files = [
    { name: 'Refactoring-Principles.md', color: 'from-orange-500 to-red-500', lines: 245 },
    { name: 'Component-Architecture.md', color: 'from-blue-500 to-purple-500', lines: 189 },
    { name: 'Performance-Guide.md', color: 'from-green-500 to-teal-500', lines: 312 },
    { name: 'Testing-Strategy.md', color: 'from-pink-500 to-rose-500', lines: 156 },
    { name: 'API-Documentation.md', color: 'from-yellow-500 to-amber-500', lines: 278 }
  ];

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      {/* Stack Container */}
      <div className="relative w-[500px] h-[400px] z-10">
        {files.map((file, index) => {
          const isHovered = hoveredIndex === index;
          const offset = index * 15; // Vertical offset for stacking
          const horizontalOffset = index * 8; // Slight horizontal offset
          const rotation = (index - 2) * 2; // Slight rotation for natural look
          
          return (
            <motion.div
              key={file.name}
              initial={{ 
                y: 100, 
                opacity: 0,
                scale: 0.8
              }}
              animate={{ 
                y: isHovered ? offset - 10 : offset,
                x: horizontalOffset,
                opacity: 1,
                scale: isHovered ? 1.02 : 1,
                rotate: isHovered ? 0 : rotation,
                zIndex: isHovered ? 50 : files.length - index
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: index * 0.1
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="absolute top-0 left-0 w-full cursor-pointer"
              style={{
                transformOrigin: 'center bottom'
              }}
            >
              {/* Card Shadow */}
              <div 
                className="absolute inset-0 bg-black rounded-2xl blur-xl opacity-50"
                style={{
                  transform: `translateY(${isHovered ? '20px' : '10px'})`,
                }}
              />
              
              {/* Card */}
              <div className={`
                relative bg-gray-900 rounded-2xl p-8 border border-gray-800
                ${isHovered ? 'border-gray-600' : ''}
                transition-all duration-300
              `}>
                {/* Gradient Accent Line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${file.color} rounded-t-2xl`} />
                
                {/* File Icon and Name */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`
                    w-16 h-16 rounded-xl bg-gradient-to-br ${file.color}
                    flex items-center justify-center shadow-lg
                    ${isHovered ? 'scale-110' : ''}
                    transition-transform duration-300
                  `}>
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-mono text-lg font-semibold mb-1">
                      {file.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Markdown Document
                    </p>
                  </div>
                </div>
                
                {/* Markdown Preview Lines */}
                <div className="space-y-2 mb-4">
                  <div className="h-2 bg-gray-800 rounded w-full" />
                  <div className="h-2 bg-gray-800 rounded w-4/5" />
                  <div className="h-2 bg-gray-800 rounded w-3/4" />
                  <div className="h-2 bg-gray-800 rounded w-5/6" />
                </div>
                
                {/* File Info */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{file.lines} lines</span>
                  <span>Modified recently</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-20 text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-3">
          Documentation Stack
        </h2>
        <p className="text-gray-400 text-lg">
          Hover to explore the markdown files
        </p>
      </motion.div>
    </div>
  );
}