
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Clock, Play, Heart, ChevronLeft, ChevronRight, Filter, Ban } from 'lucide-react';
import type { Package } from '@/types';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { useBookingWizard } from '@/context/BookingWizardContext';

interface MusicPlayerPackagesProps {
  packages: Package[];
}

export default function MusicPlayerPackages({ packages }: MusicPlayerPackagesProps) {
  const router = useRouter();
  const { openWizard } = useBookingWizard();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [availability, setAvailability] = useState({ seatsLeft: 0, totalSeats: 0 });

  useEffect(() => {
    // Generate random availability only on the client-side to prevent hydration errors.
    setAvailability({
      seatsLeft: Math.floor(Math.random() * 10) + 5,
      totalSeats: Math.floor(Math.random() * 10) + 15
    });
  }, [currentIndex]); // Re-roll when package changes for variety

  const filters = [
    { id: 'all', name: 'All Packages', icon: '🌍' },
    { id: 'adventure', name: 'Adventure', icon: '🏔️' },
    { id: 'cultural', name: 'Cultural', icon: '🏛️' },
    { id: 'beach', name: 'Beach', icon: '🏖️' },
    { id: 'safari', name: 'Safari', icon: '🦁' },
  ];

  const filteredPackages = packages.filter(pkg => {
    return filter === 'all' || pkg.theme.toLowerCase() === filter;
  });

  const nextPackage = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredPackages.length);
  };

  const prevPackage = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredPackages.length) % filteredPackages.length);
  };

  const currentPackage = filteredPackages[currentIndex];
  const isFullyBooked = currentPackage && currentPackage.availableDates.length === 0;

  if (!packages.length) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-accent font-medium text-sm uppercase tracking-wider">Popular this month</span>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Worldwide Adventures
            </h2>
          </div>
          <Button variant="link" onClick={() => router.push('/destinations')} className="text-primary hover:text-primary/80">
            <span>View all</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {filters.map(filterItem => (
            <Button
              key={filterItem.id}
              variant="outline"
              onClick={() => {
                setFilter(filterItem.id);
                setCurrentIndex(0);
              }}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                filter === filterItem.id
                  ? 'bg-primary/20 text-primary border-primary/30'
                  : 'bg-card hover:bg-muted'
              }`}
            >
              <span>{filterItem.icon}</span>
              <span>{filterItem.name}</span>
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-card hover:bg-muted px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300"
          >
            <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>More Filters</span>
          </Button>
        </div>
        
        {/* Extended Filters */}
        {showFilters && (
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 mb-8 sm:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Price Range</label>
                <div className="flex space-x-2">
                  <Input type="number" placeholder="Min" />
                  <Input type="number" placeholder="Max" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Duration</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Any Duration" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Duration</SelectItem>
                    <SelectItem value="short">1-5 days</SelectItem>
                    <SelectItem value="medium">6-10 days</SelectItem>
                    <SelectItem value="long">10+ days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Difficulty</label>
                 <Select>
                  <SelectTrigger><SelectValue placeholder="Any Level" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Level</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Music Player Style Package Cards */}
        <div className="relative">
          <div className="w-full max-w-3xl mx-auto">
            <div 
                className="group relative bg-card backdrop-blur-xl border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-[1.02]">
                {currentPackage && (
                <>
                <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
                    <Image
                    src={currentPackage.image}
                    alt={currentPackage.title}
                    data-ai-hint={`${currentPackage.destination} ${currentPackage.country}`}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                    
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-black/60 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full border border-white/20 text-white">
                        <span className="text-xs sm:text-sm font-medium">{currentPackage.country}</span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                        onClick={() => openWizard(currentPackage)}
                        disabled={isFullyBooked}
                        className="w-16 sm:w-20 h-16 sm:h-20 bg-primary/90 backdrop-blur-sm rounded-full text-white hover:bg-primary transition-colors transform hover:scale-110 disabled:bg-muted disabled:cursor-not-allowed"
                        size="icon"
                    >
                      {isFullyBooked ? <Ban className="h-6 sm:h-8 w-6 sm:w-8" /> : <Play className="h-6 sm:h-8 w-6 sm:w-8 ml-1" />}
                    </Button>
                    </div>
                </div>

                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="mb-6">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {currentPackage.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-muted-foreground text-sm sm:text-base">
                        <span>{currentPackage.destination}</span>
                        <span>•</span>
                        <span>{currentPackage.duration}</span>
                    </div>
                    </div>

                    {isFullyBooked ? (
                      <div className="mb-6 text-center bg-destructive/10 border border-destructive/20 text-destructive-foreground p-3 rounded-lg">
                        <p className="font-bold">Fully Booked</p>
                        <p className="text-xs">Check back later for new dates!</p>
                      </div>
                    ) : (
                      <div className="mb-6">
                        <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-2">
                            <span>Availability</span>
                            <span>{availability.seatsLeft}/{availability.totalSeats} seats left</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${(availability.seatsLeft / availability.totalSeats) * 100}%` }}></div>
                        </div>
                      </div>
                    )}


                    <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Heart className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-sm sm:text-base">{currentPackage.rating}</span>
                        <span className="text-muted-foreground text-xs sm:text-sm">({currentPackage.reviewCount})</span>
                        </div>
                    </div>
                    
                    <div className="text-right">
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">€{currentPackage.price.toLocaleString()}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">per person</div>
                    </div>
                    </div>

                    <Button 
                    onClick={() => router.push(`/packages/${currentPackage.id}`)}
                    variant="outline"
                    className="w-full mt-4 sm:mt-6 px-4 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
                    >
                    View Details
                    </Button>
                </div>
                </>
                )}
            </div>
          </div>
          
          {filteredPackages.length > 1 && (
            <>
              <Button
                onClick={prevPackage}
                size="icon"
                variant="outline"
                className="absolute -left-4 sm:left-0 top-1/2 transform -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 rounded-full z-10"
              >
                <ChevronLeft className="h-5 sm:h-6 w-5 sm:w-6" />
              </Button>
              <Button
                onClick={nextPackage}
                size="icon"
                variant="outline"
                className="absolute -right-4 sm:right-0 top-1/2 transform -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 rounded-full z-10"
              >
                <ChevronRight className="h-5 sm:h-6 w-5 sm:w-6" />
              </Button>
            </>
          )}

          {/* Package Counter */}
          <div className="text-center mt-6 sm:mt-8">
            <span className="text-muted-foreground text-sm sm:text-base">
              {String(currentIndex + 1).padStart(2, '0')} / {String(filteredPackages.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
