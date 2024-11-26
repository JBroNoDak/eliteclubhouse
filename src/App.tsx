import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PricingTiers from './components/PricingTiers';
import CategorySection from './components/CategorySection';
import BlogSection from './components/BlogSection';
import BusinessDirectory from './components/BusinessDirectory';
import { Toaster } from 'react-hot-toast';

function App() {
  const categories = {
    jets: {
      title: "Private Jets",
      description: "Connect with the world's leading private aviation providers",
      services: [
        {
          title: "NetJets",
          description: "World's largest private jet company offering fractional ownership and jet cards",
          imageUrl: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80",
          price: "Contact for rates",
          link: "https://www.netjets.com"
        },
        {
          title: "VistaJet",
          description: "Global private jet services with guaranteed availability worldwide",
          imageUrl: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&q=80",
          price: "Contact for rates",
          link: "https://www.vistajet.com"
        },
        {
          title: "Wheels Up",
          description: "Membership-based private aviation with diverse fleet options",
          imageUrl: "https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&q=80",
          price: "Memberships from $2,995/year",
          link: "https://www.wheelsup.com"
        },
        {
          title: "XO",
          description: "On-demand private jet charter with innovative booking platform",
          imageUrl: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80",
          price: "Contact for rates",
          link: "https://flyxo.com"
        }
      ]
    },
    carrentals: {
      title: "Luxury Car Rentals",
      description: "Access premium and exotic vehicles from top rental providers",
      services: [
        {
          title: "Sixt Luxury Car Rentals",
          description: "Premium fleet available across multiple countries",
          imageUrl: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&q=80",
          price: "From $250/day",
          link: "https://www.sixt.com"
        },
        {
          title: "Hertz Dream Cars",
          description: "Exclusive collection of luxury and exotic vehicles",
          imageUrl: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80",
          price: "From $350/day",
          link: "https://www.hertz.com"
        },
        {
          title: "Turo Luxury & Exotic",
          description: "Peer-to-peer luxury car rental marketplace",
          imageUrl: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80",
          price: "Varies by vehicle",
          link: "https://turo.com"
        },
        {
          title: "Gotham Dream Cars",
          description: "Premier exotic car rental service",
          imageUrl: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80",
          price: "From $895/day",
          link: "https://www.gothamdreamcars.com"
        }
      ]
    },
    experiences: {
      title: "Luxury Travel & Concierge",
      description: "Elite travel planning and lifestyle management services",
      services: [
        {
          title: "Abercrombie & Kent",
          description: "Pioneering luxury travel experiences worldwide",
          imageUrl: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80",
          price: "Custom quotes",
          link: "https://www.abercrombiekent.com"
        },
        {
          title: "Black Tomato",
          description: "Bespoke travel experiences and unique adventures",
          imageUrl: "https://images.unsplash.com/photo-1517783999520-f068d7431a60?auto=format&fit=crop&q=80",
          price: "Custom quotes",
          link: "https://www.blacktomato.com"
        },
        {
          title: "Quintessentially",
          description: "Global luxury lifestyle management and concierge",
          imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80",
          price: "Membership required",
          link: "https://www.quintessentially.com"
        },
        {
          title: "John Paul",
          description: "Premium concierge and lifestyle services",
          imageUrl: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80",
          price: "Contact for rates",
          link: "https://www.johnpaul.com"
        }
      ]
    },
    events: {
      title: "Exclusive Events",
      description: "Premium event planning and management services",
      services: [
        {
          title: "IMG Events",
          description: "Global luxury event planning and production",
          imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80",
          price: "Custom quotes",
          link: "https://www.img.com"
        },
        {
          title: "24/7 Events",
          description: "High-end corporate and private event specialists",
          imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80",
          price: "Contact for pricing",
          link: "https://www.247events.com"
        },
        {
          title: "Exceptional Taste",
          description: "Luxury event design and bespoke experiences",
          imageUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80",
          price: "Custom quotes",
          link: "https://www.exceptionaltaste.com"
        }
      ]
    },
    realestate: {
      title: "Luxury Real Estate",
      description: "Premier real estate agencies specializing in luxury properties",
      services: [
        {
          title: "Sotheby's International Realty",
          description: "Global luxury real estate portfolio",
          imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
          price: "Property specific",
          link: "https://www.sothebysrealty.com"
        },
        {
          title: "Knight Frank",
          description: "International luxury property consultancy",
          imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
          price: "Property specific",
          link: "https://www.knightfrank.com"
        },
        {
          title: "Christie's Real Estate",
          description: "Exclusive luxury property network",
          imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
          price: "Property specific",
          link: "https://www.christiesrealestate.com"
        },
        {
          title: "Douglas Elliman",
          description: "Premium properties in select markets",
          imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
          price: "Property specific",
          link: "https://www.elliman.com"
        }
      ]
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Navigation categories={Object.keys(categories)} />
      <Hero />
      <PricingTiers />
      
      {Object.entries(categories).map(([key, category]) => (
        <CategorySection key={key} id={key} {...category} />
      ))}
      
      <BusinessDirectory />
      <BlogSection />
      
      <footer className="bg-black/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} The Elite Clubhouse. For distinguished members only.
          </p>
        </div>
      </footer>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;