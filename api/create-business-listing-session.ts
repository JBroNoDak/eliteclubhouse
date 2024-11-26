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
    const { businessId, businessName, amount, userId, email } = req.body;
    const user = auth.currentUser;

    if (!user || user.uid !== userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Create a Stripe customer if one doesn't exist
    let customerId: string;
    const customerData = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customerData.data.length > 0) {
      customerId = customerData.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email: email,
        metadata: {
          firebaseUID: userId,
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
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Business Listing - ${businessName}`,
              description: 'One-time business listing fee',
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.VITE_APP_URL}/business/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VITE_APP_URL}/business/cancel`,
      metadata: {
        businessId,
        firebaseUID: userId,
      },
    });

    return res.status(200).json({ id: session.id });
  } catch (error: any) {
    console.error('Stripe session creation error:', error);
    return res.status(500).json({ error: error.message });
  }
}