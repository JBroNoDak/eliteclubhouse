import { Request, Response } from 'express';
import Stripe from 'stripe';
import { db } from '../src/lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];

  if (!sig || !endpointSecret) {
    return res.status(400).json({ error: 'Missing signature or endpoint secret' });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: err.message });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const { businessId, firebaseUID } = session.metadata || {};

      if (session.mode === 'subscription') {
        // Handle subscription payment
        await updateDoc(doc(db, 'users', firebaseUID), {
          stripeCustomerId: session.customer,
          subscriptionStatus: 'active',
          subscriptionId: session.subscription,
        });
      } else if (session.mode === 'payment' && businessId) {
        // Handle business listing payment
        const businessRef = doc(db, 'businesses', businessId);
        const businessDoc = await getDoc(businessRef);
        
        if (businessDoc.exists()) {
          await updateDoc(businessRef, {
            status: 'pending_review',
            paymentStatus: 'paid',
            paymentId: session.payment_intent,
            updatedAt: new Date(),
          });
        }
      }
      break;
    }

    case 'customer.subscription.deleted':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const customer = subscription.customer as string;

      // Update user subscription status
      const querySnapshot = await db
        .collection('users')
        .where('stripeCustomerId', '==', customer)
        .get();

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'users', userDoc.id), {
          subscriptionStatus: subscription.status,
          updatedAt: new Date(),
        });
      }
      break;
    }
  }

  return res.status(200).json({ received: true });
}