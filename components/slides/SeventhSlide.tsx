'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function SeventhSlide() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Delay content appearance for dramatic effect
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    { 
      icon: '🎤', 
      title: 'Voice-to-Text',
      description: 'Accurate speech recognition for coding'
    },
    { 
      icon: '⚡', 
      title: 'Lightning Fast',
      description: 'Real-time transcription with minimal delay'
    },
    { 
      icon: '🎯', 
      title: 'Context Aware',
      description: 'Understands technical terminology'
    },
    { 
      icon: '🔄', 
      title: 'Seamless Workflow',
      description: 'Integrates with your development tools'
    },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-gray-950">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
      
      <div className="max-w-5xl w-full px-8 z-10">
        {/* Main SuperWhisper Box - Larger and Centered */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-xl p-16 mb-12 shadow-2xl"
        >
          <motion.h1 
            className="text-6xl font-bold text-gray-900 text-center mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            SUPERWHISPER
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Hands-Free Development Power
          </motion.p>
        </motion.div>

        {/* Why We Need It Section */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-light text-white text-center mb-8">
              Why SuperWhisper is Essential
            </h2>
            
            <div className="grid grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Key Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-center mt-12"
            >
              <p className="text-gray-300 text-lg italic">
                "SuperWhisper enables hands-free coding, freeing your mind to focus on logic"
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}