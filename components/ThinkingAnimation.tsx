'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ThinkingAnimationProps {
  duration?: number; // How long to show thinking animation (ms)
  onComplete?: () => void;
  showControls?: boolean; // Show keyboard shortcuts hint
}

export default function ThinkingAnimation({ 
  duration = 1500,
  onComplete,
  showControls = true
}: ThinkingAnimationProps) {
  const [dots, setDots] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  
  // Random thinking words like Claude uses
  const thinkingWords = [
    'Zigzagging', 'Analyzing', 'Structuring', 'Organizing', 
    'Planning', 'Mapping', 'Architecting', 'Designing',
    'Levitating', 'Contemplating', 'Processing', 'Synthesizing',
    'Formulating', 'Crafting', 'Composing', 'Constructing'
  ];
  
  const [thinkingWord] = useState(
    thinkingWords[Math.floor(Math.random() * thinkingWords.length)]
  );

  // Animate dots
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Hide after duration and call onComplete
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-2 text-orange-400 mb-3"
    >
      <span className="text-lg">✱</span>
      <span>{thinkingWord}{dots}</span>
      {showControls && (
        <span className="text-xs text-gray-500 ml-2">
          (esc to interrupt)
        </span>
      )}
    </motion.div>
  );
}