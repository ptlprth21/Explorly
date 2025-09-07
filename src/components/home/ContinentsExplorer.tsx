
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, MapPin, Compass } from 'lucide-react';
import type { Continent } from '@/types';
import { getContinents } from '@/lib/data';
import Image from 'next/image';

export default function ContinentsExplorer() {
  const router = useRouter();
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);
  const [continents, setContinents] = useState<Continent[]>([]);

  useEffect(() => {
    const fetchContinents = async () => {
      const continentsData = await getContinents();
      // Add emoji and description to the fetched data.
      const enrichedData = continentsData.map(c => {
        switch (c.name) {
            case 'Europe': return {...c, emoji: '🏰', description: 'Historic cities, alpine adventures, and cultural treasures'};
            case 'Asia': return {...c, emoji: '🏯', description: 'Ancient traditions, modern cities, and spiritual journeys'};
            case 'Africa': return {...c, emoji: '🦁', description: 'Safari adventures, diverse cultures, and natural wonders'};
            case 'North America': return {...c, emoji: '🗽', description: 'From ancient ruins to modern metropolises'};
            case 'South America': return {...c, emoji: '💃', description: 'Vibrant cultures, ancient ruins, and stunning landscapes'};
            case 'Australia': return {...c, emoji: '🏄‍♂️', description: 'Tropical paradises and unique wildlife experiences'};
            default: return {...c, emoji: '❄️', description: 'The last frontier of pristine icy wilderness'};
        }
      });
      setContinents(enrichedData);
    }
    fetchContinents();
  }, []);

  const handleContinentClick = (continentName: string) => {
    router.push(`/destinations?continent=${continentName}`);
  };

  return (
    <section id="continents" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Compass className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <span className="text-primary font-medium text-sm sm:text-base uppercase tracking-wider">Explore by Continent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 px-4">
            Choose Your
            <span className="block text-primary">
              Adventure
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            From ancient civilizations to pristine wilderness, discover your perfect destination
          </p>
        </div>

        {/* Continents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {continents.map((continent) => (
            <div
              key={continent.name}
              onMouseEnter={() => setHoveredContinent(continent.name)}
              onMouseLeave={() => setHoveredContinent(null)}
              onClick={() => handleContinentClick(continent.name)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl h-64 sm:h-72 lg:h-80 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={continent.image}
                  alt={continent.name}
                  data-ai-hint={continent.dataAiHint}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 text-white">
                {/* Top Section */}
                <div className="flex justify-between items-start">
                  <div className="text-3xl sm:text-4xl lg:text-5xl">{continent.emoji}</div>
                </div>

                {/* Bottom Section */}
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {continent.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed">
                    {continent.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Destinations waiting</span>
                    </div>
                    
                    <div className={`flex items-center space-x-2 transition-all duration-300 ${
                      hoveredContinent === continent.name ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}>
                      <span className="text-sm font-semibold text-primary">Explore</span>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl sm:rounded-3xl transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Interactive Map Teaser */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Explore All Destinations
            </h3>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
              Click the button to see all our curated travel experiences.
            </p>
            <button 
              onClick={() => router.push('/destinations')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition-colors text-sm sm:text-base"
            >
              <span>Explore All Destinations</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
