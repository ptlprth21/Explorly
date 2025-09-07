
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';
import type { Country, Package } from '@/types';
import { slugify } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CountrySpotlightProps {
  country: Country;
  packages: Package[];
}

export default function CountrySpotlight({ country, packages }: CountrySpotlightProps) {
  const countryPackages = packages.filter(pkg => pkg.country === country.name).slice(0, 3);

  if (!country) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-neutral-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl sm:text-3xl">{country.flag}</span>
            <span className="text-purple-400 font-medium text-sm uppercase tracking-wider">This Month's Featured Country</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Discover {country.name}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {country.culture}
          </p>
        </div>

        {/* Hero Image with Overlay */}
        <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden mb-12 sm:mb-16 group">
           <Link href={`/country/${slugify(country.name)}`}>
            <Image
                src={country.heroImage}
                alt={country.name}
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
            {/* Country Info Overlay */}
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 text-white">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{country.name}</h3>
                <p className="text-base sm:text-lg text-gray-200 mb-4">{country.tagline}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div>
                    <div className="text-teal-400 font-semibold">Best Time</div>
                    <div>{country.bestTime}</div>
                </div>
                <div>
                    <div className="text-teal-400 font-semibold">Currency</div>
                    <div>{country.currency}</div>
                </div>
                <div className="hidden sm:block">
                    <div className="text-teal-400 font-semibold">Language</div>
                    <div>{country.language}</div>
                </div>
                </div>
            </div>

            {/* Explore Button */}
            <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8">
                <Button asChild size="lg" className="bg-teal-500/90 hover:bg-teal-400 text-white font-semibold transition-colors">
                    <Link href={`/country/${slugify(country.name)}`}>
                        <span>Explore {country.name}</span>
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                    </Link>
                </Button>
            </div>
           </Link>
        </div>

        {/* Top 3 Packages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {countryPackages.map((pkg, index) => (
            <Link href={`/packages/${pkg.id}`} key={pkg.id} className="group block">
                <div className="group relative bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-teal-400/10 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden">
                    <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    <div className="absolute top-3 left-3 w-6 h-6 sm:w-8 sm:h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                    {index + 1}
                    </div>
                </div>
                
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-teal-300 transition-colors flex-grow">
                    {pkg.title}
                    </h4>
                    <div className="flex items-center justify-between text-sm mt-auto">
                    <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                        <span className="text-neutral-300">{pkg.rating}</span>
                    </div>
                    <div className="text-teal-400 font-bold">${pkg.price.toLocaleString()}</div>
                    </div>
                </div>
                </div>
            </Link>
          ))}
        </div>

        {/* See All Tours CTA */}
        <div className="text-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 text-white font-semibold transition-all duration-300 transform hover:scale-105 rounded-2xl px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg">
                <Link href={`/country/${slugify(country.name)}`}>
                    <span>See All Tours in {country.name}</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
