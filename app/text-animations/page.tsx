'use client';

import { useRouter } from 'next/navigation';
import TextShowcase from '../../components/slides/TextShowcase';

export default function TextAnimationsPage() {
  const router = useRouter();

  const handleSlideSelect = (slideIndex: number) => {
    router.push(`/?slide=${slideIndex}`);
  };

  return <TextShowcase onSlideSelect={handleSlideSelect} />;
}