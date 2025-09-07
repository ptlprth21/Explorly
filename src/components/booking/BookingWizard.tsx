'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Check, Calendar, Users, CreditCard, MapPin, Star, Loader2 } from 'lucide-react';
import type { Package } from '@/types';
import { createBooking } from '@/lib/firebase-actions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import Image from 'next/image';

interface BookingWizardProps {
  selectedPackage: Package | null;
  onClose: () => void;
}

const steps = [
  { id: 1, title: 'Package', icon: MapPin },
  { id: 2, title: 'Dates', icon: Calendar },
  { id: 3, title: 'Details', icon: Users },
  { id: 4, title: 'Confirm', icon: Check }
];

export default function BookingWizard({ selectedPackage, onClose }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    travelers: 2,
    selectedDate: '',
    specialRequests: ''
  });

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

  const handleSubmit = async () => {
    if (!selectedPackage) return;
    
    setLoading(true);
    try {
      const bookingId = await createBooking({
        ...formData,
        packageId: selectedPackage.id,
        package: selectedPackage,
      });
      
      if (bookingId) {
        toast({
            title: 'Booking Request Sent!',
            description: "We've received your request and will contact you within 24 hours to confirm.",
        });
        onClose();
      } else {
        toast({
            title: 'Booking Failed',
            description: 'Failed to create booking. Please try again.',
            variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: 'An Error Occurred',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="w-full max-w-3xl rounded-3xl bg-background/80 backdrop-blur-xl border border-white/20 shadow-2xl max-h-[95vh] flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 bg-background/90 backdrop-blur-sm border-b border-white/20 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Book Your Adventure</h2>
            <Button 
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-6 w-6" />
            </Button>
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
          {/* Step 1: Package Info */}
          {currentStep === 1 && selectedPackage && (
            <div className="space-y-6 animate-in fade-in-50">
              <h3 className="text-xl font-bold text-white mb-4">Selected Package</h3>
              <div className="bg-card/50 rounded-xl p-4 border border-border">
                <div className="flex items-center space-x-4">
                  <Image 
                    src={selectedPackage.image} 
                    alt={selectedPackage.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{selectedPackage.title}</h4>
                    <p className="text-sm text-muted-foreground">{selectedPackage.destination} • {selectedPackage.duration}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-muted-foreground">{selectedPackage.rating} ({selectedPackage.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">${selectedPackage.price.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">per person</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Select Dates */}
          {currentStep === 2 && selectedPackage && (
            <div className="space-y-6 animate-in fade-in-50">
              <h3 className="text-xl font-bold text-white mb-4">Select Your Dates</h3>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Departure Date</label>
                <Input
                  type="date"
                  value={formData.selectedDate}
                  onChange={(e) => setFormData({...formData, selectedDate: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Available Departures</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {selectedPackage.availableDates.map(date => (
                    <Button
                      key={date}
                      onClick={() => setFormData({...formData, selectedDate: date})}
                      variant={formData.selectedDate === date ? 'default' : 'outline'}
                      className="p-3 h-auto flex flex-col"
                    >
                      <span className="font-semibold">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span className="text-xs">{new Date(date).getFullYear()}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Traveler Details */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in-50">
              <h3 className="text-xl font-bold text-white mb-4">Traveler Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Number of Travelers</label>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setFormData({...formData, travelers: Math.max(1, formData.travelers - 1)})}
                  >
                    <span>−</span>
                  </Button>
                  <span className="text-xl font-semibold text-white w-8 text-center">{formData.travelers}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setFormData({...formData, travelers: Math.min(10, formData.travelers + 1)})}
                  >
                    <span>+</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">First Name</label>
                  <Input value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Last Name</label>
                  <Input value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                  <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Phone</label>
                  <Input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Special Requests</label>
                <Textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                  rows={3}
                  placeholder="Dietary restrictions, accessibility needs, etc."
                />
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && selectedPackage && (
            <div className="space-y-6 animate-in fade-in-50">
              <h3 className="text-xl font-bold text-white mb-4">Booking Summary</h3>
              
              <div className="bg-card/50 rounded-xl p-4 border border-border">
                <h4 className="font-semibold text-white mb-3">Trip Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Package:</span><span className="text-foreground">{selectedPackage.title}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Date:</span><span className="text-foreground">{formData.selectedDate}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Travelers:</span><span className="text-foreground">{formData.travelers} guests</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Duration:</span><span className="text-foreground">{selectedPackage.duration}</span></div>
                </div>
              </div>

              <div className="bg-card/50 rounded-xl p-4 border border-border">
                <h4 className="font-semibold text-white mb-3">Price Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Base price:</span><span className="text-foreground">${(selectedPackage.price * formData.travelers).toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Service fee:</span><span className="text-foreground">$99</span></div>
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-foreground">Total:</span>
                      <span className="text-primary text-lg">${(selectedPackage.price * formData.travelers + 99).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-border mt-6">
            <Button 
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {currentStep < steps.length ? (
              <Button 
                onClick={nextStep}
                disabled={
                  (currentStep === 2 && !formData.selectedDate) ||
                  (currentStep === 3 && (!formData.firstName || !formData.lastName || !formData.email))
                }
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-600 hover:bg-green-500"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
