'use client';

import { Package } from '@/types';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { Calendar, Users, CreditCard, ArrowLeft, PartyPopper } from 'lucide-react';
import Image from 'next/image';

interface BookingWizardProps {
  package: Package;
}

type Step = 'selection' | 'information' | 'payment' | 'confirmation';

const BookingWizard = ({ package: pkg }: BookingWizardProps) => {
  const [step, setStep] = useState<Step>('selection');
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState(2);

  const totalPrice = pkg.price * travelers;

  const progressValue = {
    selection: 33,
    information: 66,
    payment: 100,
    confirmation: 100,
  }[step];

  const renderStep = () => {
    switch (step) {
      case 'selection':
        return (
          <>
            <CardHeader>
              <CardTitle>Step 1: Customize Your Trip</CardTitle>
              <CardDescription>Select your travel date and number of guests.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="travel-date">Travel Date</Label>
                <Select onValueChange={setTravelDate} value={travelDate}>
                  <SelectTrigger id="travel-date" className="h-12">
                    <div className='flex items-center gap-2'>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Choose a date" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {pkg.availableDates.map(date => (
                      <SelectItem key={date} value={date}>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="travelers">Number of Travelers</Label>
                <div className='flex items-center gap-4'>
                    <Button variant="outline" onClick={() => setTravelers(t => Math.max(1, t - 1))}>-</Button>
                    <span className="font-bold text-lg w-8 text-center">{travelers}</span>
                    <Button variant="outline" onClick={() => setTravelers(t => t + 1)}>+</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button size="lg" onClick={() => setStep('information')} disabled={!travelDate}>Next: Your Information</Button>
            </CardFooter>
          </>
        );
      case 'information':
        return (
          <>
            <CardHeader>
              <CardTitle>Step 2: Traveler Information</CardTitle>
              <CardDescription>Please enter the details for the lead traveler.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" className="h-12"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" className="h-12"/>
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" className="h-12"/>
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="h-12"/>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('selection')}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
              <Button size="lg" onClick={() => setStep('payment')}>Next: Payment</Button>
            </CardFooter>
          </>
        );
      case 'payment':
        return (
            <>
                <CardHeader>
                    <CardTitle>Step 3: Secure Payment</CardTitle>
                    <CardDescription>Enter your payment details to complete the booking.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <div className="relative">
                            <Input id="card-number" placeholder="•••• •••• •••• ••••" className="pl-10 h-12"/>
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiry-date">Expiry Date</Label>
                            <Input id="expiry-date" placeholder="MM / YY" className="h-12"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" className="h-12"/>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name-on-card">Name on Card</Label>
                        <Input id="name-on-card" placeholder="John M. Doe" className="h-12"/>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep('information')}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setStep('confirmation')}>
                        Pay ${totalPrice.toLocaleString()}
                    </Button>
                </CardFooter>
            </>
        );
        case 'confirmation':
            return (
                <CardContent className="flex flex-col items-center justify-center text-center py-16">
                    <PartyPopper className="w-16 h-16 text-accent mb-4" />
                    <h2 className="text-3xl font-bold font-headline">Booking Confirmed!</h2>
                    <p className="text-muted-foreground mt-2 max-w-md">
                        Thank you for booking with RoamReady. Your adventure to {pkg.destination} awaits! A confirmation email with all your trip details has been sent to you.
                    </p>
                    <Button size="lg" className="mt-8" onClick={() => window.location.href='/'}>Explore More Trips</Button>
                </CardContent>
            )
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="min-h-[600px] flex flex-col">
            <div className="p-6">
              <Progress value={progressValue} className="w-full" />
            </div>
            <div className="flex-grow flex flex-col justify-center">
              {renderStep()}
            </div>
        </Card>
      </div>

      <aside className="lg:col-span-1 space-y-8">
        <Card className="sticky top-24">
            <CardHeader>
                <div className="relative aspect-video rounded-md overflow-hidden">
                    <Image src={pkg.image} alt={pkg.title} fill className='object-cover' data-ai-hint='travel landscape' />
                </div>
                <CardTitle className="mt-4">{pkg.title}</CardTitle>
                <CardDescription>{pkg.destination}, {pkg.country}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{travelDate ? new Date(travelDate).toLocaleDateString() : 'Not selected'}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Travelers</span>
                    <span className="font-medium">{travelers}</span>
                </div>
                <div className="border-t border-border my-2"></div>
                <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Price</span>
                    <span className="text-primary">${totalPrice.toLocaleString()}</span>
                </div>
            </CardContent>
        </Card>
      </aside>
    </div>
  );
};

export default BookingWizard;
