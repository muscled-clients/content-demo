import PromptDisplaySlide from '@/components/slides/PromptDisplaySlide'

export default function PromptDisplayPage() {
  const samplePrompt = `Create a modern dashboard with React and Tailwind CSS.
Include a sidebar navigation, header with user profile,
and main content area with cards showing key metrics.
Add smooth animations and make it fully responsive.
Use a dark theme with blue accent colors.`

  return <PromptDisplaySlide prompt={samplePrompt} />
}