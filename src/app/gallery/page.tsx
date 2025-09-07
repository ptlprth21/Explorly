
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Play, Heart, Share, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import Image from 'next/image';
import { getPackages, getContinents, getThemes } from '@/lib/data';
import type { Package, Continent, Theme } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface GalleryItem {
    id: string;
    type: 'image' | 'video'; // Assuming some might be videos
    src: string;
    location: string;
    continent: string;
    theme: string;
    likes: number;
    title: string;
}

export default function GlobalGalleryPage() {
    const [activeContinent, setActiveContinent] = useState('all');
    const [activeTheme, setActiveTheme] = useState('all');
    const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
    const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
    const [allPackages, setAllPackages] = useState<Package[]>([]);
    const [continents, setContinents] = useState<Continent[]>([]);
    const [themes, setThemes] = useState<Theme[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleItems, setVisibleItems] = useState(12);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const [packagesData, continentsData, themesData] = await Promise.all([
                getPackages(),
                getContinents(),
                getThemes()
            ]);
            setAllPackages(packagesData);
            setContinents(continentsData);
            setThemes(themesData);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const galleryItems = useMemo<GalleryItem[]>(() => {
        return allPackages.flatMap(pkg => 
            pkg.gallery.map((imgSrc, index) => ({
                id: `${pkg.id}-gallery-${index}`,
                type: 'image',
                src: imgSrc,
                location: pkg.destination,
                continent: pkg.continent,
                theme: pkg.theme,
                likes: Math.floor(pkg.rating * 50) + index * 5,
                title: pkg.title,
            }))
        );
    }, [allPackages]);

    const filteredItems = useMemo(() => {
        return galleryItems
            .filter(item => activeContinent === 'all' || item.continent === activeContinent)
            .filter(item => activeTheme === 'all' || item.theme === activeTheme);
    }, [galleryItems, activeContinent, activeTheme]);

    const itemsToShow = useMemo(() => {
        return filteredItems.slice(0, visibleItems);
    }, [filteredItems, visibleItems]);

    const hasMoreItems = filteredItems.length > visibleItems;

    const loadMoreItems = () => {
        setVisibleItems(prev => prev + 12);
    };

    const toggleLike = (itemId: string) => {
        setLikedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    const openLightbox = (item: GalleryItem) => {
        setLightboxItem(item);
    };
    
    const closeLightbox = () => {
        setLightboxItem(null);
    }

    const nextLightboxItem = () => {
        if (!lightboxItem) return;
        const currentIndex = itemsToShow.findIndex(item => item.id === lightboxItem.id);
        const nextIndex = (currentIndex + 1) % itemsToShow.length;
        setLightboxItem(itemsToShow[nextIndex]);
    };

    const prevLightboxItem = () => {
        if (!lightboxItem) return;
        const currentIndex = itemsToShow.findIndex(item => item.id === lightboxItem.id);
        const prevIndex = (currentIndex - 1 + itemsToShow.length) % itemsToShow.length;
        setLightboxItem(itemsToShow[prevIndex]);
    };

    const continentFilters = [{ name: 'All', emoji: '🌍', id: 'all' }, ...continents.map(c => ({...c, id: c.name}))];
    const themeFilters = themes;
    
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Global Gallery
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Immerse yourself in breathtaking moments from around the world
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
          {continentFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => { setActiveContinent(filter.id); setVisibleItems(12); }}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeContinent === filter.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card hover:bg-muted'
              }`}
            >
              <span>{filter.emoji}</span>
              <span>{filter.name}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {themeFilters.map(filter => (
                <button
                    key={filter.id}
                    onClick={() => { setActiveTheme(filter.id); setVisibleItems(12); }}
                    className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                        activeTheme === filter.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card hover:bg-muted'
                    }`}
                >
                    <span>{filter.icon}</span>
                    <span>{filter.name}</span>
                </button>
            ))}
        </div>
        
        {isLoading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton key={i} className="h-64 w-full rounded-2xl mb-4" />
                ))}
            </div>
        ) : (
            <>
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {itemsToShow.map((item) => (
                <div 
                key={item.id} 
                className="break-inside-avoid group cursor-pointer"
                onClick={() => openLightbox(item)}
                >
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-card border">
                    <div className="relative">
                    <Image
                        src={item.src}
                        alt={item.title}
                        width={500}
                        height={500}
                        data-ai-hint="gallery photo"
                        className="w-full h-auto group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 sm:w-16 h-12 sm:h-16 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                            <Play className="h-5 sm:h-6 w-5 sm:w-6 ml-1" />
                        </div>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(item.id);
                        }}
                        className={`w-8 h-8 sm:w-10 sm:h-10 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${
                            likedItems.has(item.id) 
                            ? 'bg-red-500/80 text-white' 
                            : 'bg-black/60 text-white hover:bg-black/80'
                        }`}
                        >
                        <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${likedItems.has(item.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button className="w-8 h-8 sm:w-10 sm:h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors">
                        <Share className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                    </div>
                    </div>
                    
                    <div className="p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                        <div>
                        <h4 className="font-semibold text-foreground text-sm sm:text-base">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.location}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground mt-1">
                            <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>{item.likes + (likedItems.has(item.id) ? 1 : 0)}</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>

            {hasMoreItems && (
            <div className="text-center mt-12 sm:mt-16">
                <Button 
                    onClick={loadMoreItems}
                    variant="outline"
                    size="lg"
                >
                    Load More
                </Button>
            </div>
            )}

            {filteredItems.length === 0 && !isLoading && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No photos match your current selection.</p>
                </div>
            )}
            </>
        )}
      </div>

      <Dialog open={!!lightboxItem} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl w-full h-[90vh] p-0 bg-transparent border-0" onInteractOutside={closeLightbox}>
          <div className="relative w-full h-full flex items-center justify-center">
            {itemsToShow.length > 1 && (
                 <>
                    <Button
                        onClick={prevLightboxItem}
                        size="icon"
                        variant="ghost"
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/80 z-20"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        onClick={nextLightboxItem}
                        size="icon"
                        variant="ghost"
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/80 z-20"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </>
            )}
            
            {lightboxItem && (
                 <div className="relative w-full h-full">
                    <Image
                        src={lightboxItem.src}
                        alt={lightboxItem.title}
                        fill
                        className="object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                        <h3 className="text-xl font-bold mb-2">{lightboxItem.title}</h3>
                        <p className="text-muted-foreground text-white/80">{lightboxItem.location}</p>
                    </div>
                </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

    
