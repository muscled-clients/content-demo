'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface NinthSlideProps {
  navigateToSlide?: (slideIndex: number) => void;
}

export default function NinthSlide({ navigateToSlide }: NinthSlideProps) {
  const [phase, setPhase] = useState<'initial' | 'typing' | 'executing' | 'completed'>('initial');
  const [currentCommand, setCurrentCommand] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showFormattedCode, setShowFormattedCode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const command = 'Please format and beautify this messy code with proper syntax highlighting';
  
  const messyCode = `import React,{useState,useEffect,useCallback}from"react";import{motion,AnimatePresence}from"framer-motion";const UserManager=()=>{const[users,setUsers]=useState([]);const[loading,setLoading]=useState(false);const[error,setError]=useState(null);const fetchUsers=useCallback(async()=>{setLoading(true);try{const response=await fetch("/api/users");if(!response.ok)throw new Error("Failed to fetch");const data=await response.json();setUsers(data.users||[]);}catch(err){setError(err.message);}finally{setLoading(false);}},[]);useEffect(()=>{fetchUsers();},[fetchUsers]);const handleDelete=async(id)=>{try{await fetch(\`/api/users/\${id}\`,{method:"DELETE"});setUsers(prev=>prev.filter(u=>u.id!==id));}catch(err){setError("Delete failed");}};return(<div>{loading&&<div>Loading...</div>}{error&&<div>{error}</div>}<ul>{users.map(user=>(<li key={user.id}>{user.name}<button onClick={()=>handleDelete(user.id)}>Delete</button></li>))}</ul></div>);};export default UserManager;`;

  // Clean formatted version of the EXACT same code
  const cleanCodeLines = [
    'import React, { useState, useEffect, useCallback } from "react";',
    'import { motion, AnimatePresence } from "framer-motion";',
    '',
    'const UserManager = () => {',
    '  const [users, setUsers] = useState([]);',
    '  const [loading, setLoading] = useState(false);',
    '  const [error, setError] = useState(null);',
    '',
    '  const fetchUsers = useCallback(async () => {',
    '    setLoading(true);',
    '    try {',
    '      const response = await fetch("/api/users");',
    '      if (!response.ok) throw new Error("Failed to fetch");',
    '      const data = await response.json();',
    '      setUsers(data.users || []);',
    '    } catch (err) {',
    '      setError(err.message);',
    '    } finally {',
    '      setLoading(false);',
    '    }',
    '  }, []);',
    '',
    '  useEffect(() => {',
    '    fetchUsers();',
    '  }, [fetchUsers]);',
    '',
    '  const handleDelete = async (id) => {',
    '    try {',
    '      await fetch(`/api/users/${id}`, {',
    '        method: "DELETE"',
    '      });',
    '      setUsers(prev => prev.filter(u => u.id !== id));',
    '    } catch (err) {',
    '      setError("Delete failed");',
    '    }',
    '  };',
    '',
    '  return (',
    '    <div>',
    '      {loading && <div>Loading...</div>}',
    '      {error && <div>{error}</div>}',
    '      <ul>',
    '        {users.map(user => (',
    '          <li key={user.id}>',
    '            {user.name}',
    '            <button onClick={() => handleDelete(user.id)}>',
    '              Delete',
    '            </button>',
    '          </li>',
    '        ))}',
    '      </ul>',
    '    </div>',
    '  );',
    '};',
    '',
    'export default UserManager;'
  ];

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [showFormattedCode]);

  // Reset animation when slide is revisited
  useEffect(() => {
    setPhase('initial');
    setCurrentCommand('');
    setShowFormattedCode(false);
    
    // Start animation after a short delay
    const timer = setTimeout(() => {
      setPhase('typing');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Typing animation for command
  useEffect(() => {
    if (phase === 'typing') {
      let index = 0;
      
      const typingInterval = setInterval(() => {
        if (index < command.length) {
          setCurrentCommand(command.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          // After typing completes, simulate Enter press
          setTimeout(() => {
            setPhase('executing');
            setTimeout(() => {
              setShowFormattedCode(true);
              setPhase('completed');
            }, 800);
          }, 600);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }
  }, [phase]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Professional VS Code Dark+ theme syntax highlighting - using React elements
  const renderHighlightedLine = (line: string, index: number) => {
    if (!line.trim()) {
      return (
        <div key={index} className="h-5">&nbsp;</div>
      );
    }
    
    // Process the line character by character and identify tokens
    const processLine = () => {
      const parts: JSX.Element[] = [];
      let currentPos = 0;
      
      // Define patterns and their styles - order matters!
      const patterns: Array<{
        regex: RegExp;
        color: string | null;
        bold?: boolean;
        italic?: boolean;
        preserveSpace?: boolean;
      }> = [
        // Comments first (highest priority)
        { regex: /^\/\/.*$/, color: '#6A9955', italic: true },
        
        // Strings (before keywords to handle quoted text)
        { regex: /^"[^"]*"/, color: '#CE9178' },
        { regex: /^'[^']*'/, color: '#CE9178' },
        { regex: /^`[^`]*`/, color: '#CE9178' },
        
        // Keywords and reserved words
        { regex: /^(import|from|export|default)\b/, color: '#C586C0', bold: true },
        { regex: /^(async|function|const|let|var|if|else|try|catch|finally|throw|new|return|await)\b/, color: '#569CD6', bold: true },
        { regex: /^(true|false|null|undefined)\b/, color: '#569CD6', bold: true },
        
        // React specific
        { regex: /^(React|useState|useEffect|useCallback|AnimatePresence|motion)\b/, color: '#4FC1FF', bold: true },
        
        // Numbers
        { regex: /^\d+/, color: '#B5CEA8', bold: true },
        
        // Identifiers (must come after keywords)
        { regex: /^[A-Z][a-zA-Z0-9]*/, color: '#4EC9B0', bold: true },  // Components/Classes
        { regex: /^[a-z_][a-zA-Z0-9_]*/, color: '#9CDCFE' },  // Variables/functions
        
        // JSX brackets (specific patterns)
        { regex: /^<\//, color: '#808080' },  // Closing tag bracket
        { regex: /^</, color: '#808080' },    // Opening tag bracket  
        { regex: /^\/>/, color: '#808080' },  // Self-closing
        { regex: /^>/, color: '#808080' },    // Close bracket
        
        // Operators and punctuation
        { regex: /^[{}()[\]]/, color: '#FFD700', bold: true },
        { regex: /^[;,.]/, color: '#D4D4D4' },
        { regex: /^[=!&|+\-*/%:]/, color: '#D4D4D4' },
        
        // Whitespace (preserve spaces for indentation)
        { regex: /^\s+/, color: null, preserveSpace: true },
      ];
      
      while (currentPos < line.length) {
        let matched = false;
        const remaining = line.substring(currentPos);
        
        for (const pattern of patterns) {
          const match = remaining.match(pattern.regex);
          if (match) {
            const text = match[0];
            if (pattern.preserveSpace) {
              // For whitespace, preserve it as-is
              parts.push(
                <span key={currentPos}>
                  {text}
                </span>
              );
            } else {
              const style: React.CSSProperties = {
                color: pattern.color,
                fontWeight: pattern.bold ? 500 : 'normal',
                fontStyle: pattern.italic ? 'italic' : 'normal'
              };
              parts.push(
                <span key={currentPos} style={style}>
                  {text}
                </span>
              );
            }
            currentPos += text.length;
            matched = true;
            break;
          }
        }
        
        // If no pattern matched, consume one character with default color
        if (!matched) {
          parts.push(
            <span key={currentPos} style={{ color: '#D4D4D8' }}>
              {line[currentPos]}
            </span>
          );
          currentPos++;
        }
      }
      
      return parts;
    };
    
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          delay: index * 0.02,
          duration: 0.2
        }}
        className="font-mono text-sm leading-6"
      >
        {processLine()}
      </motion.div>
    );
  };

  return (
    <div className="w-full h-full flex relative overflow-hidden bg-gray-950">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900" />
      
      <div className="flex-1 flex flex-col items-center px-8 z-10 pt-6">
        {/* Title at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-4"
        >
          <h1 className="text-3xl font-light text-white mb-1">From Messy to Beautiful</h1>
          <p className="text-gray-400 text-base">Claude's Intelligent Code Formatting</p>
        </motion.div>
        
        <div className="max-w-5xl w-full h-[600px] flex items-center justify-center">
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

            {/* Terminal Content Area */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
              {/* Show messy code first */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <div className="text-gray-500 mb-2">// code.js - Unformatted React component</div>
                <div className="text-gray-400 break-all bg-gray-800/50 p-3 rounded border border-gray-700">
                  {messyCode}
                </div>
              </motion.div>

              {/* Command typing animation */}
              {phase !== 'initial' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <div className="bg-gray-800/50 border border-blue-500/50 rounded-lg p-3">
                    <div className="flex items-center">
                      <span className="text-blue-400 mr-2">Claude &gt;</span>
                      <span className="text-gray-300">{currentCommand}</span>
                      {showCursor && phase === 'typing' && (
                        <span className="text-blue-400 animate-pulse ml-1">▌</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Executing message */}
              {phase === 'executing' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4 text-blue-400"
                >
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Analyzing code structure and applying formatting rules...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Show formatted code */}
              {showFormattedCode && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 mb-4">
                    <div className="text-green-400 flex items-center gap-2">
                      <span className="text-lg">✓</span>
                      <span>Code formatted and beautified successfully!</span>
                    </div>
                  </div>
                  <div className="text-gray-500 mb-2">// code.js - Formatted with proper structure and syntax highlighting</div>
                  <div className="bg-gray-800/50 p-4 rounded border border-gray-700 overflow-x-auto">
                    {cleanCodeLines.map((line, index) => renderHighlightedLine(line, index))}
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Status Bar */}
            <div className="border-t border-gray-800 px-4 py-2 bg-gray-900/50">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>claude-format</span>
                  </span>
                  <span>• bash</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>UTF-8</span>
                  <span>LF</span>
                  <span>JavaScript</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}