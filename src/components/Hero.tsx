import React from 'react';
import { Search } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80"
          alt="Luxury lifestyle and exclusive experiences"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>
      
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">
            Your Gateway to Luxury Services
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Connect with the world's most exclusive service providers and experiences
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search luxury services..."
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-md rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
              aria-label="Search luxury services"
            />
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gold-500 rounded-full hover:bg-gold-600 transition"
              aria-label="Search"
            >
              <Search className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}