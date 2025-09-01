'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface DiffLine {
  type: 'add' | 'remove' | 'context';
  lineNumber?: number;
  content: string;
}

interface CodeDiffResponseProps {
  fileName: string;
  changes: DiffLine[];
  language?: string;
  onComplete?: () => void;
}

export default function CodeDiffResponse({ 
  fileName, 
  changes, 
  language = 'typescript',
  onComplete 
}: CodeDiffResponseProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showFileName, setShowFileName] = useState(false);

  // Animate file name first, then lines
  useEffect(() => {
    // Show file name
    const fileTimer = setTimeout(() => {
      setShowFileName(true);
    }, 300);

    // Then show lines progressively
    const lineTimer = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        if (count < changes.length) {
          setVisibleLines(count + 1);
          count++;
        } else {
          clearInterval(interval);
          onComplete?.();
        }
      }, 50); // Fast line-by-line reveal

      return () => clearInterval(interval);
    }, 800);

    return () => {
      clearTimeout(fileTimer);
      clearTimeout(lineTimer);
    };
  }, [changes.length, onComplete]);

  const getLineStyle = (type: DiffLine['type']) => {
    switch (type) {
      case 'add':
        return 'bg-green-900/30 text-green-400 border-l-2 border-green-500';
      case 'remove':
        return 'bg-red-900/30 text-red-400 border-l-2 border-red-500';
      case 'context':
        return 'text-gray-400';
    }
  };

  const getLinePrefix = (type: DiffLine['type']) => {
    switch (type) {
      case 'add':
        return '+';
      case 'remove':
        return '-';
      case 'context':
        return ' ';
    }
  };

  return (
    <div className="font-mono text-sm">
      {/* File name header */}
      {showFileName && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-400 mb-3 pb-2 border-b border-gray-800"
        >
          <span className="text-gray-500">File: </span>
          <span className="text-blue-400">{fileName}</span>
        </motion.div>
      )}

      {/* Diff lines */}
      <div className="space-y-0">
        {changes.slice(0, visibleLines).map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: line.type === 'add' ? 5 : line.type === 'remove' ? -5 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className={`flex ${getLineStyle(line.type)} px-2 py-0.5`}
          >
            {/* Line number */}
            {line.lineNumber && (
              <span className="text-gray-600 w-10 text-right pr-3">
                {line.lineNumber}
              </span>
            )}
            
            {/* Diff prefix */}
            <span className="w-4">
              {getLinePrefix(line.type)}
            </span>
            
            {/* Code content */}
            <span className="flex-1 whitespace-pre">
              {line.content}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Summary after completion */}
      {visibleLines === changes.length && changes.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 text-xs text-gray-500"
        >
          {(() => {
            const adds = changes.filter(c => c.type === 'add').length;
            const removes = changes.filter(c => c.type === 'remove').length;
            return `${adds} addition${adds !== 1 ? 's' : ''}, ${removes} deletion${removes !== 1 ? 's' : ''}`;
          })()}
        </motion.div>
      )}
    </div>
  );
}