
import React from 'react';
import { ArrowDown } from 'lucide-react';

import heroImage from '../assets/hero.jpg';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center px-4">
      {/* Parallax Background with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-sage-dark/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-cream-soft space-y-8 max-w-4xl mx-auto animate-fade-in-up pt-10">
        <div className="flex flex-col items-center">
          <h1 className="font-script text-8xl md:text-[10rem] drop-shadow-lg leading-none">
            Jerome
          </h1>
          <h1 className="font-script text-7xl md:text-[8rem] drop-shadow-lg leading-none mt-[-10px] md:mt-[-30px] ml-16 md:ml-32">
            & Nica
          </h1>
        </div>
        
        <div className="space-y-4">
          <p className="font-heading text-xl md:text-3xl tracking-widest uppercase border-t border-b border-cream-soft/50 py-3 inline-block">
            Are Getting Married!
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 z-10 animate-bounce">
        <a href="#countdown" className="text-cream-soft opacity-80 hover:opacity-100 transition-opacity">
          <ArrowDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;