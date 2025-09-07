
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, MapPin, Plane } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { Package } from '@/types';
import { getPackages } from '@/lib/data';
import { useBookingWizard } from '@/context/BookingWizardContext';

export default function FloatingBookingPanel() {
  const { openWizard } = useBookingWizard();
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);
  const [isMinimized, setIsMinimized] = useState(true);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');

  useEffect(() => {
    const fetchPackages = async () => {
      const pkgs = await getPackages();
      setPackages(pkgs);
    };
    fetchPackages();
  }, []);

  const handleOpenWizard = () => {
    const selectedPackage = packages.find(p => p.id === selectedPackageId);
    if (selectedPackage) {
      openWizard(selectedPackage);
    } else {
      router.push('/destinations');
    }
  };

  const handleMobileClick = () => {
    const defaultPackage = packages.find(p => p.availableDates.length > 0) || null;
    if (defaultPackage) {
      openWizard(defaultPackage);
    } else {
      router.push('/destinations');
    }
  };

  return (
    <>
      {/* Desktop Floating Panel */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-40">
        <div className={`bg-neutral-900/90 backdrop-blur-xl border border-neutral-800/50 rounded-2xl shadow-2xl transition-all duration-300 ${
          isMinimized ? 'w-16 h-16' : 'w-80 p-6'
        }`}>
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
              
              <div className="space-y-3">
                <Select onValueChange={setSelectedPackageId} value={selectedPackageId}>
                  <SelectTrigger className="bg-neutral-800/60 border-neutral-700">
                    <SelectValue placeholder="Choose destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {packages.filter(p => p.availableDates.length > 0).map(pkg => (
                      <SelectItem key={pkg.id} value={pkg.id}>{pkg.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <Input 
                      type="date" 
                      className="pl-10 bg-neutral-800/60 border-neutral-700"
                    />
                  </div>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <Input 
                      type="number" 
                      min="1" 
                      max="10" 
                      defaultValue="2" 
                      placeholder="Guests" 
                      className="pl-10 bg-neutral-800/60 border-neutral-700"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleOpenWizard}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Plan My Trip
                </Button>
                
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-800/50 p-4">
        <Button 
          onClick={handleMobileClick}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-4"
        >
          <Plane className="h-5 w-5" />
          <span>Plan My Trip</span>
        </Button>
      </div>
    </>
  );
}
