
'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Star } from 'lucide-react';
import type { Country, Continent, Theme, Package } from '@/types';
import { getCountries, getContinents, getThemes, getPackages } from '@/lib/data';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import Image from 'next/image';

export default function DestinationsPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [continents, setContinents] = useState<Continent[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);

  const [selectedContinent, setSelectedContinent] = useState('all');
  const [selectedTheme, setSelectedTheme] = useState('all');

  useEffect(() => {
    const loadData = async () => {
        const [countriesData, continentsData, themesData, packagesData] = await Promise.all([
            getCountries(),
            getContinents(),
            getThemes(),
            getPackages()
        ]);
        setCountries(countriesData);
        
        // Add 'all' option to continents
        const allContinentsOption: Continent = { name: 'All', image: '', dataAiHint: '' };
        setContinents([allContinentsOption, ...continentsData]);

        setThemes(themesData);
        setPackages(packagesData);
    };
    loadData();
  }, []);

  const getPackagesForCountry = (countryName: string) => {
    return packages.filter(p => p.country === countryName);
  }

  const filteredCountries = countries.filter(country => {
    const continentMatch = selectedContinent === 'all' || country.continent === selectedContinent;
    const countryPackages = getPackagesForCountry(country.name);
    const themeMatch = selectedTheme === 'all' || countryPackages.some(p => p.theme === selectedTheme);
    return continentMatch && themeMatch;
  });

  return (
    <section id="destinations" className="py-20 bg-gradient-to-b from-neutral-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4">
            Choose Your Next
            <span className="block bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Adventure
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            From ancient civilizations to pristine wilderness, discover your perfect destination
          </p>
        </div>

        {/* Continent Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-4">
          {continents.map(continent => (
            <button
              key={continent.name}
              onClick={() => setSelectedContinent(continent.name === 'All' ? 'all' : continent.name)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                (selectedContinent === continent.name || (selectedContinent === 'all' && continent.name === 'All'))
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              {continent.name}
            </button>
          ))}
        </div>

        {/* Theme Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16 px-4">
          {themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                selectedTheme === theme.id
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              <span>{theme.icon}</span>
              <span>{theme.name}</span>
            </button>
          ))}
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4">
          {filteredCountries.map((country) => {
            const countryPackages = getPackagesForCountry(country.name);
            const packageCount = countryPackages.length;
            const avgRating = packageCount > 0 ? (countryPackages.reduce((acc, p) => acc + p.rating, 0) / packageCount).toFixed(1) : 'N/A';

            return (
              <Link href={`/country/${slugify(country.name)}`} key={country.name} className="group block">
                <div
                  className="relative cursor-pointer overflow-hidden rounded-2xl h-64 sm:h-72 lg:h-80 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-teal-400/20"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={country.heroImage}
                      alt={country.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  </div>

                  {/* Content Overlay */}
                  <div className="relative h-full flex flex-col justify-between p-4 sm:p-6 text-white">
                    {/* Top Section */}
                    <div className="flex justify-between items-start">
                      <div className="bg-black/40 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full border border-white/20">
                        <span className="text-xs sm:text-sm font-medium">{country.continent}</span>
                      </div>
                      <div className="text-xl sm:text-2xl">{country.flag}</div>
                    </div>

                    {/* Bottom Section */}
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 group-hover:text-teal-400 transition-colors">
                        {country.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 mb-2 sm:mb-3">{country.tagline}</p>
                      
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center space-x-2 sm:space-x-4 text-xs text-gray-400">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span className="hidden sm:inline">{packageCount} experiences</span>
                            <span className="sm:hidden">{packageCount}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span>{avgRating}</span>
                          </div>
                        </div>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-teal-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                            Explore
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-teal-400/50 rounded-2xl transition-all duration-300"></div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredCountries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No countries match your current selection.</p>
          </div>
        )}
      </div>
    </section>
  );
}
