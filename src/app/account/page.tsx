
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getBookingsForUser } from '@/lib/firebase-actions';
import type { BookingData, Package } from '@/types';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, PlaneTakeoff, User, LogOut, Briefcase, Settings, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { getPackageById } from '@/lib/data';
import PackageGrid from '@/components/packages/PackageGrid';

export default function AccountPage() {
  const { user, signOut, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const { wishlist } = useWishlist();
  const [wishlistPackages, setWishlistPackages] = useState<Package[]>([]);
  const [loadingWishlist, setLoadingWishlist] = useState(true);

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

   useEffect(() => {
    const fetchWishlistPackages = async () => {
      setLoadingWishlist(true);
      const packages = await Promise.all(
        wishlist.map(id => getPackageById(id))
      );
      setWishlistPackages(packages.filter((p): p is Package => !!p));
      setLoadingWishlist(false);
    };

    if (wishlist.length > 0) {
      fetchWishlistPackages();
    } else {
        setWishlistPackages([]);
        setLoadingWishlist(false);
    }
  }, [wishlist]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Container className="py-16">
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <Card className="sticky top-24">
            <CardHeader className="text-center">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary">
                    <User className="h-12 w-12 text-primary" />
                </div>
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
           <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bookings">
                <Briefcase className="mr-2 h-4 w-4" />
                My Bookings
              </TabsTrigger>
               <TabsTrigger value="wishlist">
                <Heart className="mr-2 h-4 w-4" />
                My Wishlist
              </TabsTrigger>
              <TabsTrigger value="profile">
                <Settings className="mr-2 h-4 w-4" />
                My Profile
              </TabsTrigger>
            </TabsList>
            <TabsContent value="bookings" className="mt-6">
                <h2 className="text-3xl font-bold mb-6">My Bookings</h2>
                 {loadingBookings ? (
                    <div className="text-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="mt-2 text-muted-foreground">Loading your adventures...</p>
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
                            <p className="text-lg font-semibold text-primary mt-4">€{booking.totalPrice.toLocaleString()}</p>
                            <Button asChild variant="outline" className="mt-4">
                                <Link href={`/packages/${booking.packageId}`}>View Package</Link>
                            </Button>
                            </div>
                        </div>
                        </Card>
                    ))}
                    </div>
                )}
            </TabsContent>
             <TabsContent value="wishlist" className="mt-6">
              <h2 className="text-3xl font-bold mb-6">My Wishlist</h2>
              {loadingWishlist ? (
                 <div className="text-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="mt-2 text-muted-foreground">Loading your wishlist...</p>
                </div>
              ) : wishlistPackages.length === 0 ? (
                <Card className="text-center p-8">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Your Wishlist is Empty</h3>
                  <p className="text-muted-foreground mb-4">Find trips you love and add them here to plan your next adventure.</p>
                  <Button asChild>
                    <Link href="/destinations">Explore Destinations</Link>
                  </Button>
                </Card>
              ) : (
                <PackageGrid packages={wishlistPackages} />
              )}
            </TabsContent>
            <TabsContent value="profile" className="mt-6">
                 <h2 className="text-3xl font-bold mb-6">My Profile</h2>
                 <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Manage your account details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="displayName">Display Name</Label>
                            <Input id="displayName" defaultValue={user.displayName || 'Adventurer'} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={user.email || ''} readOnly />
                        </div>
                         <Button disabled>Update Profile</Button>
                    </CardContent>
                 </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Container>
  );
}
