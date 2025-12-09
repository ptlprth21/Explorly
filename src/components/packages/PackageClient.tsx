"use client";

import Image from "next/image";
import { Package } from "@/types";
import { ArrowLeft, CalendarIcon, Check, CheckCircle, Clock, Heart, MapPin, XCircle } from "lucide-react";
import { useState } from "react";
import PackageGallery from "./PackageGallery";
import FirebaseReviews from "./FirebaseReviews";
import { Button } from '@/components/ui/button';
import { useBookingWizard } from "@/context/BookingWizardContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from '@/components/ui/calendar';
import { useAuth } from "@/context/AuthContext";


interface Props {
  pkg: Package;
}

export default function PackageClient({ pkg }: Props) {
    const [activeTab, setActiveTab] = useState('overview');
    const wizard = useBookingWizard();
    const wishlistContext = useWishlist();
    const router = useRouter();
    const isWishlisted = wishlistContext?.wishlist.includes(pkg.id) ?? false;
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'itinerary', label: 'Itinerary' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'reviews', label: 'Reviews' }
    ];
    
    // Handlers with safety checks
    const handleBookNow = (isDeposit: boolean) => {
        if (!wizard) {
            console.error("Booking wizard context not available!");
            // Optionally, show a toast notification to the user
            return;
        }

        if (isDeposit) {
            const depositPrice = pkg.price * 0.2;
            wizard.openWizard({ ...pkg, price: depositPrice });
        } else {
            wizard.openWizard(pkg);
        }
    };

    const handleWishlistToggle = () => {
        if (!user) {
            router.push("/login");
            return;
        }
        if (!wishlistContext) {
            console.error("Wishlist context not available!");
            return;
        }
        wishlistContext.toggleWishlist(pkg.id);
    };

    const itineraries = pkg.itineraries ?? [];
    const galleryImages = pkg.gallery ?? [];

    return (
    <>
        <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-background/80 backdrop-blur-md sticky top-16 z-40 border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
            </button>
            </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
            <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="w-full h-full object-cover"
            priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{pkg.title}</h1>
            <div>
                <h3 className="font-bold mb-2">{pkg.tagline}</h3>
            </div>
            <div className="flex items-center space-x-4 text-lg">
                <div className="flex items-center space-x-1">
                <MapPin className="h-5 w-5" />
                <span>{pkg.destination}</span>
                </div>
                <div className="flex items-center space-x-1">
                <Clock className="h-5 w-5" />
                <span>{pkg.duration}</span>
                </div>
            </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
                {/* Tabs */}
                <div className="bg-card rounded-xl shadow-sm mb-8">
                <div className="border-b border-border">
                    <nav className="flex space-x-8 px-6">
                    {tabs.map((tab) => (
                        <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeTab === tab.id
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                        >
                        {tab.label}
                        </button>
                    ))}
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                    <div className="space-y-6 prose prose-invert max-w-none">
                        <div>
                        <h3 className="text-xl font-semibold mb-3">About This Trip</h3>
                        <p className="text-muted-foreground leading-relaxed">{pkg.description}</p>
                        </div>
                        
                        <div>
                        <h3 className="text-xl font-semibold mb-3">Highlights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {(pkg.highlights ?? []).map((highlight, index) => (
                            <div key={index} className="flex items-start space-x-2">
                                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-foreground">{highlight}</span>
                            </div>
                            ))}
                        </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">Included</h3>
                            <div className="space-y-2">
                            {(pkg.inclusions ?? []).map((item, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-sm text-foreground">{item}</span>
                                </div>
                            ))}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Not Included</h3>
                            <div className="space-y-2">
                            {(pkg.exclusions ?? []).map((item, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                <XCircle className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                                <span className="text-sm text-foreground">{item}</span>
                                </div>
                            ))}
                            </div>
                        </div>
                        </div>
                    </div>
                    )}
                    
                    {activeTab === 'itinerary' && (
                        <div className="space-y-8">
                        {itineraries.map((step, index) => (
                            <div key={step.day} className="relative pl-16">
                                <div className="absolute left-6 top-0 w-12 h-12 bg-primary/20 border-2 border-primary/50 text-primary rounded-full flex items-center justify-center font-bold text-lg">
                                    {step.day}
                                </div>
                                {index < itineraries.length - 1 && (
                                <div className="absolute left-12 top-12 w-px bg-border"
                                        style={{
                                        height: 'calc(100% - 12px)',
                                        transform: 'translateX(-50%)'
                                        }}></div>
                                )}
                                
                                <div className="ml-4">
                                    <h4 className="font-bold text-xl mb-1 text-foreground">{step.title}</h4>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    )}
                    {activeTab === 'gallery' && <PackageGallery images={[...galleryImages]} title={pkg.title} />}
                    {activeTab === 'reviews' && <FirebaseReviews packageId={pkg.id} rating={0} reviewCount={0} />}
                </div>
                </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
                <div className="bg-card rounded-xl shadow-sm p-6 sticky top-24">
                <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-foreground">
                    €{pkg.price.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground">per person</div>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <span className="font-medium">{pkg.difficulty}</span>
                    </div>
                </div>

                <Button
                    onClick={() => handleBookNow(false)}
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mb-4"
                >
                    Book This Trip
                </Button>

                <Button
                    onClick={() => handleBookNow(true)}
                    size="lg"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white mb-4"
                >
                    Reserve This Trip (20%)
                </Button>

                <Button variant="outline" className="w-full" onClick={handleWishlistToggle}>
                    <Heart className={`mr-2 h-4 w-4 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                    {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>

                <div className="mt-6 pt-6 border-t border-border">
                    <div className="space-y-2">
                    <Popover>
                        <PopoverTrigger asChild>
                        <button
                            className={`
                            w-full px-3 py-2 rounded-lg flex items-center justify-between
                            border "bg-neutral-800/60 border-neutral-700 text-foreground hover:bg-neutral-700/60"
                            `}
                        >
                            {selectedDate ? selectedDate.toLocaleDateString() : "Choose your start date"}
                            <CalendarIcon className="h-4 w-4 opacity-70" />
                        </button>
                        </PopoverTrigger>
                        
                        <PopoverContent className="bg-neutral-900 border border-neutral-700 p-2 rounded-xl">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            className="rounded-md"
                        />
                        </PopoverContent>
                    </Popover>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </>
  );
}
