'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect } from 'react';

interface NumbersShowcaseProps {
  onSlideSelect: (index: number) => void;
}

export default function NumbersShowcase({ onSlideSelect }: NumbersShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Progress Bar Animation Preview
  const ProgressBarPreview = () => {
    const [started, setStarted] = useState(false);
    
    useEffect(() => {
      const timer = setTimeout(() => setStarted(true), 300);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="space-y-4 w-full max-w-md">
        <div className="flex justify-between text-white text-sm">
          <span>React Skills</span>
          <span>95%</span>
        </div>
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: started ? "95%" : 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
        
        <div className="flex justify-between text-white text-sm">
          <span>JavaScript</span>
          <span>88%</span>
        </div>
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: started ? "88%" : 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          />
        </div>
      </div>
    );
  };

  // Number Counter Preview
  const NumberCounterPreview = () => {
    const count1 = useMotionValue(0);
    const count2 = useMotionValue(0);
    
    const display1 = useTransform(count1, latest => Math.round(latest).toLocaleString());
    const display2 = useTransform(count2, latest => `$${Math.round(latest).toLocaleString()}`);

    useEffect(() => {
      const controls = [
        animate(count1, 25430, { duration: 2, ease: "easeOut" }),
        animate(count2, 189500, { duration: 2.5, ease: "easeOut", delay: 0.3 })
      ];

      return () => controls.forEach(control => control.stop());
    }, [count1, count2]);

    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="text-center">
          <div className="text-3xl mb-2">👥</div>
          <motion.div className="text-2xl font-bold text-blue-400">
            {display1}
          </motion.div>
          <div className="text-gray-400 text-sm">Followers</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl mb-2">💰</div>
          <motion.div className="text-2xl font-bold text-green-400">
            {display2}
          </motion.div>
          <div className="text-gray-400 text-sm">Revenue</div>
        </div>
      </div>
    );
  };

  // Line Graph Preview
  const LineGraphPreview = () => (
    <div className="w-full max-w-md">
      <svg className="w-full h-32" viewBox="0 0 200 80">
        <defs>
          <linearGradient id="previewLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 20 60 L 40 45 L 60 50 L 80 30 L 100 20 L 120 25 L 140 15 L 160 10 L 180 5"
          stroke="url(#previewLineGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((x, i) => {
          const y = [60, 45, 50, 30, 20, 25, 15, 10, 5][i];
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#3b82f6"
              stroke="white"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 + 0.5, duration: 0.3 }}
            />
          );
        })}
      </svg>
      <div className="text-gray-400 text-sm mt-2 text-center">Revenue Growth</div>
    </div>
  );

  // Bar Graph Preview
  const BarGraphPreview = () => {
    const [started, setStarted] = useState(false);
    
    useEffect(() => {
      const timer = setTimeout(() => setStarted(true), 200);
      return () => clearTimeout(timer);
    }, []);

    const data = [45, 28, 18, 9];
    const colors = ['bg-red-500', 'bg-purple-500', 'bg-gray-700', 'bg-blue-500'];
    const labels = ['YT', 'IG', 'TT', 'X'];

    return (
      <div className="w-full max-w-sm">
        <div className="flex items-end justify-center gap-4 h-24 mb-4">
          {data.map((height, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-white text-xs mb-1">{height}%</div>
              <motion.div
                className={`w-8 ${colors[i]} rounded-t`}
                initial={{ height: 0 }}
                animate={{ height: started ? `${height * 1.5}px` : 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
              <div className="text-gray-400 text-xs mt-1">{labels[i]}</div>
            </div>
          ))}
        </div>
        <div className="text-gray-400 text-sm text-center">Market Share</div>
      </div>
    );
  };

  const animations = [
    {
      id: 12,
      name: "Progress Bars",
      component: ProgressBarPreview,
      file: "ProgressBarSlide.tsx",
      description: "Animated skill bars with gradient fills and shimmer effects",
      tags: ["skills", "progress", "data"]
    },
    {
      id: 13,
      name: "Number Counters",
      component: NumberCounterPreview,
      file: "NumberCounterSlide.tsx",
      description: "Animated number counting with custom formatting",
      tags: ["metrics", "stats", "counters"]
    },
    {
      id: 14,
      name: "Line Graph",
      component: LineGraphPreview,
      file: "LineGraphSlide.tsx", 
      description: "Animated line chart with data points and tooltips",
      tags: ["chart", "growth", "trends"]
    },
    {
      id: 15,
      name: "Bar Graph",
      component: BarGraphPreview,
      file: "BarGraphSlide.tsx",
      description: "Animated bar chart with platform comparisons",
      tags: ["comparison", "market", "analysis"]
    }
  ];

  return (
    <div className="w-full h-full bg-black overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-black/95 backdrop-blur-lg z-20 border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
            Numbers & Graphs
          </h1>
          <p className="text-gray-400">Data visualizations, counters, and progress indicators</p>
        </div>
      </div>

      {/* Animations List */}
      <div className="max-w-7xl mx-auto p-6 space-y-16">
        {animations.map((anim, index) => {
          const AnimationComponent = anim.component;
          return (
            <motion.section
              key={anim.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animation Info Bar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {anim.id}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{anim.name}</h2>
                    <p className="text-gray-500 text-sm">{anim.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-gray-400 text-xs">Edit in:</p>
                    <p className="text-orange-400 font-mono text-sm">{anim.file}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSlideSelect(anim.id)}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-shadow"
                  >
                    View Full Screen
                  </motion.button>
                </div>
              </div>

              {/* Animation Preview */}
              <div 
                className="relative min-h-[200px] flex items-center justify-center p-12 bg-gray-900/30 rounded-xl border border-gray-800 cursor-pointer hover:border-gray-700 transition-all"
                onClick={() => onSlideSelect(anim.id)}
              >
                {/* Hover Overlay */}
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl pointer-events-none"
                  />
                )}

                {/* Animation */}
                <AnimationComponent />

                {/* Tags */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {anim.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-800/80 backdrop-blur rounded-full text-xs text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Click hint */}
                <div className="absolute top-4 right-4 text-gray-600 text-xs">
                  Click to preview
                </div>
              </div>
            </motion.section>
          );
        })}

        {/* Back to categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-16 border-t border-gray-800"
        >
          <div
            onClick={() => window.open('/start', '_blank')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-semibold transition-colors cursor-pointer"
          >
            ← Back to Categories
          </div>
        </motion.div>
      </div>
    </div>
  );
}