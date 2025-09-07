
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getBookingsForUser } from '@/lib/firebase-actions';
import type { BookingData } from '@/types';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, PlaneTakeoff, User, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AccountPage() {
  const { user, signOut, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        setLoadingBookings(true);
        const userBookings = await getBookingsForUser(user.uid);
        setBookings(userBookings);
        setLoadingBookings(false);
      };
      fetchBookings();
    }
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Container className="py-16">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader className="text-center">
              <User className="h-16 w-16 mx-auto mb-4 text-primary" />
              <CardTitle>My Account</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={signOut} variant="outline" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <h2 className="text-3xl font-bold mb-6">My Bookings</h2>
          {loadingBookings ? (
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Loading your adventures...</p>
            </div>
          ) : bookings.length === 0 ? (
            <Card className="text-center p-8">
              <PlaneTakeoff className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Adventures Booked Yet</h3>
              <p className="text-muted-foreground mb-4">Your next great story is just a click away.</p>
              <Button asChild>
                <Link href="/destinations">Explore Destinations</Link>
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative h-48 sm:h-auto sm:w-1/3">
                       <Image src={booking.packageImage} alt={booking.packageName} fill className="object-cover"/>
                    </div>
                    <div className="flex-1 p-6">
                      <CardTitle className="mb-2 text-xl">{booking.packageName}</CardTitle>
                      <p className="text-sm text-muted-foreground">Booked for: {new Date(booking.selectedDate).toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground">Travelers: {booking.travelers}</p>
                      <p className="text-lg font-semibold text-primary mt-4">${booking.totalPrice.toLocaleString()}</p>
                       <Button asChild variant="outline" className="mt-4">
                        <Link href={`/packages/${booking.packageId}`}>View Package</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
