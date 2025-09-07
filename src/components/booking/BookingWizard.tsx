'use client';

import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { X, ChevronLeft, ChevronRight, Check, Calendar, Users, CreditCard, MapPin, Plane, Star } from 'lucide-react';
import stripePromise from '@/lib/stripe';
import type { Package } from '@/types';
import { createBooking } from '@/lib/firebase-actions';
import StripePaymentForm from './StripePaymentForm';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface EnhancedBookingWizardProps {
  selectedPackage: Package | null;
  onClose: () => void;
}

const steps = [
  { id: 1, title: 'Package', icon: MapPin },
  { id: 2, title: 'Dates', icon: Calendar },
  { id: 3, title: 'Details', icon: Users },
  { id: 4, title: 'Payment', icon: CreditCard }
];

export default function BookingWizard({ selectedPackage, onClose }: EnhancedBookingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    travelers: 2,
    selectedDate: '',
    specialRequests: ''
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');
  const { toast } = useToast();

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    if (!selectedPackage) return;

    try {
      const bookingData = {
        ...formData,
        packageId: selectedPackage.id,
        packageName: selectedPackage.title,
        totalPrice: calculateTotalPrice(selectedPackage.price, formData.travelers),
        paymentIntentId,
        bookingDate: new Date().toISOString(),
      };
      const newBookingId = await createBooking(bookingData);

      if (newBookingId) {
        setBookingId(newBookingId);
        setPaymentSuccess(true);
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: 'Booking Error',
        description: 'Payment succeeded but booking creation failed. Please contact support.',
        variant: 'destructive',
      });
    }
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: 'Payment Failed',
      description: error,
      variant: 'destructive',
    });
  };
  
  const calculateTotalPrice = (basePrice: number, travelers: number): number => {
    const subtotal = basePrice * travelers;
    const serviceFee = 99;
    const stripeFee = Math.round(subtotal * 0.029 + 0.30);
    return subtotal + serviceFee + stripeFee;
  };

  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-background/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-6">
            Your adventure to {selectedPackage?.destination} is confirmed. 
            We've sent confirmation details to {formData.email}.
          </p>
          <div className="bg-card/50 rounded-xl p-4 mb-6 text-left border border-border">
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Booking ID:</span>
                <span className="text-foreground font-mono">{bookingId.slice(0, 8).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Package:</span>
                <span className="text-foreground">{selectedPackage?.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="text-foreground">{new Date(formData.selectedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <Button
            onClick={onClose}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3"
            size="lg"
          >
            Continue Exploring
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="w-full max-w-3xl rounded-3xl bg-background/80 backdrop-blur-xl border border-white/20 shadow-2xl max-h-[95vh] flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 bg-background/90 backdrop-blur-sm border-b border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                <Plane className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Book Your Adventure</h2>
                <p className="text-sm text-muted-foreground">Secure booking powered by Stripe</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <React.Fragment key={step.id}>
                    <div className={`flex items-center space-x-2 transition-all duration-300 ${
                        isActive ? 'text-primary' : isCompleted ? 'text-green-400' : 'text-muted-foreground'
                    }`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isActive ? 'border-primary bg-primary/20 scale-110' : 
                        isCompleted ? 'border-green-400 bg-green-400/20' : 'border-border'
                        }`}>
                        {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                        </div>
                        <span className="text-sm font-medium hidden sm:block">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-500 ${
                            isCompleted ? 'bg-gradient-to-r from-green-400 to-primary' : 'bg-border'
                        }`}></div>
                    )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6 overflow-y-auto">
          {/* Step 1: Package Overview */}
          {currentStep === 1 && selectedPackage && (
            <div className="space-y-6 animate-in fade-in-50">
              <h3 className="text-2xl font-bold text-foreground mb-6">Selected Package</h3>
              
              <div className="bg-gradient-to-r from-background to-muted/30 rounded-2xl p-6 border border-border/50">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <Image 
                      src={selectedPackage.image} 
                      alt={selectedPackage.title}
                      fill
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-foreground mb-2">{selectedPackage.title}</h4>
                    <p className="text-muted-foreground mb-3">{selectedPackage.destination} • {selectedPackage.duration}</p>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-muted-foreground">{selectedPackage.rating} ({selectedPackage.reviewCount} reviews)</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{selectedPackage.type}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">${selectedPackage.price.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">per person</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedPackage.highlights.slice(0, 4).map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-card/50 rounded-xl p-3 border border-border">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Dates */}
          {currentStep === 2 && selectedPackage && (
            <div className="space-y-6 animate-in fade-in-50">
              <h3 className="text-2xl font-bold text-foreground mb-6">Select Your Dates</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-muted-foreground mb-3">Departure Date</Label>
                  <Input
                    type="date"
                    value={formData.selectedDate}
                    onChange={(e) => setFormData({...formData, selectedDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-muted-foreground mb-3">Duration</Label>
                  <div className="h-10 px-3 py-2 rounded-md border border-input bg-background/50 text-muted-foreground text-sm flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    {selectedPackage.duration}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">Available Departures</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {selectedPackage.availableDates.map(date => (
                    <Button
                      key={date}
                      onClick={() => setFormData({...formData, selectedDate: date})}
                      variant={formData.selectedDate === date ? 'default' : 'outline'}
                      className="p-4 flex flex-col h-auto"
                    >
                      <div className="font-semibold">
                        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(date).getFullYear()}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Traveler Details */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in-50">
              <h3 className="text-2xl font-bold text-foreground mb-6">Traveler Information</h3>
              
              <div className="bg-card/50 rounded-2xl p-6 border border-border">
                <Label className="block text-lg font-semibold text-foreground mb-4">Number of Travelers</Label>
                <div className="flex items-center justify-center space-x-6">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-12 h-12 rounded-xl"
                    onClick={() => setFormData({...formData, travelers: Math.max(1, formData.travelers - 1)})}
                  >
                    <span className="text-xl">−</span>
                  </Button>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{formData.travelers}</div>
                    <div className="text-sm text-muted-foreground">travelers</div>
                  </div>
                   <Button
                    variant="outline"
                    size="icon"
                    className="w-12 h-12 rounded-xl"
                    onClick={() => setFormData({...formData, travelers: Math.min(10, formData.travelers + 1)})}
                  >
                    <span className="text-xl">+</span>
                  </Button>
                </div>
              </div>

              <div className="bg-card/50 rounded-2xl p-6 border border-border">
                <h4 className="text-lg font-semibold text-foreground mb-4">Contact Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="block text-sm font-medium text-muted-foreground mb-2">First Name</Label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-muted-foreground mb-2">Last Name</Label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      required
                      placeholder="Appleseed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="block text-sm font-medium text-muted-foreground mb-2">Email Address</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-muted-foreground mb-2">Phone Number</Label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-muted-foreground mb-2">Special Requests</Label>
                  <Textarea
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                    rows={3}
                    placeholder="Dietary restrictions, accessibility needs, etc."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && selectedPackage && (
            <div className="space-y-6 animate-in fade-in-50">
              <h3 className="text-2xl font-bold text-foreground mb-6">Secure Payment</h3>
              
              <Elements stripe={stripePromise}>
                <StripePaymentForm
                  package={selectedPackage}
                  travelers={formData.travelers}
                  customerInfo={formData}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </Elements>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-border mt-8">
            <Button 
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <div className="text-center">
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index + 1 <= currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>

            {currentStep < steps.length && (
              <Button
                onClick={nextStep}
                disabled={
                  (currentStep === 2 && !formData.selectedDate) ||
                  (currentStep === 3 && (!formData.firstName || !formData.lastName || !formData.email))
                }
              >
                Continue
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
