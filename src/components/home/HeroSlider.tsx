import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import type { HeroSlide } from '../../types/home';

interface HeroSliderProps {
  slides: HeroSlide[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen bg-[#0A3635] text-white overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={clsx(
            'absolute inset-0 transition-opacity duration-1000',
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#0A3635] opacity-40" />
          </div>
          <div className="relative h-full max-w-[1920px] mx-auto px-4 lg:px-16 flex items-center">
            <div className="max-w-2xl">
              <h1 className="font-heading font-heading1 text-4xl lg:text-6xl tracking-[0.2em] mb-6">
                {slide.title}
              </h1>
              <p className="font-body text-lg lg:text-xl mb-8 text-gray-200">
                {slide.subtitle}
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to={slide.cta.link}
                  className="inline-flex items-center gap-2 bg-white text-[#0A3635] px-8 py-4 font-body hover:bg-gray-100 transition-colors"
                >
                  {slide.cta.text} <ArrowRight size={20} />
                </Link>
                <div className="flex items-center gap-2">
                  {slide.cryptos.map((crypto) => (
                    <span key={crypto} className="font-body text-sm tracking-wider">
                      {crypto}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={clsx(
              'w-2 h-2 rounded-full transition-all',
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;