'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import TextShowcase from '@/components/slides/TextShowcase';
import ClaudeShowcase from '@/components/slides/ClaudeShowcase';
import BoxShowcase from '@/components/slides/BoxShowcase';
import NumbersShowcase from '@/components/slides/NumbersShowcase';
import PromptDisplaySlide from '@/components/slides/PromptDisplaySlide';
import { GoogleSearchSlide } from '@/components/slides/GoogleSearchSlide';
import { VideoUploadPatternSlide } from '@/components/slides/VideoUploadPatternSlide';
import SixthSlide from '@/components/slides/SixthSlide';
import { ClaudeCodePromptLibrary } from '@/components/slides/ClaudeCodePromptLibrary';
import PreviewSlide from '@/components/slides/PreviewSlide';
import Slideshow from '@/components/Slideshow';

function HomeContent() {
  const searchParams = useSearchParams();
  const slideParam = searchParams.get('slide');
  
  // If slide parameter exists, show the slideshow
  if (slideParam !== null) {
    return <Slideshow />;
  }

  // Otherwise show the overview page
  const slides = [
    { name: 'First Slide', route: '/start', description: 'Main slideshow presentation', preview: <PreviewSlide onSlideSelect={() => {}} /> },
    { name: 'Unpuzzle Animation', route: '/unpuzzle-animation', description: 'AI learning assistant video player', preview: <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xs">🤖 AI Video Learning</div> },
    { name: 'Text Animations', route: '/text-animations', description: 'Text effects and animations', preview: <TextShowcase onSlideSelect={() => {}} /> },
    { name: 'Claude Animations', route: '/claude-animations', description: 'Claude-themed animations', preview: <ClaudeShowcase onSlideSelect={() => {}} /> },
    { name: 'Box Animations', route: '/box-animations', description: 'Box and container animations', preview: <BoxShowcase onSlideSelect={() => {}} /> },
    { name: 'Numbers & Graphs', route: '/numbers-graphs', description: 'Data visualization and counters', preview: <NumbersShowcase onSlideSelect={() => {}} /> },
    { name: 'Prompt Display', route: '/prompt-display', description: 'Prompt input/output display', preview: <PromptDisplaySlide /> },
    { name: 'Google Search', route: '/google-search', description: 'Search interface animation', preview: <GoogleSearchSlide /> },
    { name: 'Video Upload Pattern', route: '/video-upload-pattern', description: 'File upload flow', preview: <VideoUploadPatternSlide /> },
    { name: 'Slide 19', route: '/slide-19', description: 'Special slide presentation', preview: <SixthSlide /> },
    { name: 'Prompt Library', route: '/prompt-library', description: 'Claude Code prompt library', preview: <ClaudeCodePromptLibrary /> },
  ];

  const components = [
    { name: 'Todo Response', description: 'Todo list display component' },
    { name: 'Code Diff Response', description: 'Code diff visualization' },
    { name: 'Text Response', description: 'Text output display' },
  ];

  return (
    <div className="h-screen bg-black text-white p-4 overflow-y-auto">
      <div className="max-w-6xl mx-auto pb-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Slideshow App Overview</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">🎬 Slide Routes</h2>
            <div className="grid gap-6">
              {slides.map((slide, index) => (
                <Link key={index} href={slide.route} className="group">
                  <div className="bg-gray-900 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-200 hover:bg-gray-800 overflow-hidden">
                    <div className="h-32 bg-black border-b border-gray-700 relative overflow-hidden">
                      <div className="absolute inset-0 transform scale-[0.15] origin-top-left pointer-events-none">
                        {slide.preview}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg group-hover:text-blue-400 transition-colors">
                        {slide.name}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">{slide.description}</p>
                      <p className="text-blue-500 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {slide.route}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-green-400">🧩 Response Components</h2>
            <div className="grid gap-4">
              {components.map((component, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <h3 className="font-semibold text-lg">{component.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{component.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">📁 Key Directories</h3>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <ul className="space-y-2 text-sm">
                  <li><code className="text-blue-300">/components/slides/</code> - 27+ slide components</li>
                  <li><code className="text-green-300">/components/responses/</code> - Response type components</li>
                  <li><code className="text-yellow-300">/app/*/</code> - 10 route pages</li>
                  <li><code className="text-purple-300">/docs/</code> - Documentation & sessions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex gap-4 flex-wrap">
            <Link href="/start" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors">
              Start Presentation
            </Link>
            <a href="/?slide=1" className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-medium transition-colors">
              Original Slideshow
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}