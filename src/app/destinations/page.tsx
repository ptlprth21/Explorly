
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import type { Package } from '@/types';
import { getPackages } from '@/lib/data';
import PackageGrid from '@/components/packages/PackageGrid';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function DestinationsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [allPackages, setAllPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const selectedDestination = searchParams.get('destination') || '';

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const packagesData = await getPackages();
      setAllPackages(packagesData);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const destinations = useMemo(() => Array.from(new Set(allPackages.map(pkg => pkg.destination))), [allPackages]);
  
  const filteredPackages = useMemo(() => {
    if (!selectedDestination) {
      return allPackages;
    }
    return allPackages.filter(pkg => pkg.destination === selectedDestination);
  }, [allPackages, selectedDestination]);

  const handleDestinationChange = (destination: string) => {
    const params = new URLSearchParams(searchParams);
    if (destination) {
      params.set('destination', destination);
    } else {
      params.delete('destination');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-neutral-900" id="destinations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            DISCOVER THE WORLD
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our handpicked destinations and embark on extraordinary journeys
          </p>
        </div>

        {/* Destination Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => handleDestinationChange('')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedDestination === ''
                ? 'bg-primary text-primary-foreground'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            All Destinations
          </button>
          {destinations.map(destination => (
            <button
              key={destination}
              onClick={() => handleDestinationChange(destination)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedDestination === destination
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {destination}
            </button>
          ))}
        </div>

        <PackageGrid packages={filteredPackages} isLoading={isLoading} />
      </div>
    </section>
  );
}
