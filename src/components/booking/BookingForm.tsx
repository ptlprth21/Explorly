'use client';

import React, { useState } from 'react';
import { X, Calendar, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface BookingFormProps {
  selectedPackage?: string;
  allTours: string[];
  onClose: () => void;
}

export default function BookingForm({ selectedPackage, allTours, onClose }: BookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    tour: selectedPackage || '',
    date: '',
    guests: 2,
    notes: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Request Sent!",
      description: "We'll contact you via email within 24 hours to confirm.",
      variant: 'default',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="w-full max-w-sm sm:max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 p-4 sm:p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl sm:text-2xl font-bold">Book a Tour</h3>
          <button 
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Input 
              placeholder="Full name" 
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required 
            />
            <Input 
              type="email" 
              placeholder="Email address" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>
          
          <Select 
            value={formData.tour}
            onValueChange={(value) => setFormData({...formData, tour: value})}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a tour" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="" disabled>Choose tour</SelectItem>
              {allTours.map(tour => (
                <SelectItem key={tour} value={tour}>{tour}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="pl-10" 
                required 
              />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input 
                type="number" 
                min="1" 
                max="10" 
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                placeholder="Guests" 
                className="pl-10" 
                required 
              />
            </div>
          </div>
          
          <Textarea 
            placeholder="Special requests or notes (optional)" 
            rows={2}
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            className="resize-none"
          />
          
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-teal-400 hover:bg-teal-300 text-neutral-900 font-semibold"
            >
              Send Request
            </Button>
          </div>
          
          <button 
            type="button"
            className="w-full mt-2 text-xs sm:text-sm text-neutral-400 hover:text-teal-300 transition-colors"
          >
            Ask a question instead
          </button>
        </form>
      </div>
    </div>
  );
}
