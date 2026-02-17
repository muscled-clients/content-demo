'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function NumberCounterSlide() {
  const [startCounting, setStartCounting] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [targetValues, setTargetValues] = useState({
    followers: 25430,
    revenue: 189500,
    clients: 127,
    projects: 89
  });
  const [statLabels, setStatLabels] = useState({
    followers: "Followers",
    revenue: "Revenue", 
    clients: "Happy Clients",
    projects: "Projects"
  });
  const [visibleStats, setVisibleStats] = useState({
    followers: true,
    revenue: true,
    clients: true,
    projects: true
  });

  // Motion values for counters
  const followersCount = useMotionValue(0);
  const revenueCount = useMotionValue(0);
  const clientsCount = useMotionValue(0);
  const projectsCount = useMotionValue(0);

  // Transform motion values to rounded numbers
  const followersDisplay = useTransform(followersCount, latest => Math.round(latest).toLocaleString());
  const revenueDisplay = useTransform(revenueCount, latest => `$${Math.round(latest).toLocaleString()}`);
  const clientsDisplay = useTransform(clientsCount, latest => Math.round(latest).toString());
  const projectsDisplay = useTransform(projectsCount, latest => Math.round(latest).toString());

  useEffect(() => {
    const timer = setTimeout(() => setStartCounting(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!startCounting) return;

    // Reset counters to 0 first
    followersCount.set(0);
    revenueCount.set(0);
    clientsCount.set(0);
    projectsCount.set(0);

    // Animate all counters simultaneously with different durations
    const controls = [
      animate(followersCount, targetValues.followers, { duration: 2.5, ease: "easeOut" }),
      animate(revenueCount, targetValues.revenue, { duration: 3, ease: "easeOut", delay: 0.2 }),
      animate(clientsCount, targetValues.clients, { duration: 2, ease: "easeOut", delay: 0.4 }),
      animate(projectsCount, targetValues.projects, { duration: 1.8, ease: "easeOut", delay: 0.6 })
    ];

    return () => {
      controls.forEach(control => control.stop());
    };
  }, [startCounting, targetValues, followersCount, revenueCount, clientsCount, projectsCount]);

  const restartAnimation = () => {
    setStartCounting(false);
    setTimeout(() => setStartCounting(true), 100);
  };

  const stats = [
    {
      key: "followers",
      label: statLabels.followers,
      value: followersDisplay,
      icon: "👥",
      color: "from-blue-500 to-cyan-500",
      delay: 0,
      visible: visibleStats.followers
    },
    {
      key: "revenue",
      label: statLabels.revenue, 
      value: revenueDisplay,
      icon: "💰",
      color: "from-green-500 to-emerald-500",
      delay: 0.2,
      visible: visibleStats.revenue
    },
    {
      key: "clients",
      label: statLabels.clients,
      value: clientsDisplay,
      icon: "😊",
      color: "from-purple-500 to-pink-500", 
      delay: 0.4,
      visible: visibleStats.clients
    },
    {
      key: "projects",
      label: statLabels.projects,
      value: projectsDisplay,
      icon: "🚀",
      color: "from-orange-500 to-red-500",
      delay: 0.6,
      visible: visibleStats.projects
    }
  ].filter(stat => stat.visible);

  return (
    <div className="w-full h-full flex bg-black">
      {/* Left Sidebar Controls */}
      <motion.div 
        className="bg-gray-900/95 backdrop-blur border-r border-gray-700 p-6 overflow-y-auto"
        initial={{ x: -300 }}
        animate={{ x: showControls ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        style={{ width: '300px' }}
      >
        <h3 className="text-white text-lg font-bold mb-6">Edit Slide</h3>
        
        {/* Visibility Checkboxes */}
        <div className="mb-6">
          <label className="text-gray-400 text-sm mb-3 block">Visible Stats</label>
          <div className="space-y-2">
            {Object.entries(visibleStats).map(([key, visible]) => (
              <label key={key} className="flex items-center text-white">
                <input
                  type="checkbox"
                  checked={visible}
                  onChange={(e) => setVisibleStats(prev => ({ ...prev, [key]: e.target.checked }))}
                  className="mr-2"
                />
                {statLabels[key as keyof typeof statLabels]}
              </label>
            ))}
          </div>
        </div>

        {/* Label Inputs */}
        <div className="mb-6">
          <label className="text-gray-400 text-sm mb-3 block">Stat Labels</label>
          <div className="space-y-3">
            <div>
              <label className="text-gray-300 text-xs mb-1 block">Followers Label</label>
              <input
                type="text"
                value={statLabels.followers}
                onChange={(e) => setStatLabels(prev => ({ ...prev, followers: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-gray-300 text-xs mb-1 block">Revenue Label</label>
              <input
                type="text"
                value={statLabels.revenue}
                onChange={(e) => setStatLabels(prev => ({ ...prev, revenue: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-gray-300 text-xs mb-1 block">Clients Label</label>
              <input
                type="text"
                value={statLabels.clients}
                onChange={(e) => setStatLabels(prev => ({ ...prev, clients: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-gray-300 text-xs mb-1 block">Projects Label</label>
              <input
                type="text"
                value={statLabels.projects}
                onChange={(e) => setStatLabels(prev => ({ ...prev, projects: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Number Inputs */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Followers</label>
            <input
              type="number"
              value={targetValues.followers}
              onChange={(e) => setTargetValues(prev => ({ ...prev, followers: parseInt(e.target.value) || 0 }))}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Revenue</label>
            <input
              type="number"
              value={targetValues.revenue}
              onChange={(e) => setTargetValues(prev => ({ ...prev, revenue: parseInt(e.target.value) || 0 }))}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Clients</label>
            <input
              type="number"
              value={targetValues.clients}
              onChange={(e) => setTargetValues(prev => ({ ...prev, clients: parseInt(e.target.value) || 0 }))}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Projects</label>
            <input
              type="number"
              value={targetValues.projects}
              onChange={(e) => setTargetValues(prev => ({ ...prev, projects: parseInt(e.target.value) || 0 }))}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Restart Button */}
        <button
          onClick={restartAnimation}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Restart Animation
        </button>
      </motion.div>

      {/* Toggle Button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="fixed top-4 left-4 z-50 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors"
      >
        ⚙️
      </button>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-6xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6,
                delay: stat.delay,
                ease: "easeOut"
              }}
              className="relative group"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              
              {/* Main card */}
              <div className="relative bg-gray-900/80 backdrop-blur border border-gray-700 rounded-2xl p-8 text-center hover:border-gray-500 transition-all duration-300">
                {/* Icon */}
                <div className="text-6xl mb-4">
                  {stat.icon}
                </div>
                
                {/* Animated number */}
                <motion.div 
                  className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}
                >
                  {stat.value}
                </motion.div>
                
                {/* Label */}
                <div className="text-gray-400 text-lg font-medium">
                  {stat.label}
                </div>

                {/* Pulse animation for visual emphasis */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0`}
                  animate={startCounting ? {
                    opacity: [0, 0.1, 0],
                    scale: [1, 1.05, 1]
                  } : {}}
                  transition={{
                    duration: 0.6,
                    delay: stat.delay + 1,
                    ease: "easeOut"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <p className="text-gray-500 text-xl">
            Numbers that speak for themselves
          </p>
        </motion.div>
        </div>
      </div>
    </div>
  );
}