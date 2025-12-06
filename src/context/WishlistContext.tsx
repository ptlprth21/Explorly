'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { createClientSupabase } from '@/lib/supabase/client';

interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (packageId: string) => void;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const supabase = createClientSupabase();
  const [wishlist, setWishlist] = useState<string[]>([]);

  const refreshWishlist = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser(); 
      
      if (!user) {
         setWishlist([]);
         return;
      }
      
      const { data, error } = await supabase.from('user_wishlist').select('package_id');
      
      if (error) throw error;
      setWishlist(data.map(item => item.package_id));
      
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  }, [supabase]);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        refreshWishlist();
      } else {
        setWishlist([]);
      }
    });

    refreshWishlist();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [refreshWishlist, supabase]);


  const toggleWishlist = async (packageId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser(); 
      if (!user) {
        console.warn('Cannot toggle wishlist: User is not currently authenticated.');
        return; 
      }
      const userId = user.id;

      if (wishlist.includes(packageId)) {
        const { error } = await supabase
          .from('user_wishlist')
          .delete()
          .eq('package_id', packageId)
          .eq('user_id', userId);
        
        if (error) throw error;
        setWishlist(prev => prev.filter(id => id !== packageId));
        
      } else {
        const { error } = await supabase
          .from('user_wishlist')
          .insert([{ 
              package_id: packageId,
              user_id: userId,
          }]); 
          
        if (error) throw error;
        setWishlist(prev => [...prev, packageId]);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      
      if (typeof error === 'object' && error !== null) {
          console.error('Error details (JSON):', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      } else {
          console.error('Error details:', error);
      }
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, refreshWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};