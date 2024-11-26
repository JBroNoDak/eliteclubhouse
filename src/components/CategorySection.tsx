import React from 'react';
import ServiceCard from './ServiceCard';

interface CategorySectionProps {
  id: string;
  title: string;
  description: string;
  services: Array<{
    title: string;
    description: string;
    imageUrl: string;
    price: string;
  }>;
}

export default function CategorySection({ id, title, description, services }: CategorySectionProps) {
  return (
    <section className="py-20" id={id}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-white mb-4">{title}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}