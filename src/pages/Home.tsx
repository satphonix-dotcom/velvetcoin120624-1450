import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import Features from '../components/home/Features';
import CategoryGrid from '../components/home/CategoryGrid';
import { heroSlides } from '../data/heroSlides';

const Home = () => {
  return (
    <div>
      <HeroSlider slides={heroSlides} />
      <Features />
      <CategoryGrid />
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-heading font-heading1 text-3xl tracking-[0.2em] mb-8">
          INDULGE IN ELEGANCE YOU DESERVE
        </h2>
        <div className="flex justify-center gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              className="w-2 h-2 rounded-full bg-gray-300"
              aria-label={`Slide ${i}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;