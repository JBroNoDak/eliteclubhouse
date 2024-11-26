import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithRedirect, signOut } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { LogIn, Building2, LogOut, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { createBusinessListingCheckout } from '../lib/stripe';

interface BusinessFormData {
  name: string;
  description: string;
  website: string;
  category: string;
  contactEmail: string;
  phone: string;
  listingType: 'regular' | 'featured';
}

const categories = [
  'Private Jets',
  'Yachts',
  'Luxury Cars',
  'Real Estate',
  'Travel Experiences',
  'Events',
  'Concierge Services'
];

const LISTING_PRICES = {
  regular: {
    amount: 299,
    name: 'Regular Business Listing',
    features: [
      'Business profile in directory',
      'Contact information display',
      'Service category listing',
      'Basic analytics'
    ]
  },
  featured: {
    amount: 599,
    name: 'Featured Business Listing',
    features: [
      'Priority placement in directory',
      'Enhanced business profile',
      'Featured tag and highlighting',
      'Advanced analytics dashboard',
      'Premium support',
      'Social media promotion'
    ]
  }
};

export default function BusinessDirectory() {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState<BusinessFormData>({
    name: '',
    description: '',
    website: '',
    category: '',
    contactEmail: '',
    phone: '',
    listingType: 'regular'
  });

  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || 'Failed to sign in. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Successfully signed out!');
    } catch (error) {
      toast.error('Failed to sign out. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const listingPrice = LISTING_PRICES[formData.listingType];
      
      // Create a temporary document to get an ID
      const docRef = await addDoc(collection(db, 'businesses'), {
        ...formData,
        userId: user.uid,
        userEmail: user.email,
        createdAt: new Date(),
        status: 'pending_payment',
        listingType: formData.listingType,
        featured: formData.listingType === 'featured'
      });

      // Redirect to Stripe checkout
      await createBusinessListingCheckout({
        businessId: docRef.id,
        businessName: formData.name,
        amount: listingPrice.amount,
        listingType: formData.listingType,
        userId: user.uid,
        email: user.email || ''
      });

    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Failed to submit business. Please try again.');
    }
  };

  return (
    <section className="py-20 bg-black/90" id="list-business">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-white mb-4">List Your Business</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join our exclusive network of luxury service providers
          </p>
        </div>

        {!user ? (
          <div className="text-center">
            <button
              onClick={handleGoogleSignIn}
              className="inline-flex items-center px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              <Building2 className="w-5 h-5 mr-2" />
              List Your Business
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-300">Signed in as: {user.email}</p>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {Object.entries(LISTING_PRICES).map(([type, pricing]) => (
                <div
                  key={type}
                  className={`p-6 rounded-xl border ${
                    formData.listingType === type
                      ? 'border-gold-500 bg-black/50'
                      : 'border-gray-800 bg-black/30'
                  } cursor-pointer transition-all duration-300`}
                  onClick={() => setFormData({ ...formData, listingType: type as 'regular' | 'featured' })}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      {type === 'featured' && <Star className="inline-block w-5 h-5 text-gold-400 mr-2" />}
                      {pricing.name}
                    </h3>
                    <span className="text-2xl font-bold text-gold-400">${pricing.amount}/mo</span>
                  </div>
                  <ul className="space-y-2">
                    {pricing.features.map((feature, index) => (
                      <li key={index} className="text-gray-300 flex items-center">
                        <span className="mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Business Description
                </label>
                <textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  required
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-300 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-full bg-gold-500 hover:bg-gold-600 text-black font-semibold transition-colors duration-300 flex items-center justify-center"
              >
                <Building2 className="w-5 h-5 mr-2" />
                Submit {formData.listingType === 'featured' ? 'Featured' : ''} Business Listing (${LISTING_PRICES[formData.listingType].amount}/mo)
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}