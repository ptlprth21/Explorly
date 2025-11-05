'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, Plane } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { Package } from '@/types';
import { getPackages } from '@/lib/data';
import { useBookingWizard } from '@/context/BookingWizardContext';

export default function FloatingBookingPanel() {
  const { openWizard } = useBookingWizard();
  const [packages, setPackages] = useState<Package[]>([]);
  const [isMinimized, setIsMinimized] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    const fetchPackages = async () => {
      const pkgs = await getPackages();
      setPackages(pkgs);
    };
    fetchPackages();
  }, []);

  const uniqueCountries = [...new Set(packages.map(pkg => pkg.country))];

  const filteredPackages = selectedCountry
    ? packages.filter(pkg => pkg.country === selectedCountry)
    : [];

  const handleOpenWizard = () => {
    const selectedPackage = packages.find(p => p.id === selectedPackageId);
    openWizard(selectedPackage || null);
  };

  return (
    <>
      <div className="hidden lg:block fixed bottom-6 right-6 z-40">
        <div
          className={`bg-neutral-900/90 backdrop-blur-xl border border-neutral-800/50 rounded-2xl shadow-2xl transition-all duration-300 ${
            isMinimized ? 'w-16 h-16' : 'w-[420px] p-6'
          }`}
        >
          {isMinimized ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(false)}
              className="w-full h-full text-primary hover:text-primary/80"
            >
              <Plane className="h-6 w-6" />
            </Button>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Quick Book</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(true)}
                  className="text-neutral-400 hover:text-white"
                >
                  <span className="text-xl">−</span>
                </Button>
              </div>

              <div className="space-y-4">
                
                {/* Country Filter */}
                <Select
                  onValueChange={value => {
                    setSelectedCountry(value);
                    setSelectedPackageId('');
                  }}
                  value={selectedCountry}
                >
                  <SelectTrigger className="bg-neutral-800/60 border-neutral-700">
                    <SelectValue placeholder="Choose a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueCountries.map(country => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={setSelectedPackageId}
                  value={selectedPackageId}
                  disabled={!selectedCountry}
                >
                  <SelectTrigger className="bg-neutral-800/60 border-neutral-700">
                    <SelectValue placeholder="Choose destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredPackages.map(pkg => (
                      <SelectItem key={pkg.id} value={pkg.id}>
                        {pkg.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="pl-10 bg-neutral-800/60 border-neutral-700"
                      disabled={!selectedPackageId}
                    />

                  </div>

                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <Select defaultValue="2"  disabled={!selectedPackageId}>
                      <SelectTrigger className="pl-10 bg-neutral-800/60 border-neutral-700">
                        <SelectValue placeholder="Guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(19)].map((_, i) => (
                          <SelectItem key={i + 2} value={(i + 2).toString()}>
                            {i + 2} Guests
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleOpenWizard}
                  disabled={!selectedPackageId || !selectedDate}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Plan My Trip
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}