'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Prompt {
  id: string;
  title: string;
  prompt: string;
  category: string;
  projectType: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export function ClaudeCodePromptLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProjectType, setSelectedProjectType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);

  // Override the global overflow:hidden for this component
  React.useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, []);

  const categories = [
    { id: 'ui-ux', name: 'UI/UX Design', icon: '🎨', color: 'blue' },
    { id: 'architecture', name: 'Architecture', icon: '🏗️', color: 'purple' },
    { id: 'implementation', name: 'Implementation', icon: '⚡', color: 'green' },
    { id: 'documentation', name: 'Documentation', icon: '📚', color: 'orange' },
    { id: 'testing', name: 'Testing', icon: '🧪', color: 'red' },
    { id: 'performance', name: 'Performance', icon: '🚀', color: 'pink' },
    { id: 'debugging', name: 'Debugging', icon: '🐛', color: 'yellow' }
  ];

  const projectTypes = [
    { id: 'course-platform', name: 'Course Platform', icon: '🎓' },
    { id: 'video-editor', name: 'Video Editor', icon: '🎬' },
    { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
    { id: 'dashboard', name: 'Admin Dashboard', icon: '📊' },
    { id: 'social-media', name: 'Social Media', icon: '📱' },
    { id: 'blog', name: 'Blog/CMS', icon: '📝' },
    { id: 'saas', name: 'SaaS App', icon: '☁️' }
  ];

  const prompts: Prompt[] = [
    // UI/UX - Course Platform
    {
      id: '1',
      title: 'Course Progress Bar Component',
      prompt: 'Create a responsive course progress bar component that shows completion percentage, current lesson, and estimated time remaining. Include hover effects and mobile-friendly design.',
      category: 'ui-ux',
      projectType: 'course-platform',
      tags: ['react', 'progress', 'responsive'],
      difficulty: 'Beginner'
    },
    {
      id: '2',
      title: 'Video Player UI with Custom Controls',
      prompt: 'Design a custom video player interface with play/pause, seek bar, quality selection, speed controls, and fullscreen toggle. Include keyboard shortcuts and accessibility features.',
      category: 'ui-ux',
      projectType: 'course-platform',
      tags: ['video', 'controls', 'accessibility'],
      difficulty: 'Intermediate'
    },
    // Architecture - Course Platform
    {
      id: '3',
      title: 'Course Platform Database Schema',
      prompt: 'Design a comprehensive database schema for a course platform including users, courses, lessons, progress tracking, payments, and reviews. Include relationships and indexes.',
      category: 'architecture',
      projectType: 'course-platform',
      tags: ['database', 'schema', 'relationships'],
      difficulty: 'Advanced'
    },
    {
      id: '4',
      title: 'Video Upload Architecture with Progress',
      prompt: 'Design a server-first video upload system using Next.js server actions, Backblaze for storage, Supabase for metadata, and real-time progress updates. No client-side secrets.',
      category: 'architecture',
      projectType: 'course-platform',
      tags: ['upload', 'server-actions', 'storage'],
      difficulty: 'Advanced'
    },
    // Implementation - Video Editor
    {
      id: '5',
      title: 'Timeline Component for Video Editor',
      prompt: 'Implement a drag-and-drop timeline component for video editing with clip positioning, trimming, and layering. Use React DnD and handle performance for large files.',
      category: 'implementation',
      projectType: 'video-editor',
      tags: ['timeline', 'drag-drop', 'performance'],
      difficulty: 'Advanced'
    },
    // UI/UX - E-commerce
    {
      id: '6',
      title: 'Product Card with Quick Actions',
      prompt: 'Create an e-commerce product card with image gallery, quick add to cart, wishlist toggle, and size/color selection. Include smooth animations and loading states.',
      category: 'ui-ux',
      projectType: 'ecommerce',
      tags: ['product', 'animations', 'ecommerce'],
      difficulty: 'Intermediate'
    },
    // Documentation
    {
      id: '7',
      title: 'API Documentation Generator',
      prompt: 'Create a system to automatically generate API documentation from TypeScript interfaces and route handlers. Include request/response examples and interactive testing.',
      category: 'documentation',
      projectType: 'saas',
      tags: ['api', 'typescript', 'documentation'],
      difficulty: 'Advanced'
    },
    // Testing - Dashboard
    {
      id: '8',
      title: 'Dashboard Component Testing Suite',
      prompt: 'Write comprehensive tests for a data dashboard including unit tests for chart components, integration tests for data fetching, and E2E tests for user interactions.',
      category: 'testing',
      projectType: 'dashboard',
      tags: ['testing', 'dashboard', 'charts'],
      difficulty: 'Intermediate'
    },
    // Performance
    {
      id: '9',
      title: 'Image Optimization for Media App',
      prompt: 'Implement a comprehensive image optimization solution with lazy loading, responsive images, WebP conversion, and CDN integration for a social media platform.',
      category: 'performance',
      projectType: 'social-media',
      tags: ['images', 'optimization', 'cdn'],
      difficulty: 'Intermediate'
    },
    // Debugging
    {
      id: '10',
      title: 'Memory Leak Detection in Video App',
      prompt: 'Help diagnose and fix memory leaks in a video editing application. Check for event listener cleanup, component unmounting, and large object disposal.',
      category: 'debugging',
      projectType: 'video-editor',
      tags: ['memory', 'performance', 'cleanup'],
      difficulty: 'Advanced'
    }
  ];

  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const categoryMatch = selectedCategory === 'all' || prompt.category === selectedCategory;
      const projectMatch = selectedProjectType === 'all' || prompt.projectType === selectedProjectType;
      const searchMatch = searchQuery === '' || 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return categoryMatch && projectMatch && searchMatch;
    });
  }, [selectedCategory, selectedProjectType, searchQuery]);

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'gray';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto pb-12">
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-2"
          >
            Claude Code Prompt Library
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-300 text-lg"
          >
            Curated prompts for different web development scenarios
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search prompts, tags, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
              <span className="text-gray-400">🔍</span>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-2 ${
                    selectedCategory === category.id 
                      ? `bg-${category.color}-600 text-white` 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Project Type Filter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">Project Types</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedProjectType('all')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedProjectType === 'all' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                All Projects
              </button>
              {projectTypes.map(projectType => (
                <button
                  key={projectType.id}
                  onClick={() => setSelectedProjectType(projectType.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-2 ${
                    selectedProjectType === projectType.id 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span>{projectType.icon}</span>
                  {projectType.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredPrompts.map(prompt => {
              const category = categories.find(c => c.id === prompt.category);
              const projectType = projectTypes.find(p => p.id === prompt.projectType);
              const isExpanded = expandedPrompt === prompt.id;

              return (
                <motion.div
                  key={prompt.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg border border-gray-700 p-6 hover:border-blue-500 transition-colors"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-2">
                        {prompt.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded text-xs bg-${getCategoryColor(prompt.category)}-600 text-white`}>
                          {category?.icon} {category?.name}
                        </span>
                        <span className="px-2 py-1 rounded text-xs bg-purple-600 text-white">
                          {projectType?.icon} {projectType?.name}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          prompt.difficulty === 'Beginner' ? 'bg-green-600' :
                          prompt.difficulty === 'Intermediate' ? 'bg-yellow-600' : 'bg-red-600'
                        } text-white`}>
                          {prompt.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Prompt Preview */}
                  <div className="mb-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {isExpanded ? prompt.prompt : `${prompt.prompt.substring(0, 120)}...`}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {prompt.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded text-xs bg-gray-700 text-gray-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setExpandedPrompt(isExpanded ? null : prompt.id)}
                      className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                    >
                      {isExpanded ? 'Show Less' : 'Read More'}
                    </button>
                    <button
                      onClick={() => copyToClipboard(prompt.prompt)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded transition-colors"
                    >
                      Copy Prompt
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredPrompts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-white text-xl mb-2">No prompts found</h3>
            <p className="text-gray-400">Try adjusting your filters or search query</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}