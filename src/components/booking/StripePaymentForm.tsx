
'use client';

import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, Lock, Shield, Check, Loader2 } from 'lucide-react';
import type { Package } from '@/types';
import { createPaymentIntent } from '@/lib/stripe';
import { Button } from '@/components/ui/button';

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
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: 'transparent',
      '::placeholder': {
        color: '#9ca3af',
      },
      iconColor: '#46C7C7',
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444',
    },
  },
  hidePostalCode: false,
};

export default function StripePaymentForm({
  package: pkg,
  travelers,
  customerInfo,
  onSuccess,
  onError
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentReady, setPaymentReady] = useState(false);

  const subtotal = pkg.price * travelers;
  const serviceFee = 99; // Fixed service fee
  const stripeFee = Math.round(subtotal * 0.029 + 30); // Stripe fee (2.9% + $0.30)
  const totalAmount = subtotal + serviceFee + stripeFee;

  useEffect(() => {
    const initializePayment = async () => {
      if (!pkg || !customerInfo.email) {
        return;
      }
      
      try {
        const paymentIntent = await createPaymentIntent({
          totalAmount: totalAmount,
          customerEmail: customerInfo.email,
          customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
          metadata: {
            packageId: pkg.id,
            packageTitle: pkg.title,
            travelers: travelers.toString(),
          }
        });

        if (paymentIntent && paymentIntent.clientSecret) {
          setClientSecret(paymentIntent.clientSecret);
          setPaymentReady(true);
        } else {
          onError('Invalid payment response. Please try again.');
        }
      } catch (error) {
        console.error('Payment initialization error:', error);
        onError(error instanceof Error ? error.message : 'Payment initialization failed. Please try again.');
      }
    };

    initializePayment();
  }, [pkg, travelers, customerInfo, totalAmount, onError]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      onError('Payment system not ready. Please try again.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onError('Card information not found. Please refresh and try again.');
      return;
    }

    setProcessing(true);

    try {
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            email: customerInfo.email,
            phone: customerInfo.phone,
          },
        },
        receipt_email: customerInfo.email,
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      } else {
        throw new Error('Payment was not completed successfully.');
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Price Breakdown */}
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <CreditCard className="h-5 w-5 mr-2 text-primary" />
          Payment Summary
        </h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">{pkg.title} × {travelers}</span> <span className="text-white">€{subtotal.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Service fee</span> <span className="text-white">€{serviceFee}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Payment processing</span> <span className="text-white">€{stripeFee.toFixed(2)}</span></div>
          <div className="border-t border-border pt-3 mt-3">
            <div className="flex justify-between font-semibold text-lg"><span className="text-white">Total</span><span className="text-primary">€{totalAmount.toLocaleString()}</span></div>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Lock className="h-5 w-5 mr-2 text-green-400" />
            Secure Payment
          </h3>
          
          <div className="bg-background/60 border border-input rounded-xl p-4 mb-4">
            <CardElement options={cardElementOptions} />
          </div>

          <Button
            type="submit"
            disabled={!stripe || !paymentReady || processing}
            className="w-full bg-accent hover:bg-accent/90 disabled:bg-muted"
            size="lg"
          >
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Lock className="h-5 w-5 mr-2" />
                <span>Pay €{totalAmount.toLocaleString()} Securely</span>
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Your payment is secured by Stripe. We never store your card details.
          </p>
        </div>
      </form>
    </div>
  );
}
