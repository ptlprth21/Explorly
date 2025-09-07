'use server';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase'; // Assumes db is exported from firebase.ts
import type { Package } from '@/types';

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
  bookingDate?: string; // Will be converted to server timestamp
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
      status: 'pending', // Changed from 'confirmed' to 'pending'
    });
    console.log('Booking request created with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    return null;
  }
}
