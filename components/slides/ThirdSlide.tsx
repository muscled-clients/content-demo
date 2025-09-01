'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import TodoResponse from '../responses/TodoResponse';
import CodeDiffResponse from '../responses/CodeDiffResponse';

type ResponseType = 'text' | 'todo' | 'diff';

interface ResponseConfig {
  type: ResponseType;
  content: any;
}

export default function ThirdSlide() {
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingWord, setThinkingWord] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [responseType, setResponseType] = useState<ResponseType>('text');
  const [customContent, setCustomContent] = useState('');
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const thinkingWords = [
    'Analyzing', 'Synthesizing', 'Contemplating', 'Processing', 
    'Evaluating', 'Formulating', 'Architecting', 'Conceptualizing',
    'Orchestrating', 'Structuring'
  ];
  
  // Default contents for different response types
  const defaultContents = {
    text: `I'll help you create a modern web application with those technologies. Let me set up the project structure and implement the key features.

First, let's initialize a new Next.js project with TypeScript and Tailwind CSS:

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app
npm install
\`\`\`

Now I'll set up the authentication system and create the dashboard components...`,
    todo: `1. Analyze project structure and architecture patterns
2. Map component hierarchy and reusable UI components  
3. Review routing structure and page organization
4. Identify data flow patterns and state management
5. Document API endpoints and service layer patterns`,
    diff: `File: components/Button.tsx
- const Button = ({ label }) => {
+ const Button = ({ label, onClick, variant = 'primary' }) => {
    return (
-     <button className="btn">
+     <button 
+       className={\`btn btn-\${variant}\`}
+       onClick={onClick}
+     >
        {label}
      </button>
    );`
  };

  const prompt = "Create a modern web application with Next.js, TypeScript, and Tailwind CSS. Include user authentication and a dashboard.";

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [showResponse]);

  // Parse diff content into structured format
  const parseDiffContent = (content: string) => {
    const lines = content.split('\n');
    const fileName = lines[0].replace('File: ', '');
    const changes = lines.slice(1).map(line => {
      if (line.startsWith('+')) {
        return { type: 'add' as const, content: line.substring(1) };
      } else if (line.startsWith('-')) {
        return { type: 'remove' as const, content: line.substring(1) };
      } else {
        return { type: 'context' as const, content: line };
      }
    });
    return { fileName, changes };
  };

  // Parse todo content into array
  const parseTodoContent = (content: string) => {
    return content.split('\n').filter(line => line.trim());
  };

  // Start animation sequence
  const startAnimation = () => {
    setIsAnimationStarted(true);
    setShowResponse(false);
    setIsTyping(true);
    
    // Randomly select a thinking word
    const randomWord = thinkingWords[Math.floor(Math.random() * thinkingWords.length)];
    setThinkingWord(randomWord);
    
    // Show response after thinking
    setTimeout(() => {
      setIsTyping(false);
      setThinkingWord('');
      setShowResponse(true);
    }, 2000);
  };

  // Render appropriate response component
  const renderResponse = () => {
    const content = customContent || defaultContents[responseType];
    
    switch (responseType) {
      case 'todo':
        return <TodoResponse items={parseTodoContent(content)} />;
      
      case 'diff':
        const { fileName, changes } = parseDiffContent(content);
        return <CodeDiffResponse fileName={fileName} changes={changes} />;
      
      case 'text':
      default:
        return (
          <div className="flex items-start gap-3">
            <span className="text-white text-lg font-bold">•</span>
            <div className="flex-1">
              <div className="text-white text-sm whitespace-pre-wrap font-mono">{content}</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full flex relative overflow-hidden bg-gray-950">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900" />
      
      {/* Left Sidebar */}
      <div className="w-80 bg-gray-900 border-r border-gray-800 p-6 z-20">
        <h3 className="text-white text-sm font-semibold mb-4">Response Configuration</h3>
        
        <div className="space-y-4">
          {/* Response Type Selector */}
          <div>
            <label className="text-gray-400 text-xs block mb-2">Response Type:</label>
            <select
              value={responseType}
              onChange={(e) => setResponseType(e.target.value as ResponseType)}
              className="w-full bg-gray-800 text-gray-300 text-sm p-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
            >
              <option value="text">Text Response</option>
              <option value="todo">Todo List</option>
              <option value="diff">Code Diff</option>
            </select>
          </div>

          {/* Content Input */}
          <div>
            <label className="text-gray-400 text-xs block mb-2">
              Content ({responseType === 'todo' ? 'numbered list' : responseType === 'diff' ? 'diff format' : 'text'}):
            </label>
            <textarea
              value={customContent}
              onChange={(e) => setCustomContent(e.target.value)}
              placeholder={defaultContents[responseType]}
              className="w-full h-48 bg-gray-800 text-gray-300 text-sm p-3 rounded border border-gray-700 focus:border-blue-500 focus:outline-none resize-none font-mono"
            />
          </div>

          {/* Start Button */}
          <button
            onClick={startAnimation}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
          >
            Start Animation
          </button>

          {/* Instructions */}
          <div className="text-xs text-gray-500 mt-4">
            <p className="mb-2"><strong>Text:</strong> Plain text response</p>
            <p className="mb-2"><strong>Todo:</strong> Numbered list (1. Task)</p>
            <p><strong>Diff:</strong> Start with "File: name.ext" then use +/- prefixes</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 z-10">
        <div className="max-w-3xl w-full h-[700px]">
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
              {/* User's prompt (already submitted) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <div className="flex items-start gap-3">
                  <span className="text-white">&gt;</span>
                  <div className="flex-1">
                    <div className="text-gray-500 font-mono text-sm">{prompt}</div>
                  </div>
                </div>
              </motion.div>

              {/* Claude Typing Indicator */}
              {isTyping && isAnimationStarted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  {/* Thinking status */}
                  {thinkingWord && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 ml-9">
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {thinkingWord}...
                      </motion.span>
                      <span className="text-xs">ESC to interrupt</span>
                    </div>
                  )}
                  
                  {/* Claude typing dots */}
                  <div className="flex items-start gap-3">
                    <span className="text-white text-lg font-bold">•</span>
                    <div className="flex items-center gap-1">
                      <motion.span
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />
                      <motion.span
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Claude's Response */}
              {showResponse && isAnimationStarted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  {renderResponse()}
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area at Bottom */}
            <div className="border-t border-gray-800 p-4 bg-gray-900/50">
              <div className="flex items-center gap-3">
                <span className="text-white font-mono">&gt;</span>
                <div className="flex-1 font-mono text-sm">
                  <span className="text-gray-300"></span>
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