'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface BoxShowcaseProps {
  onSlideSelect: (index: number) => void;
}

export default function BoxShowcase({ onSlideSelect }: BoxShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Single box animation
  const SingleBoxAnimation = () => (
    <div className="relative bg-black rounded-lg p-12 flex flex-col items-center justify-center min-h-[250px] shadow-2xl cursor-pointer overflow-hidden">
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
        <h2 className="text-white text-2xl font-bold text-center mb-3">
          GITHUB
        </h2>
        <p className="text-gray-400 text-xs uppercase tracking-wider">
          Version Control
        </p>
      </div>
    </div>
  );

  // Two boxes animation
  const TwoBoxesAnimation = () => (
    <div className="grid grid-cols-2 gap-4">
      <SingleBoxAnimation />
      <div className="relative bg-black rounded-lg p-12 flex flex-col items-center justify-center min-h-[250px] shadow-2xl cursor-pointer overflow-hidden">
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
          <h2 className="text-white text-2xl font-bold text-center mb-3">
            CLAUDE CODE
          </h2>
          <p className="text-gray-400 text-xs uppercase tracking-wider">
            AI Assistant
          </p>
        </div>
      </div>
    </div>
  );

  // Three boxes preview
  const ThreeBoxesAnimation = () => (
    <div className="grid grid-cols-2 gap-4">
      <SingleBoxAnimation />
      <div className="space-y-4">
        <div className="h-24 bg-black rounded border-4 border-purple-500 flex items-center justify-center">
          <span className="text-white font-bold">CLAUDE CODE</span>
        </div>
        <div className="h-24 bg-black rounded border-4 border-pink-500 flex items-center justify-center">
          <span className="text-white font-bold">SUPERWHISPER</span>
        </div>
      </div>
    </div>
  );

  // Four boxes preview  
  const FourBoxesAnimation = () => (
    <div className="grid grid-cols-2 gap-2">
      <div className="h-20 bg-black rounded border-2 border-blue-500 flex items-center justify-center">
        <span className="text-white text-xs font-bold">GITHUB</span>
      </div>
      <div className="h-20 bg-black rounded border-2 border-purple-500 flex items-center justify-center">
        <span className="text-white text-xs font-bold">CLAUDE CODE</span>
      </div>
      <div className="h-20 bg-black rounded border-2 border-pink-500 flex items-center justify-center">
        <span className="text-white text-xs font-bold">SUPERWHISPER</span>
      </div>
      <div className="h-20 bg-black rounded border-2 border-yellow-500 flex items-center justify-center">
        <span className="text-white text-xs font-bold">VS CODE</span>
      </div>
    </div>
  );

  const animations = [
    {
      id: 4,
      name: "Single Box",
      component: SingleBoxAnimation,
      file: "FourthSlideA.tsx",
      description: "GitHub box with animated gradient border",
      tags: ["reveal", "single", "tool"]
    },
    {
      id: 5,
      name: "Two Boxes", 
      component: TwoBoxesAnimation,
      file: "FourthSlideB.tsx",
      description: "Progressive reveal: GitHub + Claude Code",
      tags: ["progressive", "dual", "tools"]
    },
    {
      id: 6,
      name: "Three Boxes",
      component: ThreeBoxesAnimation,
      file: "FourthSlideC.tsx", 
      description: "Three tools with staggered reveal",
      tags: ["progressive", "triple", "tools"]
    },
    {
      id: 7,
      name: "Complete Toolkit",
      component: FourBoxesAnimation,
      file: "FourthSlide.tsx",
      description: "All four tools with final reveal", 
      tags: ["complete", "toolkit", "tools"]
    }
  ];

  return (
    <div className="w-full h-full bg-black overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-black/95 backdrop-blur-lg z-20 border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent mb-2">
            Box Animations
          </h1>
          <p className="text-gray-400">Tool reveals and feature showcases with gradient borders</p>
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
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
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
                    <p className="text-pink-400 font-mono text-sm">{anim.file}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSlideSelect(anim.id)}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-shadow"
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
                    className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-yellow-500/10 rounded-xl pointer-events-none"
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

        {/* Back to categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-16 border-t border-gray-800"
        >
          <div
            onClick={() => window.open('/start', '_blank')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-semibold transition-colors cursor-pointer"
          >
            ← Back to Categories
          </div>
        </motion.div>
      </div>
    </div>
  );
}