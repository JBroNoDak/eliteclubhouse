import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  link: string;
}

export default function ServiceCard({ title, description, imageUrl, price, link }: ServiceCardProps) {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-xl block transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={imageUrl} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <div className="absolute bottom-0 p-6">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-200 text-sm mb-3">{description}</p>
          <p className="text-gold-400 font-semibold">{price}</p>
          <span className="inline-block mt-2 text-sm text-white/80 border border-white/30 rounded-full px-4 py-1 hover:bg-white/10 transition-colors duration-300">
            Learn More →
          </span>
        </div>
      </div>
    </a>
  );
}