'use client';

import { motion } from 'framer-motion';
import { categories } from '../../lib/animations/categories';

interface PreviewSlideProps {
  onSlideSelect: (index: number) => void;
}

export default function PreviewSlide({ onSlideSelect }: PreviewSlideProps) {
  return (
    <div className="w-full h-full bg-black overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-lg z-10 border-b border-gray-800 p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-5xl font-bold text-white mb-2">Animation Library</h1>
          <p className="text-gray-400 text-lg">Screen-recordable animations for reels and social content</p>
        </motion.div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto p-6 space-y-12">
        {categories.map((category, categoryIndex) => (
          <motion.section
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="space-y-6"
          >
            {/* Category Header */}
            <div className="flex items-center gap-4">
              <span className="text-4xl">{category.icon}</span>
              <div>
                <h2 className={`text-3xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.name}
                </h2>
                <p className="text-gray-500 mt-1">{category.description}</p>
              </div>
            </div>

            {/* Slides Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.slides.map((slide, slideIndex) => (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: categoryIndex * 0.1 + slideIndex * 0.05 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  onClick={() => onSlideSelect(slide.id)}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                  
                  <div className="relative bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all">
                    {/* Slide Number Badge */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {slide.id}
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-semibold text-white mb-2">{slide.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{slide.description}</p>
                    
                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs">
                      {slide.duration && (
                        <span className="text-gray-500">
                          <span className="text-gray-600">⏱</span> {slide.duration}
                        </span>
                      )}
                      {slide.tags && (
                        <div className="flex gap-1 flex-wrap">
                          {slide.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-800 rounded text-gray-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Recording Tip (on hover) */}
                    {slide.recordingTips && (
                      <div className="absolute bottom-full mb-2 left-0 right-0 p-3 bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                        <p className="text-xs text-gray-300">
                          <span className="text-yellow-400">💡 Tip:</span> {slide.recordingTips}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Text Animations Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center py-8"
        >
          <div
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all hover:scale-105 cursor-pointer"
            onClick={() => window.open('/text-animations', '_blank')}
          >
            <span className="text-2xl">✨</span>
            View All Text Animations
            <span className="text-sm opacity-80">(Separate Page)</span>
          </div>
        </motion.div>

        {/* Footer Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center py-12 border-t border-gray-800"
        >
          <div className="space-y-4 text-gray-500">
            <p className="text-lg">📹 Recording Tips</p>
            <div className="flex justify-center gap-8 text-sm">
              <span>• Fullscreen (F11)</span>
              <span>• 1920x1080</span>
              <span>• 60fps</span>
              <span>• OBS recommended</span>
            </div>
            <p className="text-xs mt-4">Use arrow keys to navigate • Direct URL: ?slide=[1-9]</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}