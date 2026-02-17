'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function VideoUploadPatternSlide() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      id: 1,
      title: "1. User drops file",
      icon: "📁",
      description: "User drags and drops video file onto the upload area"
    },
    {
      id: 2,
      title: "2. Normalized slice calls server action",
      icon: "🔄",
      description: "Client-side Zustand store triggers server action with file"
    },
    {
      id: 3,
      title: "3. Server action processing",
      icon: "⚡",
      description: "Server-side operations",
      substeps: [
        "Validates user auth",
        "Gets Backblaze credentials from env",
        "Uploads file to Backblaze",
        "Saves metadata to Supabase",
        "Returns success/URL"
      ]
    },
    {
      id: 4,
      title: "4. Normalized slice updates UI",
      icon: "✨",
      description: "UI reflects the upload result"
    },
    {
      id: 5,
      title: "5. Progress updates",
      icon: "📊",
      description: "Real-time updates via separate API endpoint"
    },
    {
      id: 6,
      title: "Proven Patterns",
      icon: "🎯",
      description: "Following established codebase patterns",
      patterns: [
        { text: "Server-first authentication", icon: "🔐" },
        { text: "Server actions for sensitive operations", icon: "🛡️" },
        { text: "Client-side Zustand only for UI state", icon: "🎨" },
        { text: "No secrets in client code", icon: "🔒" }
      ]
    }
  ];

  const totalSteps = steps.length;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'l' || e.key === 'L') {
        // Go forward
        setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
      } else if (e.key === 'j' || e.key === 'J') {
        // Go backward
        setCurrentStep(prev => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [totalSteps]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex flex-col p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-1"
        >
          Video Upload Architecture
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-blue-300 text-sm"
        >
          Server-First Pattern with Backblaze & Supabase
        </motion.p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-3xl w-full">
          <AnimatePresence mode="wait">
            {steps.map((step, index) => (
              index === currentStep && (
                <motion.div
                  key={`step-${step.id}`}
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ 
                    opacity: 1,
                    x: 0,
                    scale: 1
                  }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="mb-3"
                >
                  <div className={`bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-4 border ${
                    index === currentStep ? 'border-blue-400' : 'border-gray-700'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{step.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {step.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-2">{step.description}</p>
                        
                        {/* Substeps for Server Action */}
                        {step.substeps && (
                          <div className="ml-4 space-y-1">
                            {step.substeps.map((substep, subIndex) => (
                              <motion.div
                                key={`substep-${step.id}-${subIndex}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIndex * 0.08 }}
                                className="flex items-center gap-2"
                              >
                                <span className="text-blue-400 text-xs">▸</span>
                                <span className="text-gray-300 text-sm">{substep}</span>
                              </motion.div>
                            ))}
                          </div>
                        )}
                        
                        {/* Patterns List */}
                        {step.patterns && (
                          <div className="grid grid-cols-2 gap-2">
                            {step.patterns.map((pattern, patternIndex) => (
                              <motion.div
                                key={`pattern-${step.id}-${patternIndex}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: patternIndex * 0.08 }}
                                className="bg-gray-900 bg-opacity-50 rounded-lg p-2 border border-gray-700"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{pattern.icon}</span>
                                  <span className="text-gray-200 text-xs">{pattern.text}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                backgroundColor: index <= currentStep ? '#60A5FA' : '#374151'
              }}
              transition={{ delay: index * 0.05 }}
              className="w-10 h-1 rounded-full"
            />
          ))}
        </div>
        
        {/* Controls Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-400 text-xs"
        >
          Press <span className="text-blue-400 font-mono bg-gray-800 px-1 py-0.5 rounded text-xs">J</span> to go back 
          • Press <span className="text-blue-400 font-mono bg-gray-800 px-1 py-0.5 rounded text-xs">L</span> to go forward
        </motion.div>
      </div>
    </div>
  );
}