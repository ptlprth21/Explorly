'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import type { Country, GlobalStats, Package } from '@/types';
import { getCountries, getPackages } from '@/lib/data';
import { slugify } from '@/lib/utils';
import Container from '../ui/Container';
import GlobalSearch from './GlobalSearch';
import Image from 'next/image';

interface GlobalHeroProps {
  stats: GlobalStats;
  countries: Country[];
  packages: Package[];
}

export default function Hero() {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [stats, setStats] = useState<GlobalStats | null>(null);

  const [animatedStats, setAnimatedStats] = useState({
    countries: 0,
    packages: 0,
    travelers: 0,
    rating: 0
  });

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
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-teal-400/30 border-t-teal-400 rounded-full animate-spin mb-4"></div>
                <p className="text-white text-lg">Loading Your Adventure...</p>
            </div>
        </div>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <Image 
          src="https://picsum.photos/seed/interactive-globe/1920/1080"
          alt="Breathtaking landscape"
          fill
          className="object-cover"
          data-ai-hint="epic landscape"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/50 via-neutral-900/70 to-purple-900/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(45,212,191,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-400/60 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400/60 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-teal-300/60 rounded-full animate-ping"></div>
        
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
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-extrabold leading-tight mb-4 sm:mb-6 bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent px-4">
          Explore the World,
          <span className="block bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            One Trip at a Time
          </span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
          {animatedStats.countries}+ countries · {animatedStats.packages}+ curated trips · endless memories
        </p>

        {/* Search Section */}
        <GlobalSearch />

        {/* Animated Global Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4 mt-12">
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-400 mb-1">
              🌍 {animatedStats.countries}+
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Countries</div>
          </div>
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-400 mb-1">
              🏞️ {animatedStats.packages}+
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Packages</div>
          </div>
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-400 mb-1">
              ❤️ {(animatedStats.travelers / 1000).toFixed(0)}K
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Happy Travelers</div>
          </div>
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-400 mb-1">
              ⭐ {(animatedStats.rating / 10).toFixed(1)}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Average Rating</div>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/70 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
