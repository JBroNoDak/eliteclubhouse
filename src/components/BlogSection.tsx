import React from 'react';
import { Clock, User } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "The Evolution of Private Aviation: 2024 Market Insights",
    excerpt: "Explore the latest trends in private aviation, from sustainable fuel options to emerging charter markets.",
    imageUrl: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80",
    author: "Jonathan Pierce",
    date: "March 15, 2024",
    readTime: "6 min read",
    category: "Aviation"
  },
  {
    title: "Luxury Real Estate: Global Investment Opportunities",
    excerpt: "Analysis of prime real estate markets and emerging luxury property investment destinations.",
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
    author: "Victoria Chen",
    date: "March 12, 2024",
    readTime: "8 min read",
    category: "Real Estate"
  },
  {
    title: "Superyacht Season: Mediterranean vs Caribbean",
    excerpt: "A comprehensive guide to the world's most exclusive yachting destinations and experiences.",
    imageUrl: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&q=80",
    author: "Alexander Ross",
    date: "March 10, 2024",
    readTime: "7 min read",
    category: "Yachting"
  }
];

export default function BlogSection() {
  return (
    <section className="py-20 bg-black/90" id="insights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-white mb-4">Insights</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Expert perspectives on luxury lifestyle and market trends
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article 
              key={index}
              className="bg-black/50 rounded-xl overflow-hidden border border-gray-800 hover:border-gold-500 transition-colors duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gold-400 text-sm">{post.category}</span>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <h3 className="text-xl font-serif text-white mb-3">
                  <a href="#" className="hover:text-gold-400 transition-colors duration-300">
                    {post.title}
                  </a>
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-400">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                  <span className="text-sm text-gray-400">{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}