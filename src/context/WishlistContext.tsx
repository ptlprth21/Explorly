
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (packageId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHIST_STORAGE_KEY = 'explorly-wishlist';

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem(WISHIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error('Could not read wishlist from localStorage', error);
    }
  }, []);

  const toggleWishlist = (packageId: string) => {
    setWishlist(prevWishlist => {
      const newWishlist = prevWishlist.includes(packageId)
        ? prevWishlist.filter(id => id !== packageId)
        : [...prevWishlist, packageId];
      
      try {
        localStorage.setItem(WISHIST_STORAGE_KEY, JSON.stringify(newWishlist));
      } catch (error) {
         console.error('Could not save wishlist to localStorage', error);
      }
      
      return newWishlist;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
