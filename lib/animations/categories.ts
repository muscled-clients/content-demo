export interface SlideInfo {
  id: number;
  name: string;
  description: string;
  duration?: string;
  tags?: string[];
  recordingTips?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  slides: SlideInfo[];
}

export const categories: Category[] = [
  {
    id: 'claude-code',
    name: 'Claude Code Animations',
    description: 'AI assistant interactions and terminal animations',
    icon: '🤖',
    color: 'from-blue-500 to-purple-500',
    slides: [
      {
        id: 1,
        name: 'Title Card',
        description: 'Animated Claude Code logo with gradient text',
        duration: '2s',
        tags: ['intro', 'logo', 'branding'],
        recordingTips: 'Record after initial animation completes for clean loop'
      },
      {
        id: 2,
        name: 'Terminal Input',
        description: 'Typing animation in terminal window',
        duration: '3s',
        tags: ['terminal', 'typing', 'input'],
        recordingTips: 'Wait for full typing sequence before recording'
      },
      {
        id: 3,
        name: 'Response Types',
        description: 'Multiple response formats with sidebar selector',
        duration: '2-4s',
        tags: ['response', 'output', 'interactive'],
        recordingTips: 'Record each response type separately for flexibility'
      }
    ]
  },
  {
    id: 'box-animations',
    name: 'Box Animations',
    description: 'Tool reveals and feature showcases with gradient borders',
    icon: '📦',
    color: 'from-pink-500 to-yellow-500',
    slides: [
      {
        id: 4,
        name: 'Single Box',
        description: 'GitHub box with animated gradient border',
        duration: '1s',
        tags: ['reveal', 'single', 'tool'],
        recordingTips: 'Capture the entrance animation and steady state'
      },
      {
        id: 5,
        name: 'Two Boxes',
        description: 'Progressive reveal: GitHub + Claude Code',
        duration: '1.5s',
        tags: ['progressive', 'dual', 'tools'],
        recordingTips: 'Focus on the new box animation'
      },
      {
        id: 6,
        name: 'Three Boxes',
        description: 'Three tools with staggered reveal',
        duration: '2s',
        tags: ['progressive', 'triple', 'tools'],
        recordingTips: 'Ensure all gradient borders are visible'
      },
      {
        id: 7,
        name: 'Complete Toolkit',
        description: 'All four tools with final reveal',
        duration: '2s',
        tags: ['complete', 'toolkit', 'tools'],
        recordingTips: 'Record with all animations settled'
      }
    ]
  },
  {
    id: 'title-animations',
    name: 'Title Animations',
    description: 'Impactful text reveals for hooks and CTAs',
    icon: '✨',
    color: 'from-green-500 to-blue-500',
    slides: [
      {
        id: 8,
        name: 'Word Slap',
        description: 'Words appear with spring animation',
        duration: '2.5s',
        tags: ['text', 'impact', 'word-by-word'],
        recordingTips: 'Start recording just before animation begins'
      },
      {
        id: 9,
        name: 'Letter Wave',
        description: 'Letters fade in with blur effect',
        duration: '3s',
        tags: ['text', 'smooth', 'letter-by-letter'],
        recordingTips: 'Capture the full wave effect from start to finish'
      },
      {
        id: 10,
        name: 'Typewriter',
        description: 'Classic typewriter with blinking cursor',
        duration: '2s',
        tags: ['classic', 'cursor', 'linear'],
        recordingTips: 'Start recording before typing begins, includes cursor blink'
      },
      {
        id: 11,
        name: 'Glitch Effect',
        description: 'Digital glitch with color channel splits',
        duration: '3s',
        tags: ['glitch', 'digital', 'tech'],
        recordingTips: 'Capture full glitch cycle including color displacement'
      }
    ]
  }
];