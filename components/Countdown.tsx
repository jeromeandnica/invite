
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';

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
        // Optional: Handle post-wedding state
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
        <div className="mb-12 space-y-4">
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
          <p className="font-body text-gray-500 italic text-lg">Saturday</p>
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

        {/* Venue & Map Section (The "Where") */}
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="font-script text-6xl text-sage-dark mb-4">The Venue</h2>
                <div className="flex items-center justify-center gap-2 text-brown-earth">
                    <MapPin className="w-5 h-5" />
                    <p className="font-heading text-xl uppercase tracking-wide">Mahogany Place, Tagaytay</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-lg border border-sage-light/20">
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
        </div>

      </div>
    </section>
  );
};

export default Countdown;
