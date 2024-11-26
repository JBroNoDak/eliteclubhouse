import { Request, Response } from 'express';
import Stripe from 'stripe';
import { auth } from '../src/lib/firebase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId } = req.body;
    const user = auth.currentUser;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Create a Stripe customer if one doesn't exist
    let customerId: string;
    const customerData = await stripe.customers.list({
      email: user.email || undefined,
      limit: 1,
    });

    if (customerData.data.length > 0) {
      customerId = customerData.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email: user.email || undefined,
        metadata: {
          firebaseUID: user.uid,
        },
      });
      customerId = customer.id;
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.VITE_APP_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VITE_APP_URL}/subscription/cancel`,
      metadata: {
        firebaseUID: user.uid,
      },
    });

    return res.status(200).json({ id: session.id });
  } catch (error: any) {
    console.error('Stripe session creation error:', error);
    return res.status(500).json({ error: error.message });
  }
}