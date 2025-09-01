'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function SecondSlide() {
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'assistant', text: string}>>([]);
  const [phase, setPhase] = useState<'typing' | 'submitted'>('typing');
  const [customPrompt, setCustomPrompt] = useState("Create a modern web application with Next.js, TypeScript, and Tailwind CSS. Include user authentication and a dashboard.");
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Typing animation
  useEffect(() => {
    if (phase === 'typing' && isTypingStarted && customPrompt) {
      let index = 0;
      const promptToType = customPrompt;
      
      const typingInterval = setInterval(() => {
        if (index < promptToType.length) {
          setCurrentText(promptToType.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          // After typing completes, simulate Enter press
          setTimeout(() => {
            setPhase('submitted');
            setMessages([{ type: 'user', text: promptToType }]);
            setCurrentText('');
            setIsTypingStarted(false);
          }, 1000);
        }
      }, 40); // Typing speed

      return () => clearInterval(typingInterval);
    }
  }, [phase, isTypingStarted]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleStartTyping = () => {
    setIsTypingStarted(true);
    setPhase('typing');
    setMessages([]);
    setCurrentText('');
  };

  return (
    <div className="w-full h-full flex relative overflow-hidden bg-gray-950">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900" />
      
      {/* Left Sidebar */}
      <div className="w-80 bg-gray-900 border-r border-gray-800 p-6 z-20">
        <h3 className="text-white text-sm font-semibold mb-4">Prompt Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-xs block mb-2">Enter your prompt:</label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full h-32 bg-gray-800 text-gray-300 text-sm p-3 rounded border border-gray-700 focus:border-blue-500 focus:outline-none resize-none font-mono"
              placeholder="Enter your prompt here..."
            />
          </div>
          <button
            onClick={handleStartTyping}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
          >
            Start Typing Animation
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 z-10">
        <div className="max-w-2xl w-full h-[700px]">
          <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900 rounded-lg border border-gray-800 shadow-2xl h-full flex flex-col overflow-hidden"
        >
          {/* Terminal Tabs */}
          <div className="bg-gray-950 border-b border-gray-800 flex items-center justify-between px-4">
            <div className="flex items-center text-xs">
              <button className="px-4 py-2.5 text-gray-500 hover:text-gray-300 transition-colors">
                PROBLEMS
              </button>
              <button className="px-4 py-2.5 text-gray-500 hover:text-gray-300 transition-colors">
                OUTPUT
              </button>
              <button className="px-4 py-2.5 text-gray-500 hover:text-gray-300 transition-colors">
                DEBUG CONSOLE
              </button>
              <button className="px-4 py-2.5 text-blue-400 border-b-2 border-blue-400">
                TERMINAL
              </button>
              <button className="px-4 py-2.5 text-gray-500 hover:text-gray-300 transition-colors">
                PORTS
              </button>
            </div>
            {/* Claude Logo */}
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span className="text-xs font-medium">Claude</span>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <div className="flex items-start gap-3">
                  <span className="text-white">&gt;</span>
                  <div className="flex-1">
                    <div className="text-gray-500 font-mono text-sm">{msg.text}</div>
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area at Bottom */}
          <div className="border-t border-gray-800 p-4 bg-gray-900/50">
            <div className="flex items-center gap-3">
              <span className="text-white font-mono">&gt;</span>
              <div className="flex-1 font-mono text-sm">
                <span className="text-gray-300">{currentText}</span>
                {showCursor && phase === 'typing' && <span className="text-purple-400 animate-pulse">▌</span>}
              </div>
            </div>
            
            {/* Status Bar */}
            <div className="flex items-center justify-between mt-3 text-xs text-gray-600">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>accept</span>
                </span>
                <span>• 1 bash running</span>
              </div>
              <div className="flex items-center gap-4">
                <span>Context left until auto-compact: 11%</span>
              </div>
            </div>
          </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}