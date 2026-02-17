'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ThinkingAnimation from '../ThinkingAnimation';

interface TextResponseProps {
  content: string;
  onComplete?: () => void;
  typewriterSpeed?: number; // ms per character
}

export default function TextResponse({ 
  content, 
  onComplete,
  typewriterSpeed = 15
}: TextResponseProps) {
  const [isThinking, setIsThinking] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle thinking animation completion
  const handleThinkingComplete = () => {
    setIsThinking(false);
  };

  // Typewriter effect after thinking
  useEffect(() => {
    if (isThinking || currentIndex >= content.length) {
      if (currentIndex >= content.length && onComplete) {
        onComplete();
      }
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText(content.substring(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
    }, typewriterSpeed);

    return () => clearTimeout(timer);
  }, [isThinking, currentIndex, content, typewriterSpeed, onComplete]);

  return (
    <div className="text-sm font-mono">
      {/* Thinking animation */}
      {isThinking && (
        <ThinkingAnimation 
          duration={1500}
          onComplete={handleThinkingComplete}
          showControls={true}
        />
      )}

      {/* Text content with typewriter effect */}
      {!isThinking && (
        <div className="flex items-start gap-3">
          <span className="text-white text-lg font-bold">•</span>
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white whitespace-pre-wrap"
            >
              {displayedText}
              {currentIndex < content.length && (
                <motion.span
                  className="inline-block w-0.5 h-4 bg-white ml-0.5"
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              )}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}