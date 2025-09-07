
'use server';

import { collection, addDoc, serverTimestamp, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from './firebase'; // Assumes db is exported from firebase.ts
import type { Package, Review } from '@/types';

export interface BookingData {
  packageId: string;
  packageName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  travelers: number;
  selectedDate: string;
  totalPrice: number;
  specialRequests?: string;
  bookingDate?: any;
  paymentIntentId?: string;
}

export async function createBooking(bookingData: Omit<BookingData, 'packageName' | 'totalPrice'> & { package: Package }): Promise<string | null> {
  try {
    const bookingsCollection = collection(db, 'bookings');
    const { package: pkg, ...restOfBookingData } = bookingData;

    const totalPrice = (pkg.price * bookingData.travelers) + 99; // base price + service fee

    const docRef = await addDoc(bookingsCollection, {
      ...restOfBookingData,
      packageName: pkg.title,
      totalPrice: totalPrice,
      bookingDate: serverTimestamp(),
      status: 'confirmed', // From 'pending' to 'confirmed' after payment
    });
    console.log('Booking request created with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    return null;
  }
}

// Omit 'id' as Firestore will generate it.
export type NewReviewData = Omit<Review, 'id'>;

export async function addReview(reviewData: NewReviewData): Promise<string | null> {
    try {
        const reviewsCollection = collection(db, 'reviews');
        const docRef = await addDoc(reviewsCollection, {
            ...reviewData,
            date: serverTimestamp() // Use server timestamp for consistency
        });
        console.log('Review created with ID: ', docRef.id);
        return docRef.id;
    } catch (e) {
        console.error('Error adding review: ', e);
        return null;
    }
}

export async function searchPackages(searchTerm: string): Promise<Package[]> {
  const packagesRef = collection(db, 'packages');
  const searchTermLower = searchTerm.toLowerCase();
  
  // Create queries for title and destination
  const titleQuery = query(
    packagesRef,
    where('title_lowercase', '>=', searchTermLower),
    where('title_lowercase', '<=', searchTermLower + '\uf8ff'),
    limit(5)
  );

  const destinationQuery = query(
    packagesRef,
    where('destination_lowercase', '>=', searchTermLower),
    where('destination_lowercase', '<=', searchTermLower + '\uf8ff'),
    limit(5)
  );

  try {
    const [titleSnapshot, destinationSnapshot] = await Promise.all([
      getDocs(titleQuery),
      getDocs(destinationQuery),
    ]);

    const resultsMap = new Map<string, Package>();

    titleSnapshot.forEach((doc) => {
      if (!resultsMap.has(doc.id)) {
        resultsMap.set(doc.id, { id: doc.id, ...doc.data() } as Package);
      }
    });

    destinationSnapshot.forEach((doc) => {
      if (!resultsMap.has(doc.id)) {
        resultsMap.set(doc.id, { id: doc.id, ...doc.data() } as Package);
      }
    });
    
    return Array.from(resultsMap.values());
  } catch (error) {
    console.error("Error searching packages:", error);
    return [];
  }
}
