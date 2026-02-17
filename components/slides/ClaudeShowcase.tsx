'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface ClaudeShowcaseProps {
  onSlideSelect: (index: number) => void;
}

export default function ClaudeShowcase({ onSlideSelect }: ClaudeShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Simple title animation
  const TitleAnimation = () => (
    <motion.h1 
      className="text-4xl font-bold text-center text-white"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      CLAUDE CODE
    </motion.h1>
  );

  // Terminal typing simulation
  const TerminalAnimation = () => {
    const [displayText, setDisplayText] = useState("");
    const fullText = "Help me create a React component";

    useState(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setDisplayText(fullText.substring(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 80);
      return () => clearInterval(interval);
    });

    return (
      <div className="bg-gray-900 rounded-lg p-6 font-mono">
        <div className="text-green-400 text-lg">
          <span className="text-gray-500">$</span> {displayText}
          <span className="animate-pulse">|</span>
        </div>
      </div>
    );
  };

  // Response preview
  const ResponseAnimation = () => (
    <div className="bg-gray-800 rounded-lg p-4 text-white text-sm">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <div className="text-purple-400">🤖 Claude Response:</div>
        <div>I'll help you create a React component...</div>
        <div className="text-gray-500">• Todo list response</div>
        <div className="text-gray-500">• Code diff response</div>
      </motion.div>
    </div>
  );

  const animations = [
    {
      id: 1,
      name: "Title Card",
      component: TitleAnimation,
      file: "FirstSlide.tsx",
      description: "Animated Claude Code logo with gradient text",
      tags: ["intro", "logo", "branding"]
    },
    {
      id: 2,
      name: "Terminal Input",
      component: TerminalAnimation,
      file: "SecondSlide.tsx", 
      description: "Typing animation in terminal window",
      tags: ["terminal", "typing", "input"]
    },
    {
      id: 3,
      name: "Response Types",
      component: ResponseAnimation,
      file: "ThirdSlide.tsx",
      description: "Multiple response formats with sidebar selector",
      tags: ["response", "output", "interactive"]
    }
  ];

  return (
    <div className="w-full h-full bg-black overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-black/95 backdrop-blur-lg z-20 border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
            Claude Code Animations
          </h1>
          <p className="text-gray-400">AI assistant interactions and terminal animations</p>
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
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
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
                    <p className="text-blue-400 font-mono text-sm">{anim.file}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSlideSelect(anim.id)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
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
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl pointer-events-none"
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