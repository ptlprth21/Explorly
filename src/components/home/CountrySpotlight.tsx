
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
}

export default function CountrySpotlight({ country }: CountrySpotlightProps) {

  if (!country) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl sm:text-3xl">{country.flag}</span>
            <span className="text-accent font-medium text-sm uppercase tracking-wider">This Month's Featured Country</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Discover {country.name}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {country.culture}
          </p>
        </div>

        {/* Hero Image with Overlay */}
        <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden mb-12 sm:mb-16 group">
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
                  <div className="text-primary font-semibold">Best Time</div>
                  <div>{country.bestTime}</div>
              </div>
              <div>
                  <div className="text-primary font-semibold">Currency</div>
                  <div>{country.currency}</div>
              </div>
              <div className="hidden sm:block">
                  <div className="text-primary font-semibold">Language</div>
                  <div>{country.language}</div>
              </div>
              </div>
          </div>

          {/* Explore Button */}
          <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8">
              <Button asChild size="lg" className="bg-primary/90 hover:bg-primary/80 text-primary-foreground font-semibold transition-colors max-sm:px-2 max-sm:py-2">
                  <Link href={`/country/${slugify(country.name)}`}>
                      <span className="hidden sm:inline">Explore {country.name}</span>
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 max-sm:ml-0" />
                  </Link>
              </Button>
          </div>
        </div>

        {/* See All Tours CTA */}
        <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 transform hover:scale-105 rounded-2xl px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg">
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
