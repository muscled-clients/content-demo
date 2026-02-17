'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  title: string;
  url: string;
  description: string;
}

export function GoogleSearchSlide() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const fullQuery = 'how to build amazing animations';
  
  const suggestions = [
    'how to build amazing animations with React',
    'how to build amazing animations CSS',
    'how to build amazing animations Framer Motion',
    'how to build amazing animations JavaScript'
  ];
  
  const searchResults: SearchResult[] = [
    {
      title: 'Complete Guide to Web Animations | MDN',
      url: 'developer.mozilla.org › docs › Web › API',
      description: 'Learn how to create smooth, performant animations using modern web technologies. From CSS transitions to JavaScript animations...'
    },
    {
      title: 'Framer Motion - Production-Ready Animation Library',
      url: 'www.framer.com › motion',
      description: 'A production-ready motion library for React. Create amazing animations and interactions with a simple, declarative API...'
    },
    {
      title: '10 Principles of Motion Design | Animation Best Practices',
      url: 'www.awwwards.com › motion-design-principles',
      description: 'Master the fundamental principles of motion design. Learn timing, easing, and how to create animations that enhance user experience...'
    },
    {
      title: 'React Spring - Bring Your Components to Life',
      url: 'react-spring.dev',
      description: 'A spring-physics based animation library that powers most UI animations. Create fluid, natural animations with ease...'
    }
  ];

  useEffect(() => {
    // Wait a bit before starting to type
    setTimeout(() => {
      setIsSearching(true);
      
      // Simulate typing animation
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < fullQuery.length) {
          setSearchQuery(fullQuery.slice(0, currentIndex + 1));
          currentIndex++;
          
          // Show suggestions after typing a few characters
          if (currentIndex === 15) {
            setShowSuggestions(true);
          }
        } else {
          clearInterval(typingInterval);
          // Simulate search after typing completes
          setTimeout(() => {
            setShowSuggestions(false);
            setShowResults(true);
          }, 800);
        }
      }, 80);
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Google Header with Search Bar - only show when results are visible */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-gray-800"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-8 flex-1">
                <div className="text-2xl font-normal">
                  <span className="text-blue-400">G</span>
                  <span className="text-red-400">o</span>
                  <span className="text-yellow-400">o</span>
                  <span className="text-blue-400">g</span>
                  <span className="text-green-400">l</span>
                  <span className="text-red-400">e</span>
                </div>
                
                {/* Search Bar in Header */}
                <div className="flex-1 max-w-2xl">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      readOnly
                      className="block w-full pl-12 pr-12 py-2 bg-gray-800 border border-gray-700 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-100"
                      placeholder="Search Google or type a URL"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-2">
                      <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM12 3C6.48 3 2 7.48 2 13s4.48 10 10 10 10-4.48 10-10S17.52 3 12 3zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 ml-8">
                <button className="text-sm text-gray-300 hover:underline">Gmail</button>
                <button className="text-sm text-gray-300 hover:underline">Images</button>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
                  A
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${showResults ? '' : 'justify-center'} px-6`}>
        {/* Google Logo - show when no results */}
        <AnimatePresence>
          {!showResults && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-8"
            >
              <div className="text-7xl font-normal mb-6">
                <span className="text-blue-400">G</span>
                <span className="text-red-400">o</span>
                <span className="text-yellow-400">o</span>
                <span className="text-blue-400">g</span>
                <span className="text-green-400">l</span>
                <span className="text-red-400">e</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar Container - only show when no results */}
        {!showResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-2xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                readOnly
                className="block w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-100"
                placeholder="Search Google or type a URL"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM12 3C6.48 3 2 7.48 2 13s4.48 10 10 10 10-4.48 10-10S17.52 3 12 3zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
              </div>
            </div>

            {/* Search Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && !showResults && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden z-10"
                >
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-2 hover:bg-gray-700 flex items-center gap-3 cursor-pointer"
                    >
                      <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="text-sm text-gray-200">{suggestion}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Search Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto w-full mt-8"
            >
              <div className="text-sm text-gray-400 mb-4">
                About 2,450,000 results (0.42 seconds)
              </div>

              <div className="space-y-6">
                {searchResults.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.15 }}
                    className="group cursor-pointer"
                  >
                    <div className="text-sm text-gray-500 mb-1">{result.url}</div>
                    <h3 className="text-xl text-blue-400 group-hover:underline mb-1">
                      {result.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {result.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex items-center gap-3 mt-12 mb-8"
              >
                <div className="text-blue-400 text-3xl">G</div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <div
                    key={num}
                    className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
                      num === 1 
                        ? 'bg-blue-600 text-white' 
                        : 'text-blue-400 hover:underline'
                    }`}
                  >
                    <span className="text-sm">{num}</span>
                  </div>
                ))}
                <div className="text-blue-400 text-sm cursor-pointer hover:underline">Next</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}