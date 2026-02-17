'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function VideoUploadERDSlide() {
  const [animationStep, setAnimationStep] = useState(0);
  const totalSteps = 6;

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev < totalSteps ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-2"
        >
          Video Upload System - Entity Relationships
        </motion.h1>
      </div>

      {/* Main ERD Container */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-5xl">
          
          {/* Top Row */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            {/* Client Side */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: animationStep >= 1 ? 1 : 0, y: 0 }}
              className="col-span-1"
            >
              <div className="bg-blue-800 bg-opacity-20 border-2 border-blue-400 rounded-lg p-4 backdrop-blur-sm h-full">
                <h3 className="text-blue-300 font-semibold mb-3 text-center">Client</h3>
                
                <div className="bg-gray-800 border border-gray-600 rounded p-3 mb-2">
                  <div className="text-yellow-400 text-xs font-mono mb-1">Zustand Store</div>
                  <div className="space-y-0.5 text-xs text-gray-300">
                    <div>• uploadProgress</div>
                    <div>• uploadStatus</div>
                    <div>• fileMetadata</div>
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-600 rounded p-3">
                  <div className="text-green-400 text-xs font-mono mb-1">UI Component</div>
                  <div className="space-y-0.5 text-xs text-gray-300">
                    <div>• File Input</div>
                    <div>• Progress Bar</div>
                    <div>• Status Display</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Server Side */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: animationStep >= 2 ? 1 : 0, y: 0 }}
              className="col-span-1"
            >
              <div className="bg-purple-800 bg-opacity-20 border-2 border-purple-400 rounded-lg p-4 backdrop-blur-sm h-full">
                <h3 className="text-purple-300 font-semibold mb-3 text-center">Next.js Server</h3>
                
                <div className="bg-gray-800 border border-gray-600 rounded p-3 mb-2">
                  <div className="text-purple-400 text-xs font-mono mb-1">Server Action</div>
                  <div className="space-y-0.5 text-xs text-gray-300">
                    <div>• validateAuth()</div>
                    <div>• processUpload()</div>
                    <div>• saveMetadata()</div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: animationStep >= 3 ? 1 : 0 }}
                  className="bg-gray-800 border border-gray-600 rounded p-3"
                >
                  <div className="text-red-400 text-xs font-mono mb-1">.env.local</div>
                  <div className="space-y-0.5 text-xs text-gray-300">
                    <div>• BACKBLAZE_*</div>
                    <div>• SUPABASE_*</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Backblaze B2 */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: animationStep >= 4 ? 1 : 0, y: 0 }}
              className="col-span-1"
            >
              <div className="bg-orange-800 bg-opacity-20 border-2 border-orange-400 rounded-lg p-4 backdrop-blur-sm h-full">
                <h3 className="text-orange-300 font-semibold mb-3 text-center">Backblaze B2</h3>
                
                <div className="bg-gray-800 border border-gray-600 rounded p-3">
                  <div className="text-orange-400 text-xs font-mono mb-1">Storage Bucket</div>
                  <div className="space-y-0.5 text-xs text-gray-300">
                    <div>• fileId: string</div>
                    <div>• fileName: string</div>
                    <div>• fileSize: number</div>
                    <div>• publicUrl: string</div>
                    <div>• uploadedAt: timestamp</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-3 gap-8">
            {/* Empty space */}
            <div className="col-span-1"></div>

            {/* Progress API */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: animationStep >= 6 ? 1 : 0, y: 0 }}
              className="col-span-1"
            >
              <div className="bg-green-800 bg-opacity-20 border-2 border-green-400 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="text-green-300 font-semibold mb-3 text-center">Progress API</h3>
                
                <div className="bg-gray-800 border border-gray-600 rounded p-3">
                  <div className="text-green-400 text-xs font-mono mb-1">/api/upload-progress</div>
                  <div className="space-y-0.5 text-xs text-gray-300">
                    <div>• GET: getProgress(id)</div>
                    <div>• WebSocket updates</div>
                    <div>• Real-time status</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Supabase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: animationStep >= 5 ? 1 : 0, y: 0 }}
              className="col-span-1"
            >
              <div className="bg-teal-800 bg-opacity-20 border-2 border-teal-400 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="text-teal-300 font-semibold mb-3 text-center">Supabase</h3>
                
                <div className="bg-gray-800 border border-gray-600 rounded p-3">
                  <div className="text-teal-400 text-xs font-mono mb-1">uploads table</div>
                  <div className="space-y-0.5 text-xs text-gray-300">
                    <div>• id: uuid (PK)</div>
                    <div>• user_id: uuid (FK)</div>
                    <div>• file_url: text</div>
                    <div>• file_name: text</div>
                    <div>• status: varchar</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Flow Arrows and Labels */}
          <div className="relative mt-8">
            <div className="flex justify-center items-center gap-4 text-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: animationStep >= 2 ? 1 : 0, scale: 1 }}
                className="bg-blue-600 text-white px-3 py-1 rounded-full"
              >
                1. Upload File
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: animationStep >= 4 ? 1 : 0, scale: 1 }}
                className="bg-orange-600 text-white px-3 py-1 rounded-full"
              >
                2. Store File
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: animationStep >= 5 ? 1 : 0, scale: 1 }}
                className="bg-teal-600 text-white px-3 py-1 rounded-full"
              >
                3. Save Metadata
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: animationStep >= 6 ? 1 : 0, scale: 1 }}
                className="bg-green-600 text-white px-3 py-1 rounded-full"
              >
                4. Progress Updates
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded"></div>
          <span className="text-gray-400">Client Side</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-400 rounded"></div>
          <span className="text-gray-400">Server Side</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-400 rounded"></div>
          <span className="text-gray-400">File Storage</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-teal-400 rounded"></div>
          <span className="text-gray-400">Database</span>
        </div>
      </div>
    </div>
  );
}