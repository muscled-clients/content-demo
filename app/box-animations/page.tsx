'use client';

import { useRouter } from 'next/navigation';
import BoxShowcase from '../../components/slides/BoxShowcase';

export default function BoxAnimationsPage() {
  const router = useRouter();

  const handleSlideSelect = (slideIndex: number) => {
    router.push(`/?slide=${slideIndex}`);
  };

  return <BoxShowcase onSlideSelect={handleSlideSelect} />;
}