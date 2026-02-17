'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LineGraphSlide() {
  const [startAnimation, setStartAnimation] = useState(false);
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const pathProgress = useMotionValue(0);

  useEffect(() => {
    const timer = setTimeout(() => setStartAnimation(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (startAnimation) {
      const controls = animate(pathProgress, 1, {
        duration: 2,
        delay: 1,
        ease: "easeInOut",
        onUpdate: (latest) => {
          const segmentLength = 1 / (dataPoints.length - 1);
          const newIndex = Math.min(
            Math.floor(latest / segmentLength), 
            dataPoints.length - 1
          );
          setCurrentPointIndex(newIndex);
        }
      });

      return () => controls.stop();
    }
  }, [startAnimation, pathProgress]);

  // Revenue data points - using proper coordinates
  const dataPoints = [
    { month: 'Jan', value: 12000, x: 50, y: 320 },
    { month: 'Feb', value: 19000, x: 100, y: 280 },
    { month: 'Mar', value: 8000, x: 150, y: 340 },
    { month: 'Apr', value: 25000, x: 200, y: 240 },
    { month: 'May', value: 32000, x: 250, y: 180 },
    { month: 'Jun', value: 45000, x: 300, y: 100 },
    { month: 'Jul', value: 38000, x: 350, y: 140 },
    { month: 'Aug', value: 52000, x: 400, y: 60 },
    { month: 'Sep', value: 61000, x: 450, y: 20 }
  ];

  // Create SVG path string
  const createPath = (points: typeof dataPoints) => {
    const pathData = points.reduce((acc, point, index) => {
      const command = index === 0 ? 'M' : 'L';
      return `${acc} ${command} ${point.x} ${point.y}`;
    }, '');
    return pathData.trim();
  };

  const pathString = createPath(dataPoints);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black p-8">
      <div className="max-w-6xl w-full">
        <motion.h1
          className="text-5xl font-bold text-center text-white mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Revenue Growth
        </motion.h1>
        
        <motion.p
          className="text-center text-gray-400 text-xl mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Monthly Performance 2024
        </motion.p>

        <div className="relative">
          {/* Graph container */}
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700">
            <div className="relative h-96 w-full">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-gray-400 text-sm">
                <span>$60k</span>
                <span>$45k</span>
                <span>$30k</span>
                <span>$15k</span>
                <span>$0</span>
              </div>

              {/* SVG Chart */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 400" style={{ left: '40px', width: 'calc(100% - 40px)' }}>
                {/* Horizontal grid lines */}
                {[80, 160, 240, 320].map((y, index) => (
                  <motion.line
                    key={`grid-h-${index}`}
                    x1="40"
                    x2="480"
                    y1={y}
                    y2={y}
                    stroke="#374151"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: startAnimation ? 0.3 : 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                ))}

                {/* Vertical grid lines */}
                {dataPoints.map((point, index) => (
                  <motion.line
                    key={`grid-v-${index}`}
                    x1={point.x}
                    x2={point.x}
                    y1="20"
                    y2="360"
                    stroke="#374151"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: startAnimation ? 0.2 : 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                  />
                ))}

                {/* Gradient area under curve */}
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                <motion.path
                  d={`${pathString} L 450 360 L 50 360 Z`}
                  fill="url(#areaGradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: startAnimation ? 1 : 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                />

                {/* Animated line */}
                <motion.path
                  d={pathString}
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: startAnimation ? 1 : 0 }}
                  transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                />

                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>

                {/* Data points - only show circles, no individual tooltips */}
                {dataPoints.map((point, index) => (
                  <motion.circle
                    key={`point-${index}`}
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill="#3b82f6"
                    stroke="#ffffff"
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: startAnimation ? 1 : 0,
                      opacity: startAnimation ? 1 : 0
                    }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 1 + index * 0.1,
                      ease: "backOut"
                    }}
                  />
                ))}

                {/* Animated tooltip that follows the line */}
                {startAnimation && currentPointIndex < dataPoints.length && (() => {
                  const currentPoint = dataPoints[currentPointIndex];
                  // Show tooltip below if point is in top 25% of chart
                  const showBelow = currentPoint.y < 100;
                  const tooltipY = showBelow ? currentPoint.y + 15 : currentPoint.y - 35;
                  const textY = showBelow ? currentPoint.y + 28 : currentPoint.y - 22;
                  
                  return (
                    <g>
                      {/* Tooltip background */}
                      <rect
                        x={currentPoint.x - 25}
                        y={tooltipY}
                        width="50"
                        height="25"
                        rx="6"
                        fill="#1f2937"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                      {/* Tooltip text */}
                      <text
                        x={currentPoint.x}
                        y={textY}
                        fill="#ffffff"
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        ${currentPoint.value / 1000}k
                      </text>
                    </g>
                  );
                })()}
              </svg>

              {/* X-axis labels */}
              <div className="absolute bottom-0 w-full flex justify-between text-gray-400 text-sm" style={{ left: '40px', width: 'calc(100% - 40px)', paddingTop: '10px' }}>
                {dataPoints.map((point, index) => (
                  <motion.span
                    key={point.month}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 2.5 + index * 0.05 }}
                  >
                    {point.month}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <motion.div
              className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3 }}
            >
              <div className="text-green-400 text-2xl font-bold">+408%</div>
              <div className="text-gray-400 text-sm">Growth Rate</div>
            </motion.div>
            
            <motion.div
              className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3.2 }}
            >
              <div className="text-blue-400 text-2xl font-bold">$61k</div>
              <div className="text-gray-400 text-sm">Peak Month</div>
            </motion.div>
            
            <motion.div
              className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3.4 }}
            >
              <div className="text-purple-400 text-2xl font-bold">$31k</div>
              <div className="text-gray-400 text-sm">Average</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}