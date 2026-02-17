'use client';

import { useRouter } from 'next/navigation';
import NumbersShowcase from '../../components/slides/NumbersShowcase';

export default function NumbersGraphsPage() {
  const router = useRouter();

  const handleSlideSelect = (slideIndex: number) => {
    router.push(`/?slide=${slideIndex}`);
  };

  return <NumbersShowcase onSlideSelect={handleSlideSelect} />;
}