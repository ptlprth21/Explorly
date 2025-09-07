
'use client';

import React, { useState, useEffect } from 'react';
import { Search, Shuffle, MapPin, Star, Clock, Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Package, Country } from '@/types';
import { searchPackages } from '@/lib/data';
import { getCountries } from '@/lib/data';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { slugify } from '@/lib/utils';

export default function GlobalSearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Package[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
      const fetchCountries = async () => {
          const countryData = await getCountries();
          setCountries(countryData);
      }
      fetchCountries();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      if (searchTerm.length < 2) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setLoading(true);
      try {
        const results = await searchPackages(searchTerm);
        setSearchResults(results);
        setShowResults(results.length > 0);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSurpriseMe = () => {
    if (countries.length === 0) return;
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    router.push(`/country/${slugify(randomCountry.name)}`);
  };

  const handlePackageSelect = (pkg: Package) => {
    router.push(`/packages/${pkg.id}`);
    setShowResults(false);
    setSearchTerm('');
  };

  return (
    <div className="relative max-w-2xl mx-auto px-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
        <Input
          type="text"
          placeholder="Search destinations, experiences..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowResults(searchTerm.length > 0 && searchResults.length > 0)}
          className="w-full pl-12 sm:pl-14 pr-4 py-3 sm:py-4 lg:py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 text-base sm:text-lg lg:text-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent focus:bg-white/20 transition-all"
        />
        
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          </div>
        )}
      </div>

      {/* Search Results */}
      {showResults && searchResults.length > 0 && (
        <div 
            className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden z-50 max-h-80 overflow-y-auto"
            onMouseLeave={() => setShowResults(false)}
        >
          {searchResults.slice(0, 8).map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => handlePackageSelect(pkg)}
              className="w-full px-4 py-4 text-left hover:bg-white/10 transition-colors flex items-center space-x-4 border-b border-white/10 last:border-b-0"
            >
              <Image 
                src={pkg.image} 
                alt={pkg.title}
                width={48}
                height={48}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="font-medium text-white text-sm">{pkg.title}</div>
                <div className="text-xs text-gray-400 flex items-center space-x-2">
                  <span>{pkg.destination}</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{pkg.duration} Days</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span>{pkg.rating}</span>
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-teal-400 font-bold text-sm">€{pkg.price}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
        <Button
            onClick={handleSurpriseMe}
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
  );
}
