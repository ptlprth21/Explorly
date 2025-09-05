
'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check, Calendar, Users, CreditCard, MapPin } from 'lucide-react';
import type { Package, ContinentName } from '@/types';
import { getPackages } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface BookingWizardProps {
  selectedPackage: Package | null;
  onClose: () => void;
}

const steps = [
  { id: 1, title: 'Choose Package', icon: MapPin },
  { id: 2, title: 'Select Dates', icon: Calendar },
  { id: 3, title: 'Travelers', icon: Users },
  { id: 4, title: 'Payment', icon: CreditCard }
];

export default function BookingWizard({ selectedPackage, onClose }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [allPackages, setAllPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPackages = async () => {
      const pkgs = await getPackages();
      setAllPackages(pkgs);
      setIsLoading(false);
    };
    fetchPackages();
  }, []);

  const [formData, setFormData] = useState({
    packageId: selectedPackage?.id || '',
    continent: selectedPackage?.continent || ('' as ContinentName | ''),
    date: '',
    guests: 2,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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

  const handleSubmit = () => {
    toast({
      title: "Booking Confirmed!",
      description: "Your adventure awaits. We've sent a confirmation to your email.",
      variant: 'default',
    });
    onClose();
  };

  const continents = [...new Set(allPackages.map(p => p.continent))];
  const selectedPkg = allPackages.find(pkg => pkg.id === formData.packageId);
  const availablePackages = formData.continent ? 
    allPackages.filter(pkg => pkg.continent === formData.continent) : allPackages;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="w-full max-w-2xl rounded-2xl bg-background/80 backdrop-blur-xl border border-white/20 shadow-2xl max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-white/20 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Book Your Adventure</h2>
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
                  <div className={`flex items-center space-x-2 transition-colors duration-300 ${
                    isActive ? 'text-primary' : isCompleted ? 'text-green-400' : 'text-muted-foreground'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isActive ? 'border-primary bg-primary/20' : 
                      isCompleted ? 'border-green-400 bg-green-400/20' : 'border-border'
                    }`}>
                      {isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <span className="text-sm font-medium hidden sm:block">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 transition-colors duration-500 ${
                      isCompleted ? 'bg-green-400' : 'bg-border'
                    }`}></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6 overflow-y-auto">
          {isLoading ? (
            <div className="text-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading packages...</p>
            </div>
          ) : (
            <>
            {/* Step 1: Choose Package */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in-50">
                <h3 className="text-xl font-bold text-foreground mb-4">Choose Your Destination</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Select Continent</label>
                  <Select
                    value={formData.continent}
                    onValueChange={(value) => setFormData({...formData, continent: value as ContinentName, packageId: ''})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Continents" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Continents</SelectItem>
                      {continents.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-4 max-h-96 overflow-y-auto pr-2">
                  {availablePackages.map(pkg => (
                    <label key={pkg.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="package"
                        value={pkg.id}
                        checked={formData.packageId === pkg.id}
                        onChange={(e) => setFormData({...formData, packageId: e.target.value})}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-xl border transition-all ${
                        formData.packageId === pkg.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border bg-card/50 hover:border-muted-foreground'
                      }`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-foreground">{pkg.title}</h4>
                            <p className="text-sm text-muted-foreground">{pkg.country} • {pkg.duration}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">${pkg.price}</div>
                            <div className="text-xs text-muted-foreground">per person</div>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Dates */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in-50">
                <h3 className="text-xl font-bold text-foreground mb-4">Select Your Dates</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Departure Date</label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Duration</label>
                    <div className="h-10 px-3 py-2 rounded-md border border-input bg-background/50 text-muted-foreground text-sm flex items-center">
                      {selectedPkg?.duration || 'Select package first'}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Available Departures</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {selectedPkg?.availableDates.map(date => (
                      <Button
                        key={date}
                        onClick={() => setFormData({...formData, date})}
                        variant={formData.date === date ? "default" : "outline"}
                      >
                        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Travelers */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in-50">
                <h3 className="text-xl font-bold text-foreground mb-4">Traveler Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Number of Travelers</label>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setFormData({...formData, guests: Math.max(1, formData.guests - 1)})}
                    >
                      −
                    </Button>
                    <span className="text-xl font-semibold text-foreground w-8 text-center">{formData.guests}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setFormData({...formData, guests: Math.min(10, formData.guests + 1)})}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">First Name</label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Last Name</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      required
                      placeholder="Appleseed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Phone</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="(555) 123-4567"
                    />
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

            {/* Step 4: Payment Summary */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in-50">
                <h3 className="text-xl font-bold text-foreground mb-4">Booking Summary</h3>
                
                <div className="bg-card/50 rounded-xl p-4 border border-border">
                  <h4 className="font-semibold text-foreground mb-3">Trip Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Package:</span>
                      <span className="text-foreground">{selectedPkg?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="text-foreground">{new Date(formData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Travelers:</span>
                      <span className="text-foreground">{formData.guests} guests</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card/50 rounded-xl p-4 border border-border">
                  <h4 className="font-semibold text-foreground mb-3">Price Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base price ({formData.guests} x ${selectedPkg?.price.toLocaleString()}):</span>
                      <span className="text-foreground">${((selectedPkg?.price || 0) * formData.guests).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxes & Fees:</span>
                      <span className="text-foreground">$99</span>
                    </div>
                    <div className="border-t border-border pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-foreground">Total:</span>
                        <span className="text-primary text-lg">${(((selectedPkg?.price || 0) * formData.guests) + 99).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Payment Method</h4>
                  <p className="text-sm text-muted-foreground">Stripe integration coming soon. For now, complete your booking to send a request.</p>
                </div>
              </div>
            )}
          </>
          )}
        </div>

        {/* Navigation */}
        <div className="sticky bottom-0 flex justify-between items-center p-6 border-t border-white/20 bg-background/80 backdrop-blur-sm">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="text-center">
            <span className="text-muted-foreground text-sm">
              Step {currentStep} of {steps.length}
            </span>
          </div>

          {currentStep < steps.length ? (
            <Button 
              onClick={nextStep}
              disabled={currentStep === 1 && !formData.packageId}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-500 text-white"
            >
              Complete Booking
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

    