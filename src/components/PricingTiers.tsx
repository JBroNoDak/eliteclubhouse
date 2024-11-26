import React from 'react';
import { Check } from 'lucide-react';
import { createSubscriptionCheckout } from '../lib/stripe';
import toast from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithRedirect } from 'firebase/auth';

const features = [
  'Full access to luxury service provider directory',
  'Advanced search functionality',
  'Direct provider contact information',
  'Monthly curated recommendations',
  'Market insights newsletter',
  'Access to all listings and providers',
  'Email support',
  'Provider ratings and reviews',
  'Monthly industry reports'
];

const SUBSCRIPTION_PRICE_ID = 'prod_RHnH77gZTUDSvA';

export default function PricingTiers() {
  const [user] = useAuthState(auth);

  const handleSubscribe = async () => {
    try {
      if (!user) {
        // If user is not logged in, trigger Google sign-in
        await signInWithRedirect(auth, googleProvider);
        return;
      }

      // User is logged in, proceed with subscription
      await createSubscriptionCheckout(SUBSCRIPTION_PRICE_ID);
    } catch (error: any) {
      toast.error(error.message || 'Failed to process subscription');
    }
  };

  return (
    <section className="py-20 bg-black/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-white mb-4">Directory Access</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get unlimited access to our exclusive luxury service provider network
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="relative bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-gold-500 transition-colors duration-300">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif text-white mb-2">Full Access</h3>
              <div className="text-3xl font-bold text-gold-400 mb-2">
                $199
                <span className="text-sm text-gray-400 font-normal">/month</span>
              </div>
              <p className="text-gray-400">Complete directory access with all features included</p>
            </div>

            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="w-5 h-5 text-gold-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={handleSubscribe}
              className="w-full py-3 px-6 rounded-full bg-gold-500 hover:bg-gold-600 text-black font-semibold transition-colors duration-300"
            >
              {user ? 'Subscribe Now' : 'Sign in to Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}