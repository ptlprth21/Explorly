'use server';

//import { supabase } from './supabase';
import { createServerSupabase } from '@/lib/supabase/server';
import type { Package, Review, BookingData } from '@/types';
import { use } from 'react';

async function getCurrentUserId(): Promise<string> {
  const supabase = createServerSupabase();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('User not authenticated');
  return user.id;
}

export async function createBooking(
  bookingData: Omit<BookingData, 'packageName' | 'totalPrice' | 'userId'> & { package: Package }
): Promise<string | null> {
  const supabase = createServerSupabase();
  const userId = await getCurrentUserId();

  try {
    const { package: pkg, ...rest } = bookingData;
    const subtotal = pkg.price * bookingData.travelers;
    const serviceFee = 99;
    const stripeFee = Math.round(subtotal * 0.029 + 30);
    const totalPrice = subtotal + serviceFee + stripeFee;

    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        ...rest,
        user_id: userId,
        package_name: pkg.title,
        package_id: pkg.id,
        package_image: pkg.image,
        total_price: totalPrice,
        booking_date: new Date().toISOString(),
        status: 'confirmed'
      }])
      .select();

    if (error) throw error;
    return data?.[0]?.id ?? null;
  } catch (e) {
    console.error('Error creating booking:', e);
    return null;
  }
}

export type NewReviewData = Omit<Review, 'id'>;

export async function addReview(reviewData: NewReviewData): Promise<string | null> {
  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from('reviews')
      .insert([{
        ...reviewData,
        date: new Date().toISOString()
      }])
      .select();

    if (error) throw error;
    return data?.[0]?.id ?? null;
  } catch (e) {
    console.error('Error adding review:', e);
    return null;
  }
}

export async function getBookingsForUser(): Promise<BookingData[]> {
  const userId = await getCurrentUserId();
  const supabase = createServerSupabase();

  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data as BookingData[];
  } catch (e) {
    console.error('Error fetching bookings:', e);
    return [];
  }
}