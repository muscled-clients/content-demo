'use client';

import { motion } from 'framer-motion';

export default function StackedBoxesSlide() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const boxVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const boxes = [
    { title: "DESIGN", subtitle: "User Interface", gradient: "from-purple-500 to-pink-500" },
    { title: "DEVELOP", subtitle: "Code & Build", gradient: "from-blue-500 to-cyan-500" },
    { title: "DEPLOY", subtitle: "Ship & Scale", gradient: "from-green-500 to-emerald-500" },
    { title: "ITERATE", subtitle: "Improve & Grow", gradient: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black">
      <div className="max-w-2xl w-full px-8 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {boxes.map((box, index) => (
            <motion.div
              key={index}
              variants={boxVariants}
              whileHover={{ 
                scale: 1.03,
                x: 10,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              {/* Main container with glass effect */}
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl overflow-hidden">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${box.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`absolute inset-[1px] rounded-2xl bg-gradient-to-r ${box.gradient} p-[1px]`}>
                    <div className="w-full h-full bg-black/80 rounded-2xl" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h2 className="text-white text-2xl font-bold mb-1">
                      {box.title}
                    </h2>
                    <p className="text-gray-400 text-sm uppercase tracking-wider">
                      {box.subtitle}
                    </p>
                  </div>
                  
                  {/* Decorative element */}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${box.gradient} opacity-80 flex items-center justify-center`}>
                    <div className="w-6 h-6 bg-white/20 rounded-full" />
                  </div>
                </div>
                
                {/* Subtle shine effect */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 opacity-0"
                  animate={{
                    x: ['-200%', '200%'],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.3,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}