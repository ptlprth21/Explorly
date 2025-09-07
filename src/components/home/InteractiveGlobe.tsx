
'use client';

import React from 'react';
import type { Country } from '@/types';

interface InteractiveGlobeProps {
  onCountrySelect: (country: Country) => void;
}

// This is a placeholder component.
// You can replace this with your actual interactive globe implementation.
export default function InteractiveGlobe({ onCountrySelect }: InteractiveGlobeProps) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-900/20 rounded-2xl border border-neutral-800/50">
      <div className="text-center p-8">
        <div className="text-5xl mb-4">🌍</div>
        <h3 className="text-xl font-bold text-white mb-2">Interactive Globe Placeholder</h3>
        <p className="text-neutral-400">
          Your interactive globe component will be rendered here.
        </p>
      </div>
    </div>
  );
}
