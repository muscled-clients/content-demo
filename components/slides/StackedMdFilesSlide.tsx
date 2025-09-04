'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { highlightMarkdown } from './RawMarkdown';

export default function StackedMdFilesSlide() {
  const [selectedIndex, setSelectedIndex] = useState(-1); // -1 means showing stack view
  const [showActiveHighlight, setShowActiveHighlight] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isFirstTransition, setIsFirstTransition] = useState(true);
  
  // Sample markdown content for each file
  const files = [
    { 
      name: 'Refactoring-Principles.md', 
      color: 'from-orange-500 to-red-500', 
      lines: 245,
      content: `# Refactoring Principles and Core Concepts
**Date**: 2025-08-31
**Time**: 06:35 AM EST
**Purpose**: Define principles and concepts for systematic refactoring

## Core Principles

### 1. Single Source of Truth (SSOT) Principle
**Every piece of state must have exactly one authoritative source.**

When multiple sources exist for the same state, synchronization becomes impossible and bugs become inevitable.

### 2. Explicit Dependencies Principle
**All dependencies must be visible and traceable at the point of use.**

Hidden global access creates invisible connections that break unexpectedly.

### 3. Layered Architecture Principle
**State and logic must be organized in clear layers with unidirectional dependencies.**

- **Universal Layer**: State that applies to all contexts
- **Feature Layer**: State specific to a feature or capability
- **Role Layer**: State specific to a user role or view`
    },
    { 
      name: 'Component-Architecture.md', 
      color: 'from-blue-500 to-purple-500', 
      lines: 189,
      content: `# Component Architecture Guide
**Last Updated**: 2025-08-31
**Version**: 2.0
**Status**: Active Development

## Overview
This document outlines the component architecture patterns and best practices for building scalable React applications.

## Component Categories

### 1. Container Components
**Smart components that manage state and business logic**

These components are connected to the store and handle data fetching, state management, and business logic.

### 2. Presentational Components
**Pure components focused on rendering UI**

Receive data via props and communicate via callbacks. No direct store access.

### 3. Layout Components
**Structural components that define page layouts**

- **AppLayout**: Main application wrapper
- **PageLayout**: Individual page structure
- **SectionLayout**: Content section organization`
    },
    { 
      name: 'Performance-Guide.md', 
      color: 'from-green-500 to-teal-500', 
      lines: 312,
      content: `# Performance Optimization Guide
**Created**: 2025-08-30
**Author**: Development Team
**Focus**: Frontend Performance

## Critical Metrics

### Core Web Vitals
**Measure user experience quality**

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## Optimization Strategies

### 1. Code Splitting
**Load only what's needed**

Implement dynamic imports for route-based splitting and component lazy loading.

### 2. Bundle Optimization
**Reduce JavaScript payload**

- Tree shaking unused code
- Minification and compression
- Vendor chunk optimization

### 3. Caching Strategy
**Minimize network requests**

Implement service workers, browser caching headers, and CDN distribution.`
    },
    { 
      name: 'Testing-Strategy.md', 
      color: 'from-pink-500 to-rose-500', 
      lines: 156,
      content: `# Testing Strategy Document
**Version**: 1.5
**Updated**: 2025-08-31
**Coverage Target**: 80%

## Testing Pyramid

### Unit Tests (70%)
**Test individual components and functions**

Fast, isolated tests that verify individual units work correctly in isolation.

### Integration Tests (20%)
**Test component interactions**

Verify that multiple components work together correctly when integrated.

### E2E Tests (10%)
**Test complete user flows**

Simulate real user interactions through critical application paths.

## Testing Best Practices

### 1. Arrange-Act-Assert Pattern
**Structure tests consistently**

- **Arrange**: Set up test data and conditions
- **Act**: Execute the action being tested
- **Assert**: Verify the expected outcome`
    },
    { 
      name: 'API-Documentation.md', 
      color: 'from-yellow-500 to-amber-500', 
      lines: 278,
      content: `# API Documentation
**Base URL**: https://api.example.com/v1
**Authentication**: Bearer Token
**Rate Limit**: 1000 req/hour

## Endpoints

### Authentication

#### POST /auth/login
**Authenticate user and receive token**

Request:
\`\`\`json
{
  "email": "user@example.com",
  "password": "secure_password"
}
\`\`\`

Response:
\`\`\`json
{
  "token": "jwt_token_here",
  "user": { "id": 1, "email": "user@example.com" }
}
\`\`\`

### Users

#### GET /users/:id
**Retrieve user information**

Headers:
- Authorization: Bearer {token}

Response includes user profile, preferences, and metadata.`
    }
  ];

  // Handle J/L key navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'l' || e.key === 'L') {
        // Move forward through files
        setSelectedIndex(prev => {
          if (prev < files.length - 1) {
            // Only increment animation key when transitioning from stack to split view
            if (prev === -1) {
              setAnimationKey(k => k + 1);
              setIsFirstTransition(true);
            } else {
              setIsFirstTransition(false);
            }
            return prev + 1;
          }
          return prev;
        });
        setShowActiveHighlight(false); // Reset highlight
      } else if (e.key === 'j' || e.key === 'J') {
        // Move backward through files
        setSelectedIndex(prev => {
          if (prev >= 0) return prev - 1;
          return prev;
        });
        setShowActiveHighlight(false); // Reset highlight
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [files.length]);

  // Enable highlight after cards animate in
  useEffect(() => {
    if (selectedIndex >= 0) {
      const delay = isFirstTransition ? 1000 : 0; // 1s delay only for first transition from stack
      const timer = setTimeout(() => {
        setShowActiveHighlight(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShowActiveHighlight(false);
    }
  }, [selectedIndex, isFirstTransition]);

  const isShowingStack = selectedIndex === -1;
  const selectedFile = selectedIndex >= 0 ? files[selectedIndex] : null;

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      {/* Stack View - Only show when in stack mode */}
      <AnimatePresence mode="wait">
        {isShowingStack && (
          <motion.div 
            key="stack"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-[500px] h-[400px] z-10"
          >
            {files.map((file, index) => {
              const offset = index * 15;
              const horizontalOffset = index * 8;
              const rotation = (index - 2) * 2;
              
              return (
                <motion.div
                  key={`stack-${file.name}`}
                  initial={{ 
                    y: 100, 
                    opacity: 0,
                    scale: 0.8
                  }}
                  animate={{ 
                    y: offset,
                    x: horizontalOffset,
                    opacity: 1,
                    scale: 1,
                    rotate: rotation,
                    zIndex: files.length - index
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    delay: index * 0.1
                  }}
                  className="absolute top-0 left-0 w-full"
                  style={{
                    transformOrigin: 'center bottom'
                  }}
                >
                  {/* Card */}
                  <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-2xl">
                    {/* Window Controls */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-gray-400 text-xs ml-3 font-mono">{file.name}</span>
                    </div>
                    
                    {/* Markdown Preview - Skeleton Lines */}
                    <div className="font-mono text-xs space-y-1.5">
                      <div className="text-blue-400 h-3">## {file.name.replace('.md', '').replace(/-/g, ' ')}</div>
                      <div className="h-2 bg-gray-800/50 rounded w-full" />
                      <div className="h-2 bg-gray-800/50 rounded w-4/5" />
                      <div className="text-blue-400/50 h-2">### Overview</div>
                      <div className="h-2 bg-gray-800/50 rounded w-3/4" />
                      <div className="h-2 bg-gray-800/50 rounded w-5/6" />
                      <div className="h-2 bg-gray-800/50 rounded w-2/3" />
                    </div>
                    
                    {/* File Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-2 border-t border-gray-800">
                      <span>{file.lines} lines</span>
                      <span>Markdown</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Split View - Sidebar + Content */}
      <AnimatePresence>
        {!isShowingStack && (
          <motion.div
            key={`split-view-${animationKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex"
          >
            {/* Left Sidebar with Cards */}
            <div className="w-80 p-6 pl-12 flex flex-col gap-3 justify-center overflow-y-auto">
              {files.map((file, index) => {
                const isActive = index === selectedIndex && showActiveHighlight;
                
                return (
                  <motion.div
                    key={`sidebar-${file.name}`}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1
                    }}
                    className={`
                      bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 border cursor-pointer
                      ${isActive 
                        ? 'border-blue-500 shadow-lg shadow-blue-500/20 transition-all duration-200' 
                        : 'border-gray-700 hover:border-gray-600 transition-all duration-200'
                      }
                    `}
                    onClick={() => setSelectedIndex(index)}
                  >
                    {/* Window Controls */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className={`text-xs ml-2 font-mono ${isActive ? 'text-blue-400' : 'text-gray-400'}`}>
                        {file.name}
                      </span>
                    </div>
                    
                    {/* Mini Preview */}
                    <div className="font-mono text-[10px] space-y-1">
                      <div className={`h-1 rounded ${isActive ? 'bg-blue-400/30' : 'bg-gray-800/50'} w-full`} />
                      <div className={`h-1 rounded ${isActive ? 'bg-blue-400/20' : 'bg-gray-800/50'} w-4/5`} />
                      <div className={`h-1 rounded ${isActive ? 'bg-blue-400/20' : 'bg-gray-800/50'} w-3/5`} />
                    </div>
                    
                    {/* File Info */}
                    <div className="flex items-center justify-between text-[10px] text-gray-500 mt-2 pt-1 border-t border-gray-800">
                      <span>{file.lines} lines</span>
                      {isActive && <span className="text-blue-400">Active</span>}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Content - Full MD File View */}
            {selectedFile && (
              <motion.div
                key={selectedFile.name}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ 
                  duration: 0.4, 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  delay: isFirstTransition ? 1 : 0 // 1s delay only for first transition from stack
                }}
                className="flex-1 flex items-center justify-center px-8"
              >
                <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl w-full max-w-4xl h-[600px]">
                  {/* Window Controls */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-gray-400 text-xs ml-3 font-mono">{selectedFile.name}</span>
                  </div>
                  
                  {/* MD Content with Syntax Highlighting */}
                  <div className="font-mono text-sm space-y-1 h-[520px] overflow-y-auto pr-4 custom-scrollbar">
                    {highlightMarkdown(selectedFile.content)}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-20"
      >
        <p className="text-gray-400 text-sm">
          {isShowingStack ? (
            <>Press <kbd className="px-2 py-1 bg-gray-800 rounded text-white">L</kbd> to view files</>
          ) : (
            <>
              <kbd className="px-2 py-1 bg-gray-800 rounded text-white">J</kbd> Previous • 
              <kbd className="px-2 py-1 bg-gray-800 rounded text-white mx-2">L</kbd> Next • 
              File {selectedIndex + 1} of {files.length}
            </>
          )}
        </p>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.9);
        }
      `}</style>
    </div>
  );
}