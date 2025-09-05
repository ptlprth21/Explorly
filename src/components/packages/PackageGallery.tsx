'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react'


interface PackageGalleryProps {
  mainImage: string;
  gallery: string[];
  title: string;
}

const PackageGallery = ({ mainImage, gallery, title }: PackageGalleryProps) => {
  const [isClient, setIsClient] = useState(false);
  const [emblaRef] = useEmblaCarousel()

  useEffect(() => {
    setIsClient(true);
  }, []);

  const allImages = [mainImage, ...gallery.filter(img => img !== mainImage)].slice(0, 5); // Max 5 images

  if (!isClient) {
    // Render a static placeholder on the server
    return (
        <div className="relative aspect-video w-full rounded-lg overflow-hidden">
            <Image
                src={mainImage}
                alt={`Main view for ${title}`}
                fill
                className="object-cover"
                data-ai-hint="travel landscape"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
    );
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {allImages.map((img, index) => (
          <CarouselItem key={index}>
            <div className="relative aspect-video w-full rounded-lg overflow-hidden">
              <Image
                src={img}
                alt={`View ${index + 1} for ${title}`}
                fill
                className="object-cover"
                data-ai-hint="travel landscape"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
    </Carousel>
  );
};

export default PackageGallery;
