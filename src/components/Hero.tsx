import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  heroImage: string;
}

export function Hero({ heroImage }: HeroProps) {
  return (
    <div className="relative h-[600px] overflow-hidden">
      <ImageWithFallback
        src={heroImage}
        alt="Makeda Threads Collection"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-xl">
            <p className="text-sm tracking-widest mb-4" style={{ color: 'var(--makeda-gold)' }}>
              PREMIUM COLLECTION
            </p>
            <h2 className="text-5xl md:text-6xl mb-6 leading-tight">
              Elegance
              <br />
              <span style={{ color: 'var(--makeda-gold)' }}>Redefined</span>
            </h2>
            <p className="text-lg text-gray-200 mb-8">
              Discover luxury African fashion that celebrates heritage and contemporary style
            </p>
            <button
              className="px-8 py-4 text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{
                backgroundColor: 'var(--makeda-gold)',
                borderRadius: '8px',
              }}
            >
              Explore Collection
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === 0 ? 'var(--makeda-gold)' : 'white',
              opacity: i === 0 ? 1 : 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
