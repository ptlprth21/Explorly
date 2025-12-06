
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Star, Clock, MapPin, Users, Calendar, Play, Heart, ChevronLeft, ChevronRight, Check, Filter, SortAsc } from 'lucide-react';
import type { Package, Country } from '@/types';
import { getPackagesByCountry, getCountryBySlug } from '@/lib/data';
import Container from '@/components/ui/Container';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import StarRating from '@/components/ui/StarRating';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import { useBookingWizard } from '@/context/BookingWizardContext';
import { Card, CardContent } from '@/components/ui/card';


export default function CountryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const name = params.name as string;
  const [country, setCountry] = useState<Country | null>(null);
  const [allCountryPackages, setAllCountryPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { openWizard } = useBookingWizard();
  const [currentPackageIndex, setCurrentPackageIndex] = useState(0);

  // Filters
  const [priceFilter, setPriceFilter] = useState([0, 10000]);
  const [durationFilter, setDurationFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  
  useEffect(() => {
    const countrySlug = name;
    if (!countrySlug) return;
    
    const fetchData = async () => {
      setIsLoading(true);
      const countryData = await getCountryBySlug(countrySlug);
      const packageData = await getPackagesByCountry(countrySlug);
      
      setCountry(countryData);
      setAllCountryPackages(packageData);
      
      setIsLoading(false);
    }
    fetchData();
  }, [name]);

  useEffect(() => {
    let packages = [...allCountryPackages];
    
    // Apply filters
    packages = packages.filter(pkg => {
      const priceMatch = pkg.price >= priceFilter[0] && pkg.price <= priceFilter[1];
      
      const duration = parseInt(pkg.duration);
      const durationMatch = durationFilter === 'all' || 
        (durationFilter === 'short' && duration <= 5) ||
        (durationFilter === 'medium' && duration > 5 && duration <= 10) ||
        (durationFilter === 'long' && duration > 10);
      
      const difficultyMatch = difficultyFilter === 'all' || pkg.difficulty.toLowerCase() === difficultyFilter;
      
      return priceMatch && durationMatch && difficultyMatch;
    });
    
    // Apply sorting
    packages.sort((a, b) => {
      const DURATION_A = parseInt(a.duration);
      const DURATION_B= parseInt(b.duration);

      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'duration': return parseInt(a.duration) - parseInt(b.duration);
        default: return b.rating - a.rating;
      }
    });

    setFilteredPackages(packages);
    setCurrentPackageIndex(0);
  }, [priceFilter, durationFilter, difficultyFilter, sortBy, allCountryPackages]);

  const nextPackage = () => {
    setCurrentPackageIndex((prev) => (prev + 1) % filteredPackages.length);
  };

  const prevPackage = () => {
    setCurrentPackageIndex((prev) => (prev - 1 + filteredPackages.length) % filteredPackages.length);
  };

  if (isLoading || !country) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentPackage = filteredPackages[currentPackageIndex];

  return (
    <div className="min-h-screen">
      <Container>
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <Container className="py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/destinations" className="hover:text-primary transition-colors cursor-pointer">Destinations</Link>
              <span>/</span>
              <span className="text-foreground">{country.name}</span>
            </div>
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center space-x-1 sm:space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </div>
        </Container>
      </div>

      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden flex items-center justify-center my-8 rounded-xl">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://qykdgddijeumcxrunxsh.supabase.co/storage/v1/object/public/media/videos/105085-668973349.mp4" type="video/mp4"/>
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span className="text-4xl sm:text-5xl lg:text-6xl animate-pulse"><img src={country.flag} alt="UAE flag" className="w-6 h-auto"/></span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 text-white">
            {country.name.toUpperCase()}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            {country.tagline}
          </p>
          <a 
            href="#packages" 
            className="inline-flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            <span>Discover Packages</span>
            <Play className="h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Filters Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-card/80 backdrop-blur-sm border border-border p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Filter className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Filter & Sort Packages</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <label className="block text-sm font-medium text-muted-foreground mb-2">Sort By</label>
               <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </section>

      {/* Package Cards */}
      <section id="packages" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured Experiences
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Handpicked adventures in {country.name}
          </p>
        </div>

        {filteredPackages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No packages match your current filters.</p>
            <Button 
              onClick={() => {
                setPriceFilter([0, 10000]);
                setDurationFilter('all');
                setDifficultyFilter('all');
              }}
              variant="default"
              className="mt-4"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="relative">
            <div className="w-full max-w-3xl mx-auto">
              <Card className="group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                {currentPackage && (
                  <>
                  <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
                    <Image
                      src={currentPackage.image}
                      alt={currentPackage.title}
                      data-ai-hint="package adventure"
                      fill
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        onClick={() => openWizard(currentPackage)}
                        className="w-16 sm:w-20 h-16 sm:h-20 bg-primary/90 backdrop-blur-sm rounded-full text-white hover:bg-primary/80 transition-colors transform hover:scale-110"
                        size="icon"
                      >
                        <Play className="h-6 sm:h-8 w-6 sm:w-8 ml-1" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="mb-6">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {currentPackage.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-muted-foreground text-sm sm:text-base">
                        <span className="text-base sm:text-lg"><img src={country.flag} alt="UAE flag" className="w-6 h-auto"/></span>
                        <span>{currentPackage.destination}</span>
                        <span>•</span>
                        <span>{currentPackage.duration}</span>
                      </div>
                    </div>

                    {/* <div className="mb-6">
                      <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-2">
                        <span>Rating</span>
                         <StarRating rating={currentPackage.rating} />
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${(currentPackage.rating / 5) * 100}%` }}></div>
                      </div>
                    </div> */}

                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center space-x-4">
                        {/* <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                          <Heart className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center space-x-1 text-sm">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-semibold">{currentPackage.rating}</span>
                          <span className="text-muted-foreground">({currentPackage.reviewCount})</span>
                        </div> */}
                      </div>
                      
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="text-right">
                          <div className="text-xl sm:text-2xl font-bold text-primary">€{currentPackage.price.toLocaleString()}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground">per person</div>
                        </div>
                        <Link href={`/packages/${currentPackage.id}`}>
                          <Button className="font-semibold transition-colors text-sm sm:text-base">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  </>
                )}
              </Card>
            </div>
            {filteredPackages.length > 1 && (
              <>
                <Button
                  onClick={prevPackage}
                  size="icon"
                  variant="outline"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                >
                  <ChevronLeft className="h-5 sm:h-6 w-5 sm:w-6" />
                </Button>
                <Button
                  onClick={nextPackage}
                  size="icon"
                  variant="outline"
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                >
                  <ChevronRight className="h-5 sm:h-6 w-5 sm:w-6" />
                </Button>
                <div className="text-center mt-6">
                  <span className="text-muted-foreground text-sm">
                    {String(currentPackageIndex + 1).padStart(2, '0')} / {String(filteredPackages.length).padStart(2, '0')}
                  </span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Key Highlights */}
        <div className="mt-12 sm:mt-16 text-center">
          <Card className="p-6 sm:p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Check className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground text-center">Local Guide Included</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground text-center">Hotel Stay</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground text-center">Airport Pickup</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground text-center">Flexible Dates</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Story Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Open the world for yourself
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              From sunrise hikes to quiet lakeside cabins, our trips blend nature, culture, and comfort—so you can explore more and stress less.
            </p>
            <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{allCountryPackages.length}+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Experiences</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">4.8+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Avg. Rating</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-video overflow-hidden rounded-2xl group cursor-pointer mt-8 md:mt-0">
            <Image 
              src={country.heroImage}
              data-ai-hint="video travel"
              alt="Video thumbnail"
              fill
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
            <button className="absolute inset-0 m-auto h-12 sm:h-16 w-12 sm:w-16 rounded-full bg-white/90 hover:bg-white text-foreground font-bold flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Play className="h-5 sm:h-6 w-5 sm:w-6 ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Traveler Gallery */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">Captured moments from {country.name}</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:mb-4">
          {allCountryPackages.flatMap(p => p.gallery).slice(0, 8).map((image, index) => (
            <div key={index} className="break-inside-avoid mb-3 sm:mb-4 group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={image}
                  alt={`Gallery image of ${country.name} ${index + 1}`}
                  width={500}
                  height={500}
                  data-ai-hint="traveler photo"
                  className="w-full h-auto group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      </Container>
    </div>
  );
}

    