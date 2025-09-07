'use server';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase'; // Assumes db is exported from firebase.ts

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
  paymentIntentId: string;
  specialRequests?: string;
  bookingDate?: string; // Will be converted to server timestamp
}

export async function createBooking(bookingData: BookingData): Promise<string | null> {
  try {
    const bookingsCollection = collection(db, 'bookings');
    const docRef = await addDoc(bookingsCollection, {
      ...bookingData,
      bookingDate: serverTimestamp(),
      status: 'confirmed',
    });
    console.log('Booking created with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    return null;
  }
}
