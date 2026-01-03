import React from 'react';
import { ArrowDown } from 'lucide-react';
import EnchantedReveal from './EnchantedReveal.tsx';
import heroImg from '../assets/hero-image.jpg';

// ==================================================================================
// !!! REPLACE THIS IMAGE: MAIN HERO BACKGROUND !!!
// Description: The large background image seen immediately when loading the site.
// Recommended: High resolution (1920x1080+), Landscape orientation.
// ==================================================================================
const heroImage = heroImg;

const Hero: React.FC = () => {
  const handleScrollToRsvp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('rsvp');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center px-4">
      {/* Parallax Background with Overlay */}
      <div 
        // FIX: Changed 'bg-fixed' to 'bg-scroll md:bg-fixed'
        className="absolute inset-0 z-0 bg-scroll md:bg-fixed bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          // Keep your offset, or use 'center top' for mobile if 80px feels too low
          backgroundPosition: 'center 80px' 
        }}
      >
        <div className="absolute inset-0 bg-sage-dark/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-cream-soft space-y-2 max-w-4xl mx-auto pt-10 flex flex-col items-center">
        <EnchantedReveal width="fit-content">
          <h1 className="font-script text-8xl md:text-[10rem] drop-shadow-lg leading-none">
            Jerome
          </h1>
        </EnchantedReveal>
        
        <EnchantedReveal width="fit-content" delay={0.2}>
          <h1 className="font-script text-7xl md:text-[8rem] drop-shadow-lg leading-none md:mt-[-30px] md:ml-32">
            & Nica
          </h1>
        </EnchantedReveal>
        
        <div className="mt-8">
          <EnchantedReveal width="fit-content" delay={0.6}>
            <p className="font-heading text-xl md:text-3xl tracking-widest uppercase border-t border-b border-cream-soft/50 py-3 inline-block">
              Are Getting Married!
            </p>
          </EnchantedReveal>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 z-10 animate-bounce">
        <a 
          href="#rsvp" 
          onClick={handleScrollToRsvp}
          className="text-cream-soft opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <ArrowDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;