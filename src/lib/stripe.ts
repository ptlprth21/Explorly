
import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      throw new Error('Stripe publishable key is not set');
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};


interface PaymentIntentPayload {
    totalAmount: number;
    customerEmail: string;
    customerName: string;
    metadata: Record<string, string>;
}


export async function createPaymentIntent(payload: PaymentIntentPayload): Promise<{ clientSecret: string } | null> {
    try {
        const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create payment intent');
        }

        const data = await response.json();
        return { clientSecret: data.clientSecret };

    } catch (error) {
        console.error('Error creating payment intent:', error);
        return null;
    }
}
