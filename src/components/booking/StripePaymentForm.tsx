'use client';

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import type { Package } from '@/types';
import { Loader2 } from 'lucide-react';

interface StripePaymentFormProps {
  package: Package;
  travelers: number;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

const cardElementOptions = {
  style: {
    base: {
      color: '#ffffff',
      fontFamily: 'Inter, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#a1a1aa',
      },
    },
    invalid: {
      color: '#f87171',
      iconColor: '#f87171',
    },
  },
};

export default function StripePaymentForm({
  package: pkg,
  travelers,
  customerInfo,
  onSuccess,
  onError,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const calculateTotalPrice = () => {
    const subtotal = pkg.price * travelers;
    const serviceFee = 99; // Example service fee
    const stripeFee = Math.round(subtotal * 0.029 + 30); // Example Stripe fee
    return subtotal + serviceFee + stripeFee;
  };
  const totalPrice = calculateTotalPrice();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    if (!stripe || !elements) {
      setErrorMessage('Stripe has not loaded yet.');
      setIsLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
        setErrorMessage('Card details not found.');
        setIsLoading(false);
        return;
    }

    // This is a mock payment intent creation.
    // In a real app, you would make a call to your backend to create a payment intent.
    const mockPaymentIntent = {
      clientSecret: 'pi_mock_secret_' + Math.random().toString(36).substring(7),
      id: 'pi_' + Math.random().toString(36).substring(7),
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
        mockPaymentIntent.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${customerInfo.firstName} ${customerInfo.lastName}`,
              email: customerInfo.email,
              phone: customerInfo.phone,
            },
          },
        }
      );
      
    // This part simulates a successful payment confirmation since we can't use real test cards.
    // In a real scenario, you'd rely on the response from stripe.confirmCardPayment
    if (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
      onError(error.message || 'An unexpected error occurred.');
    } else {
      // Simulate success
      console.log('Mock Payment Successful:', mockPaymentIntent);
      onSuccess(mockPaymentIntent.id);
    }
    
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-card/50 rounded-xl p-4 border border-border">
        <h4 className="font-semibold text-foreground mb-3">Price Breakdown</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Base price ({travelers} x ${pkg.price.toLocaleString()}):</span>
            <span className="text-foreground">${(pkg.price * travelers).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Taxes & Fees:</span>
            <span className="text-foreground">$99</span>
          </div>
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span className="text-foreground">Total:</span>
              <span className="text-primary text-lg">${totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-card/50 rounded-xl p-4 border border-border">
        <Label htmlFor="card-element" className="block text-sm font-medium text-foreground mb-2">
            Credit or debit card
        </Label>
        <div className="p-3 rounded-md border border-input bg-background/50">
            <CardElement id="card-element" options={cardElementOptions} />
        </div>
         {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
      </div>

      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-green-600 hover:bg-green-500 text-white text-lg"
        size="lg"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          `Pay $${totalPrice.toLocaleString()}`
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        By clicking Pay, you agree to the Terms of Service and Privacy Policy.
      </p>
    </form>
  );
}

// Dummy Label component if not available globally
const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label {...props} />
);
