'use client';

import React, { useState, useEffect, useMemo } from 'react';
import type { Package, Theme, Country } from '@/types';
import { getPackages, getThemes, getCountries, getCountryBySlug } from '@/lib/data';
import PackageGrid from '@/components/packages/PackageGrid';
import { useSearchParams, useRouter, usePathname, useParams } from 'next/navigation';
import Container from '@/components/ui/Container';
import { Card } from '@/components/ui/card';
import { Filter, ArrowLeft, MapPin, Check, CheckCircle, XCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import StarRating from '@/components/ui/StarRating';
import PackageGallery from '@/components/packages/PackageGallery';
import FirebaseReviews from '@/components/packages/FirebaseReviews';

export default function DestinationsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();

  const [allPackages, setAllPackages] = useState<Package[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('overview'); /*useState<'overview' | 'gallery' | 'reviews'>('overview');*/

  // Filters
  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 10000]);
  const [durationFilter, setDurationFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [themeFilter, setThemeFilter] = useState<string>(searchParams.get('theme') || 'all');
  const [sortBy, setSortBy] = useState<string>('rating');

  const countryQuery = (searchParams?.get?.('country') ?? null) as string | null;
  const routeName = (params as any)?.name ?? (params as any)?.slug ?? null;
  const countryParam = (countryQuery || routeName || '').toString();

  useEffect(() => {
    const loadAll = async () => {
      setIsLoading(true);
      try {
        const [packagesData, themesData, countriesData] = await Promise.all([
          getPackages(),
          getThemes(),
          getCountries(),
        ]);

        setAllPackages(packagesData);
        setThemes(themesData.filter(t => t.id !== 'all'));
        setCountries(countriesData);

        if (countryParam) {
          let found: Country | undefined;
          try {
            const maybeBySlug = await getCountryBySlug(countryParam);
            if (maybeBySlug) found = maybeBySlug;
          } catch (e) {
            found = undefined;
          }

          if (!found) {
            found = countriesData.find(c => c.name.toLowerCase() === countryParam.toLowerCase());
          }

          setSelectedCountry(found ?? null);
        } else {
          setSelectedCountry(null);
        }
      } catch (err) {
        console.error('Error loading data', err);
        setSelectedCountry(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadAll();
  }, [countryParam]);

  const filteredPackages = useMemo(() => {
    let packages = [...allPackages];

    if (selectedCountry) {
      const selectedNameLower = selectedCountry.name.toLowerCase();
      packages = packages.filter(pkg => (pkg.country.name ?? '').toLowerCase() === selectedNameLower);
    }

    // price
    packages = packages.filter(pkg => pkg.price >= priceFilter[0] && pkg.price <= priceFilter[1]);

    // duration
    const durationMatch = (d: number) =>
      durationFilter === 'all' ||
      (durationFilter === 'short' && d <= 5) ||
      (durationFilter === 'medium' && d > 5 && d <= 10) ||
      (durationFilter === 'long' && d > 10);

    packages = packages.filter(pkg => durationMatch(parseInt(pkg.duration)));

    // difficulty
    if (difficultyFilter !== 'all') {
      packages = packages.filter(pkg => pkg.difficulty?.toLowerCase() === difficultyFilter.toLowerCase());
    }

    // theme
    if (themeFilter !== 'all') {
      packages = packages.filter(pkg => pkg.themes.some(t => t.id === themeFilter));
    }

    // sorting
    packages.sort((a, b) => {
      const DA = parseInt(a.duration);
      const DB = parseInt(b.duration);

      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'duration-asc': return DA - DB;
        case 'duration-desc': return DB - DA;
        case 'rating': default: return b.rating - a.rating;
      }
    });

    return packages;
  }, [allPackages, selectedCountry, priceFilter, durationFilter, difficultyFilter, themeFilter, sortBy]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-24">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (countryParam && !selectedCountry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-lg text-center p-8">
          <h2 className="text-2xl font-bold mb-2">Country not found</h2>
          <p className="text-muted-foreground mb-4">We couldn't find the country "{countryParam}".</p>
          <Button onClick={() => router.push('/destinations')}>Back to Destinations</Button>
        </div>
      </div>
    );
  }

 const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'culture', label: 'Culture' },
    { id: 'history', label: 'History' },
    { id: 'guide', label: 'Guide' },
    { id: 'facts', label: 'Fun Facts' }
  ];

  return (
    <section className="pt-0 pb-20" id="destinations">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-md sticky top-16 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button onClick={() => router.back()} className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Hero */}
      {selectedCountry && (
        <div className="relative h-96 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          >
            <source src={selectedCountry.heroVideo} type="video/mp4"/>
          </video>
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{selectedCountry.name}</h1>
            <p className="text-lg opacity-90">{selectedCountry.tagline}</p>
            <div className="flex items-center space-x-2 mt-3 text-white/90">
              <MapPin className="h-5 w-5" />
              <span>{selectedCountry.continent}</span>
            </div>
          </div>
        </div>
      )}

      <div className="lg:col-span-2">
        {/* Tabs */}
        <div className="bg-card rounded-xl shadow-sm mb-8">
          <div className="border-b border-border">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6 space-y-8">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
                <div className="bg-card/50 backdrop-blur-md rounded-2xl shadow-md p-6">
                  <h3 className="text-2xl font-bold text-primary mb-4 text-center">About This Trip</h3>
                  <p className="text-muted-foreground leading-relaxed text-center">{selectedCountry.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {[
                    { label: 'Capital', value: selectedCountry.capital },
                    { label: 'Largest City', value: selectedCountry.largestCity },
                    { label: 'Currency', value: 'UAE Dirham (AED)' },
                    { label: 'Official Language', value: 'Arabic (English widely spoken)' },
                    { label: 'Time Zone', value: selectedCountry.timeZone },
                    { label: 'Formation Date', value: selectedCountry.formationDate },
                  ].map((fact, idx) => (
                    <div
                      key={idx}
                      className="bg-card/40 backdrop-blur-sm border border-border rounded-xl shadow-sm p-4 flex flex-col items-center"
                    >
                      <span className="text-muted-foreground text-sm">{fact.label}</span>
                      <span className="font-semibold text-lg text-foreground text-center">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'culture' && (
              <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                {selectedCountry.cultureDetails?.map((section, idx) => (
                  <div
                    key={idx}
                    className="bg-card/40 backdrop-blur-md rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <h4 className="text-xl font-semibold text-primary mb-3">{section.title}</h4>
                    {section.details.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed mb-3 whitespace-pre-line">{paragraph}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                {selectedCountry.historyDetails?.map((section, idx) => (
                  <div
                    key={idx}
                    className="bg-card/40 backdrop-blur-md rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <h4 className="text-xl font-semibold text-primary mb-3">{section.title}</h4>
                    {section.details.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed mb-3 whitespace-pre-line">{paragraph}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'guide' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {selectedCountry.guide.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-card/50 backdrop-blur-md rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow"
                  >
                    <div className="mb-4">
                      <h4 className="text-lg sm:text-xl font-semibold text-primary mb-1">{item.emirate}</h4>
                      <p className="text-sm sm:text-base text-muted-foreground">{item.vibeFocus}</p>
                    </div>
                    <div className="mt-auto">
                      <span className="font-medium text-foreground">Highlight:</span>
                      <p className="text-sm sm:text-base text-muted-foreground">{item.keyHighlight}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'facts' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {selectedCountry.facts.map((fact, idx) => (
                  <div key={idx} className="bg-card/40 backdrop-blur-sm rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow">
                    <h4 className="text-lg font-semibold text-primary mb-2">{fact.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{fact.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      <Container>
        {/* Filters */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-card/80 backdrop-blur-sm border border-border p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Filter & Sort Packages</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Price Range</label>
                <Slider value={priceFilter} onValueChange={setPriceFilter} max={10000} step={100} />
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
                    {themes.map(theme => <SelectItem key={theme.id} value={theme.id}>{theme.name}</SelectItem>)}
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