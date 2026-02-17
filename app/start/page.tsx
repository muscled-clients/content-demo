'use client';

import PreviewSlide from '@/components/slides/PreviewSlide';

export default function StartPage() {
  const handleSlideSelect = (slideId: number) => {
    // Navigate to the specific slide route
    window.location.href = `/?slide=${slideId}`;
  };

  return <PreviewSlide onSlideSelect={handleSlideSelect} />;
}