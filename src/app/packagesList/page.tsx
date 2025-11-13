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
      packages = packages.filter(pkg => (pkg.country ?? '').toLowerCase() === selectedNameLower);
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
      packages = packages.filter(pkg => pkg.theme === themeFilter);
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
          <Image
            src={selectedCountry.heroImage}
            alt={selectedCountry.name}
            fill
            className="object-cover w-full h-full"
            priority
          />
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

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6 prose prose-invert max-w-none">
                <div>
                  <h3 className="text-xl font-semibold mb-3">About This Trip</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedCountry.description}</p>
                </div>
  
                {/* Facts Table */}
                <div className="flex justify-center">
                  <div className="w-full max-w-md bg-card/40 rounded-xl shadow-lg border border-border backdrop-blur-sm p-4">
                    <h3 className="text-xl font-semibold mb-3">Key Facts</h3>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b border-gray-700">
                          <td className="px-4 py-2 font-semibold text-foreground">Capital</td>
                          <td className="px-4 py-2 text-muted-foreground">{selectedCountry.capital}</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="px-4 py-2 font-semibold text-foreground">Largest City</td>
                          <td className="px-4 py-2 text-muted-foreground">{selectedCountry.largestCity}</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="px-4 py-2 font-semibold text-foreground">Currency</td>
                          <td className="px-4 py-2 text-muted-foreground">UAE Dirham (AED)</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="px-4 py-2 font-semibold text-foreground">Official Language</td>
                          <td className="px-4 py-2 text-muted-foreground">
                            Arabic <span className="text-xs text-gray-400">(English is widely spoken)</span>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="px-4 py-2 font-semibold text-foreground">Time Zone</td>
                          <td className="px-4 py-2 text-muted-foreground">{selectedCountry.timeZone}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 font-semibold text-foreground">Formation Date</td>
                          <td className="px-4 py-2 text-muted-foreground">{selectedCountry.formationDate}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'itinerary' && (
                <div className="space-y-8">
                    {/* {selectedCountry.itinerary.map((step, index) => (
                    <div key={step.day} className="relative pl-16">
                        <div className="absolute left-6 top-0 w-12 h-12 bg-primary/20 border-2 border-primary/50 text-primary rounded-full flex items-center justify-center font-bold text-lg">
                            {step.day}
                        </div>
                        {index < pkg.itinerary.length - 1 && (
                            <div className="absolute left-12 top-12 w-px bg-border"
                                style={{
                                    height: 'calc(100% - 12px)',
                                    transform: 'translateX(-50%)'
                                }}></div>
                        )}
                        
                        <div className="ml-4">
                            <h4 className="font-bold text-xl mb-1 text-primary-foreground">{step.title}</h4>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    </div>
                    ))} */}
                </div>
            )}
            {activeTab === 'gallery' && <PackageGallery images={[selectedCountry.image, ...selectedCountry.gallery]} title={selectedCountry.title} />}
            {activeTab === 'reviews' && <FirebaseReviews packageId={selectedCountry.id} rating={0} /*{pkg.rating}*/ reviewCount={0}/*{pkg.reviewCount}*/ />}
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