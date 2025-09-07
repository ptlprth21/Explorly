
'use server';

import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Assumes db is exported from firebase.ts
import type { Package, Review, BookingData } from '@/types';
import { getAuth } from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);


export async function createBooking(bookingData: Omit<BookingData, 'packageName' | 'totalPrice' | 'userId'> & { package: Package }): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('You must be logged in to book a trip.');
  }

  try {
    const bookingsCollection = collection(db, 'bookings');
    const { package: pkg, ...restOfBookingData } = bookingData;

    // This calculation must match the one in StripePaymentForm.tsx
    const subtotal = pkg.price * bookingData.travelers;
    const serviceFee = 99; // Fixed service fee
    const stripeFee = Math.round(subtotal * 0.029 + 30); // Stripe fee (2.9% + €0.30)
    const totalPrice = subtotal + serviceFee + stripeFee;

    const docRef = await addDoc(bookingsCollection, {
      ...restOfBookingData,
      userId: user.uid, // Add the user's ID
      packageName: pkg.title,
      packageId: pkg.id,
      packageImage: pkg.image,
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

export async function getBookingsForUser(userId: string): Promise<BookingData[]> {
    const bookingsCollection = collection(db, 'bookings');
    const q = query(bookingsCollection, where('userId', '==', userId));

    try {
        const querySnapshot = await getDocs(q);
        const bookings: BookingData[] = [];
        querySnapshot.forEach((doc) => {
            bookings.push({ id: doc.id, ...doc.data() } as BookingData);
        });
        return bookings;
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        return [];
    }
}
