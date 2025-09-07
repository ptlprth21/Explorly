
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Shuffle, ArrowRight, TrendingUp } from 'lucide-react';
import type { Country, GlobalStats, Package } from '@/types';
import InteractiveGlobe from './InteractiveGlobe';
import { getCountries, getPackages } from '@/lib/data';
import { slugify } from '@/lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Container from '../ui/Container';

interface GlobalHeroProps {
  stats: GlobalStats;
  countries: Country[];
  packages: Package[];
}

export default function Hero() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
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

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountrySelect = (country: Country) => {
    setSearchTerm('');
    setShowSuggestions(false);
    router.push(`/country/${slugify(country.name)}`);
  };

  const onRandomCountry = () => {
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    handleCountrySelect(randomCountry);
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
      {/* Animated Background with Globe */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 via-neutral-900/50 to-purple-900/30"></div>
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
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rotating Globe */}
        <div className="mb-8 sm:mb-12 flex justify-center">
          <div className="w-full max-w-4xl h-[300px] sm:h-[400px] lg:h-[500px] relative">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center bg-neutral-900/20 rounded-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-teal-400/30 border-t-teal-400 rounded-full animate-spin mb-4"></div>
                  <p className="text-white text-lg">Loading Interactive Globe...</p>
                </div>
              </div>
            }>
              <InteractiveGlobe 
                onCountrySelect={handleCountrySelect}
              />
            </Suspense>
          </div>
        </div>

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
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
              <Input
                type="text"
                placeholder="Where do you want to go?"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                className="w-full pl-12 sm:pl-14 pr-4 py-3 sm:py-4 lg:py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 text-base sm:text-lg lg:text-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent focus:bg-white/20 transition-all"
              />
            </div>

            {/* Search Suggestions */}
            {showSuggestions && filteredCountries.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden z-50 max-h-60 overflow-y-auto">
                {filteredCountries.slice(0, 5).map((country) => (
                  <button
                    key={country.name}
                    onClick={() => handleCountrySelect(country)}
                    className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center space-x-3"
                  >
                    <span className="text-xl sm:text-2xl">{country.flag}</span>
                    <div>
                      <div className="font-medium text-white text-sm sm:text-base">{country.name}</div>
                      <div className="text-xs sm:text-sm text-gray-400">{country.tagline}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
            <Button
              onClick={onRandomCountry}
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 text-white font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <Shuffle className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Surprise Me</span>
            </Button>
            <Button
              onClick={() => router.push('/destinations')}
              size="lg"
              variant="outline"
              className="border-2 border-white/30 backdrop-blur-sm text-white font-semibold hover:bg-white/10"
            >
              <span>Explore Tours</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>

        {/* Animated Global Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4">
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

        {/* Trending Now Badge */}
        <div className="mt-8 sm:mt-12 flex justify-center">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-400/30 rounded-full px-4 sm:px-6 py-2 sm:py-3">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
            <span className="text-orange-300 font-medium text-sm sm:text-base">Trending: Japan Cherry Blossom Season</span>
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

