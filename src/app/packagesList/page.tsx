
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import type { Package, Theme, Country } from '@/types';
import { getPackages, getThemes, getCountries  } from '@/lib/data';
import PackageGrid from '@/components/packages/PackageGrid';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Container from '@/components/ui/Container';
import { Card } from '@/components/ui/card';
import { Filter, SortAsc, ArrowLeft, Clock, Mountain, MapPin, } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import StarRating from '@/components/ui/StarRating';

export default function DestinationsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [allPackages, setAllPackages] = useState<Package[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState<Country[]>([]);

  
  // Filters
  const [priceFilter, setPriceFilter] = useState([0, 10000]);
  const [durationFilter, setDurationFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [themeFilter, setThemeFilter] = useState(searchParams.get('theme') || 'all');
  const [sortBy, setSortBy] = useState('rating');
  
  const country = searchParams.get("country");

  useEffect(() => {
    const loadData = async () => {
        setIsLoading(true);
        const [packagesData, themesData, countriesData] = await Promise.all([getPackages(), getThemes(), getCountries()]);

        setAllPackages(packagesData);
        setThemes(themesData.filter(t => t.id !== 'all')); // Remove 'All Themes' from filter options
        setCountries(countriesData);
        setIsLoading(false);
    };
    loadData();
  }, []);

  const filteredPackages = useMemo(() => {
    let packages = [...allPackages];

    if (country) {
        packages = packages.filter(pkg =>
        pkg.country?.toLowerCase() === country.toLowerCase()
        );
    }

    packages = packages.filter(pkg =>
        pkg.price >= priceFilter[0] && pkg.price <= priceFilter[1]
    );

    const durationMatch = (d: number) =>
        durationFilter === 'all' ||
        (durationFilter === 'short' && d <= 5) ||
        (durationFilter === 'medium' && d > 5 && d <= 10) ||
        (durationFilter === 'long' && d > 10);

    packages = packages.filter(pkg =>
        durationMatch(parseInt(pkg.duration))
    );

    if (difficultyFilter !== 'all') {
        packages = packages.filter(pkg =>
        pkg.difficulty?.toLowerCase() === difficultyFilter.toLowerCase()
        );
    }

    if (themeFilter !== 'all') {
        packages = packages.filter(pkg => pkg.theme === themeFilter);
    }

    packages.sort((a, b) => {
        const DURATION_A = parseInt(a.duration);
        const DURATION_B = parseInt(b.duration);
        switch (sortBy) {
        case 'price-asc':
            return a.price - b.price;
        case 'price-desc':
            return b.price - a.price;
        case 'duration-asc':
            return DURATION_A - DURATION_B;
        case 'duration-desc':
            return DURATION_B - DURATION_A;
        default:
            return b.rating - a.rating;
        }
    });

    return packages;
    }, [country, priceFilter, durationFilter, difficultyFilter, themeFilter, sortBy, allPackages]);

    const selectedCountry = countries.find(
        c => c.name.toLowerCase() === country?.toLowerCase()
    );

  return (
    <section className="pt-0 pb-20" id="destinations">
        {/* Header */}
        <div className="bg-background/80 backdrop-blur-md sticky top-16 z-40 border-b border-border">   
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
            </button>
            </div>
        </div>

        {/* Hero Section */}
        {selectedCountry && (
            <div className="relative h-96 overflow-hidden">
                <Image
                src={selectedCountry.heroImage}
                alt={selectedCountry.name}
                fill
                className="object-cover w-full h-full"
                priority
                />
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="absolute bottom-8 left-8 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    {selectedCountry.name}
                </h1>
                <p className="text-lg opacity-90">{selectedCountry.tagline}</p>

                <div className="flex items-center space-x-2 mt-3 text-white/90">
                    <MapPin className="h-5 w-5" />
                    <span>{selectedCountry.continent}</span>
                </div>
                </div>
            </div>
        )}


      <Container>
        {/* Filters Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-card/80 backdrop-blur-sm border border-border p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Filter & Sort Packages</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Price Range</label>
                <Slider 
                  value={priceFilter} 
                  onValueChange={setPriceFilter} 
                  max={10000} 
                  step={100} 
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>€{priceFilter[0]}</span>
                  <span>€{priceFilter[1]}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Duration</label>
                <Select value={durationFilter} onValueChange={setDurationFilter}>
                  <SelectTrigger className="w-full text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Durations</SelectItem>
                    <SelectItem value="short">Short (1-5 days)</SelectItem>
                    <SelectItem value="medium">Medium (6-10 days)</SelectItem>
                    <SelectItem value="long">Long (10+ days)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Difficulty</label>
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="w-full text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Theme</label>
                <Select value={themeFilter} onValueChange={setThemeFilter}>
                  <SelectTrigger className="w-full text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Themes</SelectItem>
                    {themes.map(theme => (
                        <SelectItem key={theme.id} value={theme.id}>{theme.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value="rating">Rating</SelectItem> */}
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="duration-asc">Duration: Short to Long</SelectItem>
                    <SelectItem value="duration-desc">Duration: Long to Short</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </section>

        <PackageGrid packages={filteredPackages} isLoading={isLoading} themes={themes} />
      </Container>
    </section>
  );
}