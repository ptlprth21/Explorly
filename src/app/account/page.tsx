'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getBookingsForUser } from '@/lib/supabase-actions';
import type { BookingData, Package } from '@/types';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, PlaneTakeoff, User, LogOut, Briefcase, Settings, Heart, Bell, Wallet, Shield, MapPin, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { getPackageById } from '@/lib/data';
import PackageGrid from '@/components/packages/PackageGrid';
import { Switch } from '@/components/ui/switch';
import { updateUserProfile, deleteUserAccount } from '@/lib/user-profile';
import { getUserNotificationSettings, updateUserNotificationSettings } from '@/actions/notifications';
import { createClientSupabase } from '@/lib/supabase/client';

export default function AccountPage() {
  const { user, signOut, loading: authLoading } = useAuth();
  const router = useRouter();
  const supabase = createClientSupabase();
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const { wishlist, toggleWishlist } = useWishlist();
  const [wishlistPackages, setWishlistPackages] = useState<Package[]>([]);
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  const [activeSection, setActiveSection] = useState("profile");
  const [notifyEmail, setNotifyEmail] = useState(false);
  const [notifyInApp, setNotifyInApp] = useState(true);
  
  // set user properties
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (user) {
      setDisplayName(user.user_metadata.full_name || '');
      setEmail(user.email || '');
      setPhotoURL(user.user_metadata.picture || '');
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchNotificationSettings = async () => {
      if (!user || !user.id) return;
      try {
        const settings = await getUserNotificationSettings(user.id);
        setNotifyInApp(settings.notify_in_app);
        setNotifyEmail(settings.notify_email);
      } catch (error) {
        console.error('Error fetching notification settings:', error);
      }
    };
    fetchNotificationSettings();
  }, [user]);

  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        setLoadingBookings(true);
        const userBookings = await getBookingsForUser(user.id);
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

  const handleToggleNotifyEmail = async (value: boolean) => {
    if (!user || !user.id) return; 

    try {
        await updateUserNotificationSettings(user.id, notifyInApp, value); 
        setNotifyEmail(value);
      } catch (error) {
        console.error('Failed to update email notification setting:', error);
      }
  };

  const handleToggleNotifyInApp = async (value: boolean) => {
    if (!user || !user.id) return; 
    
    try {
      await updateUserNotificationSettings(user.id, value, notifyEmail);
      setNotifyInApp(value);
    } catch (error) {
      console.error('Failed to update in-app notification setting:', error);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  const handleUpdateProfile = async () => {
    try {
      if (displayName !== user.user_metadata.full_name || photoURL !== user.user_metadata.picture) {
        await updateUserProfile(user, displayName, photoURL);
        //alert("Perfil actualizado correctamente");
      }
    } catch (error) {
      // console.error(error);
      // alert("Error actualizando el perfil");
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const confirmed = confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (!confirmed) return;

    try {
      await deleteUserAccount();
      alert('Your account has been successfully deleted.');
      // Log the user out and redirect
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error: any) {
      console.error('Failed to delete account:', error);
      alert('Failed to delete account: ' + error.message);
    }
  };

  return (
    <Container className="py-16">
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">

        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <Card className="sticky top-24">
            <CardContent className="space-y-2 p-4">
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeSection === "profile" && "bg-muted"}`}
                onClick={() => setActiveSection("profile")}
              >
                <Settings className="mr-2 h-4 w-4" />
                My Profile
              </Button>

              <Button
                variant="ghost"
                className={`w-full justify-start ${activeSection === "bookings" && "bg-muted"}`}
                onClick={() => setActiveSection("bookings")}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                My Bookings
              </Button>

              <Button
                variant="ghost"
                className={`w-full justify-start ${activeSection === "wishlist" && "bg-muted"}`}
                onClick={() => setActiveSection("wishlist")}
              >
                <Heart className="mr-2 h-4 w-4" />
                My Wishlist
              </Button>

              <Button
                variant="ghost"
                className={`w-full justify-start ${activeSection === "wallet" && "bg-muted"}`}
                onClick={() => setActiveSection("wallet")}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Wallet & Vouchers
              </Button>

              <Button
                variant="ghost"
                className={`w-full justify-start ${activeSection === "notifications" && "bg-muted"}`}
                onClick={() => setActiveSection("notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>

              <Button onClick={signOut} variant="outline" className="w-full mt-4">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>

              <Button
                variant="link"
                className="w-full text-left text-red-600 hover:text-red-700 mt-2"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Dynamic Content */}
        <div className="w-full md:w-3/4">

          {activeSection === "bookings" && (
            <div className="mt-6">
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
            </div>
          )}


          {activeSection === "wishlist" && (
            <div className="mt-6">
              <Card className="p-6 space-y-4">
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                  <CardDescription>Your saved adventures. Ready to make one a reality?</CardDescription>
                </CardHeader>

                {loadingWishlist ? (
                  <div className="text-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="mt-2 text-muted-foreground">Loading your wishlist...</p>
                  </div>
                ) : wishlistPackages.length === 0 ? (
                  <div className="text-center p-8">
                    <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <CardTitle>Your Wishlist is Empty</CardTitle>
                    <CardDescription>
                      Find trips you love and add them here to plan your next adventure.
                    </CardDescription>
                    <Button asChild className="mt-4">
                      <Link href="/destinations">Explore Destinations</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistPackages.map((pkg) => (
                      <Card key={pkg.id} className="relative overflow-hidden group">
                        <button
                          onClick={() => toggleWishlist(pkg.id)}
                          className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition opacity-80 hover:opacity-100"
                        >
                          &times;
                        </button>

                        <div className="relative h-48 w-full">
                          <Image
                            src={pkg.image}
                            alt={pkg.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div className="p-4 space-y-1">
                          <CardHeader>
                            <CardTitle>{pkg.title}</CardTitle>
                            <CardDescription className="text-sm text-gray-400 flex items-center gap-1">
                              <MapPin className="w-4 h-4" /> {pkg.destination} • {pkg.duration} Days
                            </CardDescription>
                          </CardHeader>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-primary font-bold text-lg">€{pkg.price}</span>
                            <Button asChild size="sm">
                              <Link href={`/packages/${pkg.id}`}>View Details →</Link>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          )}

          {activeSection === "profile" && (
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your public profile and personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img className="rounded-full" src={photoURL} alt="user image" />

                    <div className="flex flex-col">
                      <span className="text-lg font-bold">{user.user_metadata.full_name}</span>
                      <span className="text-sm text-muted-foreground">{user.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input id="displayName" value={displayName} onChange={e => setDisplayName(e.target.value)}/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={email} onChange={e => setEmail(e.target.value)} disabled/>
                  </div>
                  <Button onClick={handleUpdateProfile} disabled={displayName === user.user_metadata.full_name && email === user.email}>
                    Update Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "wallet" && (
            <div className="mt-6 space-y-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>My Wallet</CardTitle>
                  <CardDescription>Your current balance and active vouchers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                  <div className="bg-card border border-[var(--border)] p-4 rounded-md flex items-center gap-4">
                    <Wallet className="w-6 h-6 text-teal-400" />
                    <div>
                      <p className="text-sm text-muted-foreground">Current Balance</p>
                      <p className="text-xl font-bold">€0.00</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Active Vouchers</h4>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}


          {activeSection === "notifications" && (
            <div className="mt-6">
              <Card className="p-6 space-y-6">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how we communicate with you.</CardDescription>
                </CardHeader>

                <div className="flex items-center justify-between p-4 border rounded-md bg-muted">
                  <div className="flex flex-col">
                    <span className="font-semibold">Promotional Emails</span>
                    <span className="text-sm text-muted-foreground">
                      Receive updates on new destinations and special offers.
                    </span>
                  </div>
                  <Switch checked={notifyEmail} onCheckedChange={handleToggleNotifyEmail} />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md bg-muted">
                  <div className="flex flex-col">
                    <span className="font-semibold">Booking Updates</span>
                    <span className="text-sm text-muted-foreground">
                      Get important notifications about your upcoming trips.
                    </span>
                  </div>
                  <Switch checked={notifyInApp} onCheckedChange={handleToggleNotifyInApp} />
                </div>
              </Card>
            </div>
          )}

        </div>

      </div>
    </Container>

  );
}

