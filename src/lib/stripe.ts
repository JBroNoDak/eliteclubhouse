import { loadStripe } from '@stripe/stripe-js';
import { auth } from './firebase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const createSubscriptionCheckout = async (priceId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User must be logged in');

  const idToken = await user.getIdToken();

  try {
    const response = await fetch('/.netlify/functions/create-subscription-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        priceId,
        idToken
      }),
    });
    
    const session = await response.json();
    
    if (session.error) {
      throw new Error(session.error);
    }

    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize');

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    
    if (error) throw error;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createBusinessListingCheckout = async ({
  businessId,
  businessName,
  amount,
  listingType,
  userId,
  email,
}: {
  businessId: string;
  businessName: string;
  amount: number;
  listingType: 'regular' | 'featured';
  userId: string;
  email: string;
}) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User must be logged in');

  const idToken = await user.getIdToken();

  try {
    const response = await fetch('/.netlify/functions/create-business-listing-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        businessId,
        businessName,
        amount,
        listingType,
        idToken,
      }),
    });
    
    const session = await response.json();
    
    if (session.error) {
      throw new Error(session.error);
    }

    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize');

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    
    if (error) throw error;
  } catch (error: any) {
    throw new Error(error.message);
  }
};