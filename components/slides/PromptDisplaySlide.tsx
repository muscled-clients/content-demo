'use client'

import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

interface PromptDisplaySlideProps {
  prompt?: string
  title?: string
}

export default function PromptDisplaySlide({ 
  prompt = `Create a modern dashboard with React and Tailwind CSS.
Include a sidebar navigation, header with user profile,
and main content area with cards showing key metrics.
Add smooth animations and make it fully responsive.
Use a dark theme with blue accent colors.`, 
  title = "Try this with Claude Code" 
}: PromptDisplaySlideProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full"
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Terminal className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">{title}</h1>
          </div>
          <p className="text-slate-400 text-lg">Copy and paste this prompt to get started</p>
        </motion.div>

        {/* Prompt Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="relative group"
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          
          {/* Main prompt container */}
          <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            {/* Prompt text */}
            <motion.pre
              className="text-slate-100 font-mono text-lg leading-relaxed whitespace-pre-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {prompt}
            </motion.pre>
          </div>
        </motion.div>

        {/* Footer hint */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="text-slate-500 text-sm">
            Select the text above to copy
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}