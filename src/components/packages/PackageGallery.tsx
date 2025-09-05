'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PackageGalleryProps {
  mainImage: string;
  gallery: string[];
  title: string;
}

const PackageGallery = ({ mainImage, gallery, title }: PackageGalleryProps) => {
  const [activeImage, setActiveImage] = useState(mainImage);

  const allImages = [mainImage, ...gallery.filter(img => img !== mainImage)].slice(0, 5); // Max 5 images

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-video w-full rounded-lg overflow-hidden">
        <Image
          key={activeImage} // Force re-render on change for animation
          src={activeImage}
          alt={`Main view for ${title}`}
          fill
          className="object-cover animate-in fade-in-25"
          data-ai-hint="travel landscape"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {allImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(img)}
            className={cn(
              'relative aspect-square w-full rounded-md overflow-hidden transition-all',
              'ring-offset-background ring-offset-2 focus:ring-2 focus:ring-primary',
              activeImage === img ? 'ring-2 ring-primary' : 'hover:opacity-80'
            )}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1} for ${title}`}
              fill
              className="object-cover"
              data-ai-hint="travel people"
              sizes="10vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PackageGallery;
