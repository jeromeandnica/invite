
import React from 'react';
import { COLORS } from '../constants';
import { ExternalLink, UserX, Gift } from 'lucide-react';

// Custom SVG for Dress & Suit to replace generic Shirt icon
const DressSuitIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Dress */}
    <path d="M30 25 C30 25 20 35 15 45 C15 45 25 40 30 45 L30 85 Q40 90 50 85 L50 45 C55 40 65 45 65 45 C60 35 50 25 50 25 Q40 35 30 25 Z" />
    {/* Suit/Polo */}
    <path d="M60 25 L70 20 L80 25 L80 85 L60 85 L60 25 Z" />
    <path d="M60 25 L70 40 L80 25" />
    <path d="M55 25 L85 25" />
  </svg>
);

const Attire: React.FC = () => {
  return (
    <section className="py-20 bg-cream-soft text-brown-earth">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        
        {/* Attire Guide Header */}
        <div className="mb-12">
          <h2 className="font-script text-6xl mb-4 text-sage-dark">Attire Guide</h2>
          <div className="flex justify-center items-center gap-3 text-sage-dark/80">
            <div className="w-8 h-8">
               <DressSuitIcon />
            </div>
            <p className="font-heading text-xl uppercase tracking-widest">Formal / Semi-Formal</p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-beige-sand/20 mb-20">
          
          {/* Color Palette (Primarily for Guests) */}
          <p className="font-body text-lg mb-6 leading-relaxed">
            We'd love to see you in our wedding colors!
            <br />
            Please refer to the palette below for guidance.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {COLORS.map((color) => (
              <div key={color.name} className="flex flex-col items-center gap-3 group">
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-inner border-4 border-white ring-1 ring-gray-200 transform group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                ></div>
                <span className="font-heading text-xs uppercase tracking-wide text-gray-600">{color.name}</span>
              </div>
            ))}
          </div>

          {/* Detailed Guide - Guests First, Sponsors Second */}
          <div className="grid md:grid-cols-2 gap-10 mb-10 text-left bg-paper p-8 rounded-xl">
            
            {/* Guests Column (First on Mobile) */}
            <div>
              <h3 className="font-heading text-lg text-sage-dark mb-4 uppercase border-b border-sage-light/30 pb-2">Guests</h3>
               <div className="space-y-6">
                 <div>
                    <p className="font-bold text-brown-earth text-sm uppercase tracking-wide">Ladies</p>
                    <p className="font-body text-gray-700">Semi-formal flowy maxi dress</p>
                 </div>
                 <div>
                    <p className="font-bold text-brown-earth text-sm uppercase tracking-wide">Gentlemen</p>
                    <p className="font-body text-gray-700">Long/short sleeve button-up and trousers</p>
                 </div>
              </div>
            </div>

            {/* Principal Sponsors Column (Second on Mobile) */}
            <div className="flex flex-col h-full">
              <h3 className="font-heading text-lg text-sage-dark mb-4 uppercase border-b border-sage-light/30 pb-2">Principal Sponsors</h3>
              <div className="space-y-6 mb-8">
                 <div>
                    <p className="font-bold text-brown-earth text-sm uppercase tracking-wide">Ninong</p>
                    <p className="font-body text-gray-700">Beige Suit and Pants, White Long Sleeves Polo and Sage Green Necktie</p>
                 </div>
                 <div>
                    <p className="font-bold text-brown-earth text-sm uppercase tracking-wide">Ninang</p>
                    <p className="font-body text-gray-700">Formal Flowy Beige Gowns</p>
                 </div>
              </div>
              
              {/* Link specific to Sponsors */}
              <div className="mt-auto">
                 <a 
                    href="https://drive.google.com/file/d/1D-kSZZONG6qVOASX4PN8GjKREb3Rec8_/view?usp=sharing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-sage-dark text-cream-soft font-heading uppercase text-xs md:text-sm tracking-wider rounded hover:bg-sage-dark/90 transition-colors shadow-md"
                 >
                   <span>View Outfit Reference</span>
                   <ExternalLink size={16} />
                 </a>
                 <p className="text-xs text-gray-500 mt-2 italic text-center">
                   (Photos for Ninongs and Ninangs to follow)
                 </p>
              </div>
            </div>
            
          </div>

          <div className="border-t border-gray-200 pt-8">
             <p className="font-heading text-sage-dark font-bold mb-3 uppercase tracking-wider text-sm">
               Attire Note
             </p>
             <p className="font-body text-gray-700 max-w-2xl mx-auto">
               We kindly ask everyone to stick to the colors in our guide and avoid wearing polo shirt, jeans, shorts, or flip-flops so we can keep the dress code respectful and festive.
             </p>
          </div>
        </div>

        {/* Logistics Grid: Adult Only & Gifts */}
        <div className="mb-12">
           <div className="flex items-center justify-center gap-4 mb-8">
             <div className="h-px bg-sage-dark/20 flex-1"></div>
             <h3 className="font-heading text-2xl text-sage-dark uppercase tracking-widest">Additional Details</h3>
             <div className="h-px bg-sage-dark/20 flex-1"></div>
           </div>
           
           <div className="grid md:grid-cols-2 gap-8 text-left">
              {/* Adult Only Note - Red Accent */}
              <div className="bg-paper p-8 rounded-xl border-t-4 border-red-500 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="bg-red-50 p-4 rounded-full mb-6 text-red-600">
                  <UserX size={32} />
                </div>
                <h3 className="font-heading text-xl text-red-700 mb-4 uppercase tracking-wide font-bold">Adult Only Celebration</h3>
                <p className="font-body text-gray-600 leading-relaxed">
                  We adore your children, but for this special day, we ask that you join us for an adult-only celebration. We appreciate your understanding and can’t wait to celebrate with you!
                </p>
              </div>

              {/* Gifts Note */}
              <div className="bg-paper p-8 rounded-xl border-t-4 border-beige-sand shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="bg-beige-sand/20 p-4 rounded-full mb-6 text-brown-earth">
                  <Gift size={32} />
                </div>
                <h3 className="font-heading text-xl text-brown-earth mb-4 uppercase tracking-wide">Preferred Gifts</h3>
                <p className="font-body text-gray-600 leading-relaxed">
                  As we begin our new life together, your love, prayers, and presence are what we treasure most. If you wish to bless us further, we'd be grateful for a monetary gift to help us start this new chapter.
                </p>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Attire;
