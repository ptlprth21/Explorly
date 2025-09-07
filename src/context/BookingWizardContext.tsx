
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Package } from '@/types';

interface BookingWizardContextType {
  isWizardOpen: boolean;
  selectedPackage: Package | null;
  openWizard: (pkg: Package | null) => void;
  closeWizard: () => void;
}

const BookingWizardContext = createContext<BookingWizardContextType | undefined>(undefined);

export const BookingWizardProvider = ({ children }: { children: ReactNode }) => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const openWizard = (pkg: Package | null) => {
    setSelectedPackage(pkg);
    setIsWizardOpen(true);
  };

  const closeWizard = () => {
    setIsWizardOpen(false);
    setSelectedPackage(null);
  };

  return (
    <BookingWizardContext.Provider value={{ isWizardOpen, selectedPackage, openWizard, closeWizard }}>
      {children}
    </BookingWizardContext.Provider>
  );
};

export const useBookingWizard = () => {
  const context = useContext(BookingWizardContext);
  if (context === undefined) {
    throw new Error('useBookingWizard must be used within a BookingWizardProvider');
  }
  return context;
};
