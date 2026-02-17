'use client';

import { useRouter } from 'next/navigation';
import ClaudeShowcase from '../../components/slides/ClaudeShowcase';

export default function ClaudeAnimationsPage() {
  const router = useRouter();

  const handleSlideSelect = (slideIndex: number) => {
    router.push(`/?slide=${slideIndex}`);
  };

  return <ClaudeShowcase onSlideSelect={handleSlideSelect} />;
}