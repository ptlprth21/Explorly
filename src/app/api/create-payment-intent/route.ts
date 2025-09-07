
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: Request) {
  try {
    const { totalAmount, customerEmail, customerName, metadata } = await request.json();

    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json({ message: 'Invalid amount' }, { status: 400 });
    }

    // Stripe expects amount in cents
    const amountInCents = Math.round(totalAmount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'eur',
      receipt_email: customerEmail,
      description: `Booking for ${metadata.packageTitle}`,
      metadata: {
        customerName,
        ...metadata,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });

  } catch (error: any) {
    console.error('Stripe API Error:', error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
