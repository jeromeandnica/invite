
import React from 'react';
import { MapPin, UserX, Gift, Navigation } from 'lucide-react';

const Details: React.FC = () => {
  return (
    <section id="details" className="py-20 bg-cream-soft text-sage-dark relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-script text-6xl text-sage-dark mb-4">The Venue</h2>
          <div className="flex items-center justify-center gap-2 text-brown-earth">
            <MapPin className="w-5 h-5" />
            <p className="font-heading text-xl uppercase tracking-wide">Mahogany Place, Tagaytay</p>
          </div>
        </div>

        {/* Map & Location Section */}
        <div className="bg-white p-4 rounded-xl shadow-lg border border-sage-light/20 mb-16">
          <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden relative">
             <iframe 
               title="Mahogany Place Tagaytay Map"
               width="100%" 
               height="100%" 
               frameBorder="0" 
               scrolling="no" 
               marginHeight={0} 
               marginWidth={0} 
               src="https://maps.google.com/maps?q=Mahogany+Place+Tagaytay&t=&z=15&ie=UTF8&iwloc=&output=embed"
               className="w-full h-full"
             ></iframe>
             <a 
              href="https://maps.google.com/maps?q=Mahogany+Place+Tagaytay" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-white text-sage-dark px-4 py-2 rounded-full shadow-md font-bold text-sm flex items-center gap-2 hover:bg-sage-dark hover:text-white transition-colors"
             >
               <Navigation size={16} />
               Get Directions
             </a>
          </div>
        </div>

        {/* Logistics Grid: Adult Only & Gifts */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Adult Only Note */}
          <div className="bg-paper p-8 rounded-xl border-t-4 border-sage-dark shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
            <div className="bg-sage-dark/10 p-4 rounded-full mb-6 text-sage-dark">
              <UserX size={32} />
            </div>
            <h3 className="font-heading text-xl text-sage-dark mb-4 uppercase tracking-wide">Adult Only Celebration</h3>
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
    </section>
  );
};

export default Details;
