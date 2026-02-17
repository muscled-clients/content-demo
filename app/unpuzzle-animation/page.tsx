'use client';

import React, { useState, useEffect } from 'react';

export default function UnpuzzleAnimation() {
  const [currentTime, setCurrentTime] = useState(134); // Start at 2:14 (134 seconds)
  const totalDuration = 390; // 6:30 total (390 seconds)
  const [typedCode, setTypedCode] = useState('');
  const [isPlaying, setIsPlaying] = useState(true); // Video is auto-playing
  
  const codeSteps = [
    "import React, { useState } from 'react';\n\n",
    "function TodoApp() {\n",
    "  const [todos, setTodos] = useState([]);\n",
    "  const [input, setInput] = useState('');\n\n",
    "  const addTodo = () => {\n",
    "    if (input.trim()) {\n",
    "      setTodos([...todos, {\n",
    "        id: Date.now(),\n",
    "        text: input,\n",
    "        completed: false\n",
    "      }]);\n",
    "      setInput('');\n",
    "    }\n",
    "  };\n\n",
    "  return (\n",
    "    <div className='todo-app'>\n",
    "      <h1>My Todo List</h1>\n",
    "      <input \n",
    "        value={input}\n",
    "        onChange={(e) => setInput(e.target.value)}\n",
    "        placeholder='Add a new todo...'\n",
    "      />\n",
    "      <button onClick={addTodo}>Add</button>\n",
    "    </div>\n",
    "  );\n",
    "}\n\n",
    "export default TodoApp;"
  ];
  
  const [currentStep, setCurrentStep] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  // Code typing animation
  useEffect(() => {
    const typeInterval = setInterval(() => {
      if (currentStep < codeSteps.length) {
        const currentStepText = codeSteps[currentStep];
        if (currentChar < currentStepText.length) {
          setTypedCode(prev => prev + currentStepText[currentChar]);
          setCurrentChar(prev => prev + 1);
        } else {
          // Move to next step
          setCurrentStep(prev => prev + 1);
          setCurrentChar(0);
        }
      } else {
        // Reset animation
        setTypedCode('');
        setCurrentStep(0);
        setCurrentChar(0);
      }
    }, 50); // Typing speed

    return () => clearInterval(typeInterval);
  }, [currentStep, currentChar, codeSteps]);

  // Video progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= totalDuration) {
          return 0; // Reset to start when reaching end
        }
        return prev + 0.1; // Increment by 0.1 seconds for smooth movement
      });
    }, 100); // Update every 100ms for smooth animation

    return () => clearInterval(interval);
  }, [totalDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / totalDuration) * 100;

  return (
    <div className="h-screen bg-black flex items-center justify-center gap-4">
      {/* Video Player */}
      <div className="w-[800px] bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
        {/* Video Content Area - VS Code Editor */}
        <div className="w-full h-[400px] bg-gray-900 relative flex flex-col">
          {/* VS Code Title Bar */}
          <div className="h-8 bg-gray-800 flex items-center justify-between px-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-300 text-sm ml-4">TodoApp.jsx</span>
            </div>
            <div className="text-gray-400 text-xs">React Tutorial - Building a Todo App</div>
          </div>
          
          {/* Editor Tabs */}
          <div className="h-10 bg-gray-800 flex items-center border-b border-gray-700">
            <div className="bg-gray-700 px-4 py-2 text-sm text-white border-r border-gray-600">
              TodoApp.jsx
            </div>
            <div className="px-4 py-2 text-sm text-gray-400">
              App.css
            </div>
          </div>
          
          {/* Code Editor */}
          <div className="flex-1 flex">
            {/* Line Numbers */}
            <div className="w-12 bg-gray-800 text-gray-500 text-sm font-mono p-2 select-none border-r border-gray-700">
              {typedCode.split('\n').map((_, index) => (
                <div key={index} className="leading-6 text-right pr-2">
                  {index + 1}
                </div>
              ))}
            </div>
            
            {/* Code Content */}
            <div className="flex-1 bg-gray-900 text-gray-100 text-sm font-mono p-4 overflow-hidden">
              <pre className="leading-6">
                <code 
                  className="text-gray-100"
                  dangerouslySetInnerHTML={{
                    __html: typedCode
                      .replace(/\b(import|from|function|const|return|if|export|default)\b/g, '<span class="text-purple-400">$1</span>')
                      .replace(/\b(React|useState|TodoApp|Date)\b/g, '<span class="text-blue-400">$1</span>')
                      .replace(/(\'[^\']*\'|\"[^\"]*\")/g, '<span class="text-green-400">$1</span>')
                      .replace(/\b(true|false|null)\b/g, '<span class="text-orange-400">$1</span>')
                      .replace(/(\{|\}|\(|\)|\[|\])/g, '<span class="text-yellow-400">$1</span>')
                      + '<span class="animate-pulse bg-white w-0.5 h-5 inline-block ml-0.5">|</span>'
                  }}
                />
              </pre>
            </div>
          </div>
          
          {/* Status Bar */}
          <div className="h-6 bg-blue-600 flex items-center justify-between px-4 text-xs text-white">
            <div className="flex items-center space-x-4">
              <span>JavaScript React</span>
              <span>UTF-8</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Ln {typedCode.split('\n').length}, Col {typedCode.split('\n').pop()?.length || 0}</span>
              <span>100%</span>
            </div>
          </div>
        </div>
        
        {/* Video Controls */}
        <div className="relative">
          {/* Progress Bar - positioned at top of controls */}
          <div className="absolute -top-1 left-0 right-0 px-4 z-10">
            <div className="w-full bg-white bg-opacity-20 h-1 cursor-pointer group relative">
              {/* Progress line that stops at the seeker head */}
              <div 
                className="h-full bg-white transition-all duration-100 ease-linear" 
                style={{ 
                  width: `${Math.min(progressPercentage, 100)}%`,
                  maxWidth: `calc(${progressPercentage}% - 8px)`
                }} 
              />
              {/* Seeker Handle with Timer */}
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-100 ease-linear" 
                style={{ 
                  left: `${Math.min(progressPercentage, 100)}%`,
                  transform: 'translateY(-50%) translateX(-50%)'
                }}
              >
                <div className="w-4 h-4 bg-white rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform" />
                {/* Moving Timer Below Handle */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                  {formatTime(currentTime)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Control Bar */}
          <div className="bg-black bg-opacity-80 backdrop-blur-sm px-4 py-3">
            <div className="flex items-center justify-between text-white">
              {/* Left Controls */}
              <div className="flex items-center space-x-4">
                <button 
                  className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-all"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    // Pause Icon
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    // Play Icon
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
                
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-white hover:bg-opacity-10 rounded transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3z"/>
                    </svg>
                  </button>
                  <div className="w-16 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-white rounded-full" />
                  </div>
                </div>
                
                <span className="text-sm text-white text-opacity-60">{formatTime(totalDuration)}</span>
              </div>
              
              {/* Right Controls */}
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Chat Sidebar */}
      <div className="w-[400px] h-[500px] bg-gray-900 rounded-lg overflow-hidden border border-gray-700 flex flex-col">
        {/* Agent Tabs */}
        <div className="h-12 bg-gray-800 flex border-b border-gray-700">
          <div className="flex-1 flex items-center justify-center bg-blue-600 text-white text-sm font-medium cursor-pointer transition-colors hover:bg-blue-700">
            🧠 Alex
          </div>
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm font-medium cursor-pointer transition-colors hover:bg-gray-700 hover:text-white border-l border-gray-700">
            ⚡ Emma
          </div>
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm font-medium cursor-pointer transition-colors hover:bg-gray-700 hover:text-white border-l border-gray-700">
            💡 Carl
          </div>
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm font-medium cursor-pointer transition-colors hover:bg-gray-700 hover:text-white border-l border-gray-700">
            📊 Penny
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 bg-gray-900 p-4 overflow-y-auto">
          <div className="text-center text-gray-500 mt-8">
            <div className="text-4xl mb-2">🧠</div>
            <p className="text-sm">Alex - Learning Assistant</p>
            <p className="text-xs text-gray-600 mt-1">Monitoring your learning progress</p>
          </div>
          
          {/* Sample AI Message */}
          <div className="mt-6 bg-blue-600 bg-opacity-20 border border-blue-600 border-opacity-30 rounded-lg p-3">
            <div className="flex items-start space-x-3">
              <span className="text-lg">🧠</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-blue-400 mb-1">Alex</div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  I notice you're watching a React tutorial. This Todo app example covers useState hooks and state management - key concepts for React development!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat Input */}
        <div className="h-14 bg-gray-800 border-t border-gray-700 p-3">
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Ask Alex about React..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm text-white transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}