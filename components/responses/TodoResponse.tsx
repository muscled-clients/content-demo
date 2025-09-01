'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TodoItem {
  text: string;
  indent?: number;
}

interface TodoResponseProps {
  items: string[]; // Simple numbered list as input
  onComplete?: () => void;
}

export default function TodoResponse({ items, onComplete }: TodoResponseProps) {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isThinking, setIsThinking] = useState(true);
  const [thinkingDots, setThinkingDots] = useState('');
  
  // Random thinking words like Claude uses
  const thinkingWords = [
    'Zigzagging', 'Analyzing', 'Structuring', 'Organizing', 
    'Planning', 'Mapping', 'Architecting', 'Designing'
  ];
  const [currentThinkingWord] = useState(
    thinkingWords[Math.floor(Math.random() * thinkingWords.length)]
  );

  // Convert numbered list to todo items
  useEffect(() => {
    const todoItems = items.map(item => ({
      text: item,
      indent: 0
    }));
    setTodos(todoItems);
  }, [items]);

  // Animate thinking dots
  useEffect(() => {
    if (!isThinking) return;
    
    const interval = setInterval(() => {
      setThinkingDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isThinking]);

  // Show todos progressively
  useEffect(() => {
    if (todos.length === 0) return;

    // Show thinking for 1.5 seconds
    const thinkingTimer = setTimeout(() => {
      setIsThinking(false);
      
      // Then show items one by one
      let count = 0;
      const showInterval = setInterval(() => {
        if (count < todos.length) {
          setVisibleCount(count + 1);
          count++;
        } else {
          clearInterval(showInterval);
          onComplete?.();
        }
      }, 150); // 150ms between each item

      return () => clearInterval(showInterval);
    }, 1500);

    return () => clearTimeout(thinkingTimer);
  }, [todos]);

  return (
    <div className="text-sm font-mono">
      {/* Thinking status */}
      {isThinking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-orange-400 mb-3"
        >
          <span className="text-lg">✱</span>
          <span>{currentThinkingWord}{thinkingDots}</span>
          <span className="text-xs text-gray-500 ml-2">
            (esc to interrupt · ctrl+t to hide todos)
          </span>
        </motion.div>
      )}

      {/* Todo list */}
      {!isThinking && (
        <div className="space-y-1">
          {/* Working on tasks status */}
          <div className="text-xs text-gray-500 mb-3">
            Working on {todos.length} task{todos.length !== 1 ? 's' : ''}...
          </div>

          {/* Todo items */}
          {todos.slice(0, visibleCount).map((todo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-2 text-gray-300"
              style={{ marginLeft: `${todo.indent * 20}px` }}
            >
              {/* Tree connector for first item */}
              {index === 0 && (
                <span className="text-gray-600">└</span>
              )}
              
              {/* Checkbox - always empty square */}
              <span className="text-gray-500">☐</span>
              
              {/* Task text - never crossed out */}
              <span className="text-gray-300">
                {todo.text}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}