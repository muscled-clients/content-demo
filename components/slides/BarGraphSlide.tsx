'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function BarGraphSlide() {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStartAnimation(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const marketData = [
    { 
      platform: 'YouTube', 
      percentage: 45, 
      value: '$2.3M',
      color: 'from-red-500 to-red-600',
      icon: '📺'
    },
    { 
      platform: 'Instagram', 
      percentage: 28, 
      value: '$1.4M',
      color: 'from-pink-500 to-purple-600',
      icon: '📸'
    },
    { 
      platform: 'TikTok', 
      percentage: 18, 
      value: '$900K',
      color: 'from-gray-800 to-gray-900',
      icon: '🎵'
    },
    { 
      platform: 'Twitter', 
      percentage: 9, 
      value: '$450K',
      color: 'from-blue-400 to-blue-600',
      icon: '🐦'
    }
  ];

  const maxValue = Math.max(...marketData.map(d => d.percentage));

  return (
    <div className="w-full h-full flex items-center justify-center bg-black p-8">
      <div className="max-w-6xl w-full">
        <motion.h1
          className="text-5xl font-bold text-center text-white mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Market Share Analysis
        </motion.h1>
        
        <motion.p
          className="text-center text-gray-400 text-xl mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Revenue Distribution by Platform
        </motion.p>

        <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700">
          {/* Chart area */}
          <div className="relative h-96 flex items-end justify-center gap-8 mb-8">
            {/* Y-axis */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-gray-400 text-sm">
              <span>50%</span>
              <span>40%</span>
              <span>30%</span>
              <span>20%</span>
              <span>10%</span>
              <span>0%</span>
            </div>

            {/* Grid lines */}
            <div className="absolute inset-0 left-12">
              {[0, 20, 40, 60, 80, 100].map((percentage, index) => (
                <motion.div
                  key={`grid-${index}`}
                  className="absolute w-full border-t border-gray-700 border-dashed"
                  style={{ bottom: `${percentage}%` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: startAnimation ? 0.3 : 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              ))}
            </div>

            {/* Bars */}
            <div className="flex items-end justify-center gap-8 h-full relative z-10" style={{ marginLeft: '48px' }}>
              {marketData.map((item, index) => {
                const barHeight = (item.percentage / maxValue) * 100;
                
                return (
                  <div key={item.platform} className="flex flex-col items-center">
                    {/* Value label on top of bar */}
                    <motion.div
                      className="mb-2 text-white font-semibold text-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: startAnimation ? 1 : 0, y: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: startAnimation ? 1 + index * 0.15 : 0 
                      }}
                    >
                      {item.percentage}%
                    </motion.div>

                    {/* Bar container */}
                    <div className="relative w-24 bg-gray-800 rounded-t-lg overflow-hidden" style={{ height: '280px' }}>
                      {/* Animated bar */}
                      <motion.div
                        className={`absolute bottom-0 w-full bg-gradient-to-t ${item.color} rounded-t-lg relative overflow-hidden`}
                        initial={{ height: 0 }}
                        animate={{ height: startAnimation ? `${barHeight}%` : 0 }}
                        transition={{ 
                          duration: 1, 
                          delay: startAnimation ? 0.5 + index * 0.15 : 0, 
                          ease: "easeOut" 
                        }}
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent"
                          animate={startAnimation ? {
                            y: ['-100%', '100%']
                          } : {}}
                          transition={{
                            duration: 2,
                            delay: 1.5 + index * 0.15,
                            ease: "easeInOut"
                          }}
                        />
                        
                        {/* Value display */}
                        <motion.div
                          className="absolute top-2 left-0 right-0 text-center text-white text-sm font-bold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: startAnimation ? 1 : 0 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: startAnimation ? 1.5 + index * 0.15 : 0 
                          }}
                        >
                          {item.value}
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Platform label */}
                    <motion.div
                      className="mt-4 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: startAnimation ? 2 + index * 0.1 : 0 
                      }}
                    >
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <div className="text-white font-semibold">{item.platform}</div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary stats */}
          <motion.div
            className="border-t border-gray-700 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.5 }}
          >
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-green-400 text-2xl font-bold">$5.05M</div>
                <div className="text-gray-400 text-sm">Total Revenue</div>
              </div>
              
              <div className="text-center">
                <div className="text-blue-400 text-2xl font-bold">4</div>
                <div className="text-gray-400 text-sm">Platforms</div>
              </div>
              
              <div className="text-center">
                <div className="text-purple-400 text-2xl font-bold">Q4 2024</div>
                <div className="text-gray-400 text-sm">Report Period</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key insights */}
        <motion.div
          className="mt-8 grid grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 3 }}
        >
          <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-800">
            <div className="text-green-400 font-semibold mb-2">📈 Top Performer</div>
            <div className="text-white">YouTube dominates with 45% market share</div>
          </div>
          
          <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-800">
            <div className="text-orange-400 font-semibold mb-2">🎯 Growth Opportunity</div>
            <div className="text-white">TikTok shows potential for expansion</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}