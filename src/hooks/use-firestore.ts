
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
// import { db } from '@/lib/supabase';
// import type { Review } from '@/types';

// export function useReviews(packageId: string) {
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [loading, setLoading] = useState(true);

//   const refetch = useCallback(() => {
//     setLoading(true);
//     const reviewsCollection = collection(db, 'reviews');
//     const q = query(
//       reviewsCollection,
//       where('packageId', '==', packageId),
//       orderBy('date', 'desc')
//     );

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const reviewsData: Review[] = [];
//       querySnapshot.forEach((doc) => {
//         reviewsData.push({ id: doc.id, ...doc.data() } as Review);
//       });
//       setReviews(reviewsData);
//       setLoading(false);
//     }, (error) => {
//       console.error("Error fetching reviews:", error);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, [packageId]);

//   useEffect(() => {
//     const unsubscribe = refetch();
//     return () => unsubscribe();
//   }, [refetch]);

//   return { reviews, loading, refetch };
// }

'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Review } from '@/types';

export function useReviews(packageId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('package_id', packageId)
        .order('date', { ascending: false });

      if (error) throw error;
      setReviews(data as Review[]);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [packageId]);

  useEffect(() => {
    const subscription = supabase
      .channel('public:reviews')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews', filter: `package_id=eq.${packageId}` }, payload => {
        fetchReviews();
      })
      .subscribe();

    fetchReviews();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [packageId, fetchReviews]);

  return { reviews, loading, refetch: fetchReviews };
}