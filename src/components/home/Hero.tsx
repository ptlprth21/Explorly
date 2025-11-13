

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import type { Country, GlobalStats, Package } from '@/types';
import { getCountries, getPackages } from '@/lib/data';
import { slugify } from '@/lib/utils';
import Container from '../ui/Container';
import GlobalSearch from './GlobalSearch';
import Image from 'next/image';
import { cn } from '@/lib/utils';


const slideshowImages = [
  { src: "https://picsum.photos/seed/himalayas-mountain-range/1920/1080", alt: "Breathtaking panoramic view of the Himalayas", hint: "himalayas mountains" },
  { src: "https://picsum.photos/seed/amalfi-coast-italy/1920/1080", alt: "Vibrant cliffside village on the Amalfi Coast, Italy", hint: "italy coast" },
  { src: "https://picsum.photos/seed/wadi-rum-jordan/1920/1080", alt: "Dramatic red desert landscape of Wadi Rum, Jordan", hint: "jordan desert" },
  { src: "https://picsum.photos/seed/new-zealand-mountains/1920/1080", alt: "Snow-capped mountains reflecting in a crystal clear lake in New Zealand", hint: "new zealand mountains" },
];

export default function Hero() {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [animatedStats, setAnimatedStats] = useState({
    countries: 0,
    packages: 0,
    travelers: 0,
    rating: 0
  });

   useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const countryData = await getCountries();
      const packageData = await getPackages();
      setCountries(countryData);
      setPackages(packageData);
      
      const totalReviews = packageData.reduce((acc, pkg) => acc + pkg.reviewCount, 0);
      const totalRating = packageData.reduce((acc, pkg) => acc + (pkg.rating * pkg.reviewCount), 0);
      
      const calculatedStats: GlobalStats = {
        countries: countryData.length,
        packages: packageData.length,
        happyTravelers: totalReviews, 
        averageRating: totalRating / totalReviews || 0
      };
      setStats(calculatedStats);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!stats) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const animate = (target: number, key: keyof typeof animatedStats) => {
      let current = 0;
      const increment = target / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, stepDuration);
      return () => clearInterval(timer);
    };

    const traveleresInK = Math.round(stats.happyTravelers / 1000 * 10) / 10;
    animate(stats.countries, 'countries');
    animate(stats.packages, 'packages');
    animate(stats.happyTravelers, 'travelers');
    animate(stats.averageRating * 10, 'rating');
    
  }, [stats]);

  const handleCountrySelect = (country: Country) => {
    router.push(`/country/${slugify(country.name)}`);
  };

  if (!stats) {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-muted-foreground text-lg">Loading Your Adventure...</p>
            </div>
        </div>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Slideshow */}
      <div className="absolute inset-0">
        {slideshowImages.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            className={cn(
              "object-cover transition-opacity duration-1000 ease-in-out",
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            )}
            data-ai-hint={image.hint}
            priority={index === 0}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Headlines */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-extrabold leading-tight mb-4 sm:mb-6 text-foreground px-4">
          Explore the World,
          <span className="block text-primary">
            One Trip at a Time
          </span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
          {animatedStats.countries}+ countries · {animatedStats.packages}+ curated trips · endless memories
        </p>

        {/* Search Section */}
        <GlobalSearch />

        {/* Animated Global Stats */}
        {/* Previous style for 4 elements */}
        {/* "grid grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4 mt-12" */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4 mt-12">
          <div className="text-center bg-card/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-border">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1">
              🌍 {animatedStats.countries}+
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Countries</div>
          </div>
          <div className="text-center bg-card/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-border">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1">
              🏞️ {animatedStats.packages}+
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Packages</div>
          </div>
          {/* <div className="text-center bg-card/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-border">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1">
              ❤️ {(animatedStats.travelers / 1000).toFixed(0)}K
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Happy Travelers</div>
          </div>
          <div className="text-center bg-card/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-border">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1">
              ⭐ {(animatedStats.rating / 10).toFixed(1)}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Average Rating</div>
          </div> */}
        </div>
      </div>
      
      {/* Slideshow Dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slideshowImages.map((_, index) => (
            <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    currentImageIndex === index ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white'
                )}
                aria-label={`Go to slide ${index + 1}`}
            />
        ))}
       </div>
    </section>
  );
}
