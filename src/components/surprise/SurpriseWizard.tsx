'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PackageGrid from '@/components/packages/PackageGrid';
import { Package, Theme } from '@/types';
import { getPackages, getThemes } from '@/lib/data';

interface SurpriseWizardProps {
  onClose: () => void;
}

export default function SurpriseWizard({ onClose }: SurpriseWizardProps) {
  const [step, setStep] = useState(1);

  const [vibe, setVibe] = useState<'relax' | 'adventure' | null>(null);
  const [budget, setBudget] = useState<number>(2000);

  const [allPackages, setAllPackages] = useState<Package[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [packagesData, themesData] = await Promise.all([getPackages(), getThemes()]);
        setAllPackages(packagesData);
        setThemes(themesData.filter(t => t.id !== 'all'));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleNext = () => {
    if (step === 1 && !vibe) return;
    if (step === 2) {
      handleFilter(); 
    }
    setStep(step + 1);
  };

  const handleFilter = () => {
    const results = allPackages.filter(pkg => {
      const matchesBudget = pkg.price <= budget;

      const vibeThemeId = themes.find(t => t.name.toLowerCase() === vibe)?.id;
      const matchesVibe = vibeThemeId ? pkg.themes.some(theme => theme.id === vibeThemeId) : true;

      return matchesBudget && matchesVibe;
    });

    setFilteredPackages(results);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="w-full max-w-3xl rounded-3xl bg-background/90 backdrop-blur-xl border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/20">
          <h2 className="text-xl font-bold text-white">Surprise Me!</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {step === 1 && (
            <div className="text-center space-y-4">
              <label className="block text-sm font-medium text-white mb-2">Vibe</label>
              <div className="flex justify-center gap-4">
                <Button variant={vibe === 'relax' ? 'default' : 'outline'} onClick={() => setVibe('relax')}>
                  Relax
                </Button>
                <Button variant={vibe === 'adventure' ? 'default' : 'outline'} onClick={() => setVibe('adventure')}>
                  Adventure
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <label className="block text-sm font-medium text-white mb-2">Budget (€)</label>
              <input
                type="number"
                min={0}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-32 text-center p-2 rounded-lg border border-white/20 bg-background/70 text-white"
              />
            </div>
          )}

          {step === 3 && (
            <div className="mt-6">
              {filteredPackages.length > 0 ? (
                <PackageGrid packages={filteredPackages} isLoading={loading} themes={themes} />
              ) : (
                !loading && (
                  <p className="text-white mt-4 text-center">No packages found for your selections.</p>
                )
              )}
            </div>
          )}

          {step < 3 && (
            <Button 
              onClick={handleNext} 
              className="w-full bg-teal-500 hover:bg-teal-400"
              disabled={(step === 1 && !vibe)}
            >
              Next
            </Button>
          )}

        </div>
      </div>
    </div>
  );
}