
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GuestGroup } from '../utils/firebase';
import RsvpSearch from './RsvpSearch';
import EnchantedEnvelope from './EnchantedEnvelope';
import EnchantedReveal from './EnchantedReveal';

interface IntroGateProps {
  onEnterSite: (guest: GuestGroup) => void;
}

const IntroGate: React.FC<IntroGateProps> = ({ onEnterSite }) => {
  const [selectedGuest, setSelectedGuest] = useState<GuestGroup | null>(null);

  return (
    <div className="fixed inset-0 z-[100] bg-paper overflow-hidden">
      <AnimatePresence mode="wait">
        {!selectedGuest ? (
          <motion.div
            key="search-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="h-full w-full flex flex-col items-center justify-center p-6 bg-[#fdfbf7]"
          >
            <div className="max-w-xl w-full text-center space-y-12">
              <EnchantedReveal width="100%">
                <div className="space-y-4">
                  <h1 className="font-script text-7xl md:text-8xl text-sage-dark">Welcome</h1>
                  <p className="font-heading text-lg uppercase tracking-[0.4em] text-sage-light">Search for your invitation</p>
                </div>
              </EnchantedReveal>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative z-[110]"
              >
                <RsvpSearch onSelect={(guest) => setSelectedGuest(guest)} />
              </motion.div>
              
              <EnchantedReveal delay={0.8} width="100%">
                <p className="font-body text-gray-400 text-sm italic max-w-sm mx-auto">
                  Please enter your name as it appears on your physical invitation or message from the couple.
                </p>
              </EnchantedReveal>
            </div>
            
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 opacity-5 pointer-events-none">
              <img src="https://www.transparenttextures.com/patterns/vintage-floral.png" alt="" className="w-full h-full object-contain" />
            </div>
            <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5 pointer-events-none rotate-180">
              <img src="https://www.transparenttextures.com/patterns/vintage-floral.png" alt="" className="w-full h-full object-contain" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="envelope-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full"
          >
            <EnchantedEnvelope 
              guest={selectedGuest} 
              onEnterSite={() => onEnterSite(selectedGuest)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroGate;
