import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Navigation, Car } from 'lucide-react';
import EnchantedReveal from './EnchantedReveal.tsx';

// ==================================================================================
// !!! REPLACE THIS IMAGE: VENUE PHOTO !!!
// Description: A photo of the venue (Mahogany Place).
// ==================================================================================
import venueImage from '../assets/house-image.png'; 

// LINKS CONFIGURATION
const venueImg = venueImage;
const GOOGLE_MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=Mahogany+Place+Tagaytay";
const WAZE_LINK = "https://ul.waze.com/ul?venue_id=79233165.792528258.945667&overview=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location";

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target: Wedding Date - March 21, 2026 15:00:00 (3:00 PM)
    const deadline = new Date('2026-03-21T15:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = deadline.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="countdown" className="py-20 bg-paper text-sage-dark border-b border-sage-light/20 relative overflow-hidden">
       <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sage-light/20 via-sage-dark/20 to-sage-light/20"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        
        {/* Date & Time Header */}
        <div className="mb-12 flex justify-center">
          <EnchantedReveal width="100%">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sage-dark">
              <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-beige-sand" />
                  <span className="font-heading text-3xl md:text-5xl">March 21, 2026</span>
              </div>
              <div className="hidden md:block w-px h-12 bg-sage-light/30"></div>
              <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-beige-sand" />
                  <span className="font-heading text-3xl md:text-5xl">3:00 PM</span>
              </div>
            </div>
            <p className="font-body text-gray-500 italic text-lg mt-4">Saturday</p>
          </EnchantedReveal>
        </div>

        <div className="w-16 h-1 bg-beige-sand mx-auto mb-12 rounded-full"></div>

        {/* Countdown Timer */}
        <div className="mb-20">
          <p className="font-body text-sm tracking-[0.2em] uppercase text-gray-500 mb-6">Counting Down The Days</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center bg-white p-4 md:p-6 rounded-xl shadow-lg w-24 md:w-32 border border-sage-light/20 transform hover:-translate-y-1 transition-transform duration-300">
                <span className="font-heading text-3xl md:text-5xl font-bold text-sage-dark mb-1">
                  {item.value}
                </span>
                <span className="font-body text-xs md:text-sm uppercase tracking-widest text-gray-500">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Venue & Location Section */}
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 flex flex-col items-center">
                <EnchantedReveal>
                  <h2 className="font-script text-6xl text-sage-dark mb-4">The Venue</h2>
                </EnchantedReveal>
                
                <EnchantedReveal delay={0.2}>
                  <div className="flex items-center justify-center gap-2 text-brown-earth">
                      <MapPin className="w-5 h-5" />
                      <p className="font-heading text-xl uppercase tracking-wide">Mahogany Place, Tagaytay</p>
                  </div>
                </EnchantedReveal>
            </div>

            {/* Venue Card Container */}
            <div className="w-full bg-white rounded-xl overflow-hidden shadow-2xl border-4 border-white mb-6">
                
                {/* 1. The Image (Full Width, Natural Height) */}
                <img 
                  src={venueImg} 
                  alt="Mahogany Place Tagaytay" 
                  className="w-full h-auto block" 
                />

                {/* 2. The Action Buttons Area (Below the Image) */}
                <div className="bg-sage-light/10 p-6 md:p-8">
                  <p className="text-gray-500 italic text-sm mb-4">
                    Navigate the location through these platforms:
                  </p>
                  
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    {/* Google Maps Button */}
                    <a 
                      href={GOOGLE_MAPS_LINK}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full md:w-auto bg-white border border-sage-dark text-sage-dark hover:bg-sage-dark hover:text-white px-6 py-3 rounded-full font-heading text-xs uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <MapPin size={18} />
                      <span>Google Maps</span>
                    </a>

                    {/* Waze Button */}
                    <a 
                      href={WAZE_LINK}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full md:w-auto bg-sage-dark border border-sage-dark text-white hover:bg-sage-dark/90 px-6 py-3 rounded-full font-heading text-xs uppercase tracking-widest shadow-md flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <Car size={18} />
                      <span>Waze</span>
                    </a>
                  </div>
                </div>

            </div>
            
        </div>

      </div>
    </section>
  );
};

export default Countdown;