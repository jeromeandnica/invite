
import React, { useState } from 'react';
import { COLORS } from '../constants.ts';
import { HelpCircle, Gift, ArrowRight, Maximize2 } from 'lucide-react';
import EnchantedReveal from './EnchantedReveal.tsx';
import ImageModal from './ImageModal.tsx';
import { Link } from 'react-router-dom';

// ==================================================================================
// !!! REPLACE THIS IMAGE: SPONSOR ATTIRE REFERENCE !!!
// Description: The reference photo for "Ninong/Ninang" attire.
// Recommended: Landscape orientation (approx 3:2 ratio).
// ==================================================================================
const sponsorAttireImage = "https://images.unsplash.com/photo-1596356494918-62d9472f883f?q=80&w=2071&auto=format&fit=crop";

// ==================================================================================
// !!! REPLACE THIS IMAGE: GUEST ATTIRE REFERENCE !!!
// Description: The reference photo for "Guests" attire.
// Recommended: Landscape orientation (approx 3:2 ratio).
// ==================================================================================
const guestAttireImage = "https://images.unsplash.com/photo-1625936350325-1e3c8801d904?q=80&w=2070&auto=format&fit=crop";

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
  const [selectedImage, setSelectedImage] = useState<{src: string, caption: string} | null>(null);

  const openImage = (src: string, caption: string) => {
    setSelectedImage({ src, caption });
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-20 bg-cream-soft text-brown-earth">
      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={closeImage} 
        imageSrc={selectedImage?.src || null}
        caption={selectedImage?.caption}
      />

      <div className="container mx-auto px-6 max-w-5xl text-center">
        
        {/* Attire Guide Header */}
        <div className="mb-12 flex flex-col items-center">
          <EnchantedReveal>
            <h2 className="font-script text-6xl mb-4 text-sage-dark">Attire Guide</h2>
          </EnchantedReveal>
          
          <EnchantedReveal delay={0.2}>
            <div className="flex justify-center items-center gap-3 text-sage-dark/80">
              <div className="w-8 h-8">
                <DressSuitIcon />
              </div>
              <p className="font-heading text-xl uppercase tracking-widest">Formal / Semi-Formal</p>
            </div>
          </EnchantedReveal>
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
            <div className="flex flex-col h-full">
              <h3 className="font-heading text-lg text-sage-dark mb-4 uppercase border-b border-sage-light/30 pb-2">Guests</h3>
               <div className="space-y-6 mb-8">
                 <div>
                    <p className="font-bold text-brown-earth text-sm uppercase tracking-wide">Ladies</p>
                    <p className="font-body text-gray-700">Semi-formal flowy maxi dress</p>
                 </div>
                 <div>
                    <p className="font-bold text-brown-earth text-sm uppercase tracking-wide">Gentlemen</p>
                    <p className="font-body text-gray-700">Long/short sleeve button-up and trousers</p>
                 </div>
              </div>

              {/* Guest Outfit Reference Image Placeholder - Landscape */}
              <div className="mt-auto">
                 <div 
                   className="relative group overflow-hidden rounded-lg shadow-md border border-gray-100 bg-white aspect-[3/2] cursor-zoom-in"
                   onClick={() => openImage(guestAttireImage, "Guest Reference Style")}
                 >
                    <img 
                      src={guestAttireImage} 
                      alt="Guest Attire Reference" 
                      className="w-full h-full object-cover grayscale-[20%] opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-sage-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white">
                        <Maximize2 size={24} />
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-heading text-[10px] uppercase tracking-widest text-white drop-shadow-md text-center">
                        Guest Reference Style
                      </p>
                    </div>
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
              
              {/* Outfit Reference Image Placeholder - Landscape */}
              <div className="mt-auto">
                 <div 
                   className="relative group overflow-hidden rounded-lg shadow-md border border-gray-100 bg-white aspect-[3/2] cursor-zoom-in"
                   onClick={() => openImage(sponsorAttireImage, "Sponsor Reference Style")}
                 >
                    <img 
                      src={sponsorAttireImage} 
                      alt="Sponsor Attire Reference Placeholder" 
                      className="w-full h-full object-cover grayscale-[20%] opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-sage-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white">
                        <Maximize2 size={24} />
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-heading text-[10px] uppercase tracking-widest text-white drop-shadow-md text-center">
                        Sponsor Reference Style
                      </p>
                    </div>
                 </div>
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

        {/* Logistics Grid: FAQS & Gifts */}
        <div className="mb-12">
           <div className="flex items-center justify-center gap-4 mb-8">
             <div className="h-px bg-sage-dark/20 flex-1"></div>
             <h3 className="font-heading text-2xl text-sage-dark uppercase tracking-widest">Additional Details</h3>
             <div className="h-px bg-sage-dark/20 flex-1"></div>
           </div>
           
           <div className="grid md:grid-cols-2 gap-8 text-left">
              
              {/* FAQs Link (Replaces Adult Only Box) */}
              <Link 
                to="/faq" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="bg-paper p-8 rounded-xl border-t-4 border-sage-light shadow-sm hover:shadow-md transition-all group flex flex-col items-center text-center cursor-pointer relative overflow-hidden"
              >
                <div className="bg-sage-light/20 p-4 rounded-full mb-6 text-sage-dark group-hover:bg-sage-dark group-hover:text-white transition-colors duration-300">
                  <HelpCircle size={32} />
                </div>
                <h3 className="font-heading text-xl text-sage-dark mb-4 uppercase tracking-wide font-bold group-hover:underline decoration-sage-light underline-offset-4">
                  Questions?
                </h3>
                <p className="font-body text-gray-600 leading-relaxed mb-6">
                   Visit our FAQs regarding kids, parking, and other essential details for the big day.
                </p>
                <span className="text-sage-dark font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                  View FAQs <ArrowRight size={14} />
                </span>
              </Link>

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
