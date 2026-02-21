import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GuestGroup } from '../utils/firebase';
import { Heart, Users, MousePointer2 } from 'lucide-react';

interface EnchantedEnvelopeProps {
  guest: GuestGroup;
  onEnterSite: () => void;
}

const Sparkle = ({ delay, x, y, size, isBurst }: { delay: number, x: string, y: string, size: number, isBurst?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={isBurst ? {
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      x: [0, (Math.random() - 0.5) * 400],
      y: [0, (Math.random() - 0.5) * 400],
    } : { 
      opacity: [0, 0.8, 0], 
      scale: [0, 1.2, 0],
      y: ["0px", "-150px"]
    }}
    transition={{ 
      duration: isBurst ? 2 : 3 + Math.random() * 2, 
      repeat: isBurst ? 0 : Infinity, 
      delay: delay,
      ease: "easeOut"
    }}
    className="absolute rounded-full bg-beige-sand/60 blur-[1px] pointer-events-none z-50"
    style={{ left: x, top: y, width: size, height: size }}
  />
);

const EnchantedEnvelope: React.FC<EnchantedEnvelopeProps> = ({ guest, onEnterSite }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  
  // NEW: Track if we are in the process of leaving to the main site
  const [isExiting, setIsExiting] = useState(false);
  
  const [flapStage, setFlapStage] = useState<'closed' | 'peek' | 'open'>('closed');
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  // Correct Image Import
  const couplePhoto = new URL('../assets/gallery/image (37).jpg', import.meta.url).href;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setScreenSize('desktop');
      else if (window.innerWidth >= 768) setScreenSize('tablet');
      else setScreenSize('mobile');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpen = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    setFlapStage('peek');
    
    setTimeout(() => {
      setFlapStage('open');
      setTimeout(() => setIsOpen(true), 3250); 
    }, 800);
  };

  // NEW: Handle the exit gracefully
  const handleEnterClick = () => {
    setIsExiting(true);
    // Wait for the opacity animation to finish before unmounting parent
    setTimeout(() => {
        onEnterSite();
    }, 800);
  };

  const sparkles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 5,
      x: `${Math.random() * 100}%`,
      y: `${60 + Math.random() * 40}%`,
      size: 2 + Math.random() * 4
    }));
  }, []);

  const burstSparkles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: `burst-${i}`,
      delay: 0,
      x: `50%`,
      y: `50%`,
      size: 3 + Math.random() * 6
    }));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 pt-10 pb-10 overflow-y-auto overflow-x-hidden bg-sage-dark relative perspective-1000">
      <motion.div 
        animate={{ 
          opacity: isOpening ? [0.15, 0.6, 0.2] : 0.15,
          scale: isOpening ? [1, 1.8, 1.4] : 1
        }}
        transition={{ duration: 3 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(193,170,135,1)_0%,_transparent_70%)] pointer-events-none fixed" 
      />
      
      {!isOpening && sparkles.map((s) => (
        <Sparkle key={s.id} {...s} />
      ))}

      {isOpening && !isOpen && burstSparkles.map((s) => (
        <Sparkle key={s.id} {...s} isBurst />
      ))}

      {/* This wrapper handles the "Enter Celebration" fade out.
        It ensures the content disappears SMOOTHLY before the component actually unmounts.
      */}
      <motion.div
        animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 1.1 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative z-10 flex items-center justify-center w-full"
      >
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="envelope-container"
                initial={{ scale: 0.8, opacity: 0, y: 0 }}
                animate={{ scale: 1, opacity: 1, y: 85 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative cursor-pointer group z-10"
                onClick={handleOpen}
              >
                <div className="relative w-[280px] h-[200px] md:w-[450px] md:h-[315px] lg:w-[450px] lg:h-[315px] shadow-[0_60px_140px_-20px_rgba(0,0,0,0.8)] overflow-visible">
                  
                  <div className="absolute inset-0 bg-sage-light rounded-sm overflow-hidden border border-white/20">
                    <div className="absolute inset-0 opacity-20 mix-blend-multiply"
                      style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
                    />
                  </div>

                  {/* 1. Polaroid Photo */}
                  <motion.div 
                    animate={{ 
                        y: flapStage === 'open' ? (screenSize === 'mobile' ? -120 : -170) : 0, 
                        x: flapStage === 'open' ? (screenSize === 'mobile' ? 20 : 20) : 0,
                        rotate: flapStage === 'open' ? 10 : 0,
                        opacity: flapStage === 'open' ? 1 : 0
                    }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="absolute right-4 top-4 w-[140px] h-[115px] md:w-[245px] md:h-[180px] lg:w-[245px] lg:h-[180px] bg-white shadow-xl z-10 p-1.5 md:p-3 lg:p-3 flex flex-col items-center border border-gray-100"
                  >
                    <div className="w-full h-[80%] overflow-hidden bg-gray-100">
                        <img src={couplePhoto} alt="Jerome & Nica" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex items-center">
                        <p className="font-script text-brown-earth text-sm md:text-xl lg:text-xl">Jerome & Nica</p>
                    </div>
                  </motion.div>

                  {/* 2. Reserved For Card */}
                  <motion.div 
                    animate={{ 
                        y: flapStage === 'open' ? (screenSize === 'mobile' ? -150 : -215) : 0,
                        x: flapStage === 'open' ? (screenSize === 'mobile' ? -15 : -10) : 0,
                        rotate: flapStage === 'open' ? -6 : 0
                    }}
                    transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-4 top-4 w-[130px] h-[160px] md:w-[200px] md:h-[260px] lg:w-[200px] lg:h-[260px] bg-paper shadow-2xl z-10 flex flex-col items-center justify-center p-3 md:p-8 lg:p-8 border border-sage-light/30 text-center"
                  >
                    <div className="space-y-1 md:space-y-3">
                        <p className="font-heading text-sage-dark/60 text-[7px] md:text-[10px] lg:text-[10px] uppercase tracking-widest font-bold">Reserved for</p>
                        <h3 className="font-script text-base md:text-3xl lg:text-3xl text-sage-dark leading-tight break-words max-w-full px-1">
                          {guest.groupName}
                        </h3>
                        <div className="flex items-center justify-center gap-1 mt-2 md:mt-4 pt-2 border-t border-sage-light/10">
                            <Users size={screenSize === 'mobile' ? 10 : 20} className="text-sage-light" />
                            <p className="font-heading text-[8px] md:text-xs lg:text-xs text-sage-dark/80 uppercase tracking-widest font-bold">
                                {guest.members.length} {guest.members.length === 1 ? 'Guest' : 'Guests'}
                            </p>
                        </div>
                    </div>
                  </motion.div>

                  {/* 3. Details Card */}
                  <motion.div 
                    animate={{ 
                        y: flapStage === 'open' ? (screenSize === 'mobile' ? -90 : -170) : 0,
                        x: flapStage === 'open' ? (screenSize === 'mobile' ? -30 : -70) : 0,
                        rotate: flapStage === 'open' ? -5 : 0,
                        opacity: flapStage === 'open' ? 1 : 0
                    }}
                    transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                    className="absolute right-9 bottom-8 w-[140px] h-[70px] md:w-[220px] md:h-[80px] lg:w-[220px] lg:h-[80px] bg-white shadow-xl z-10 p-1.5 md:p-6 lg:p-6 flex flex-col items-center justify-center border border-gray-100"
                  >
                    <p className="font-heading text-[10px] md:text-xs lg:text-xs text-sage-dark/40 uppercase tracking-widest mb-1 md:mb-2">Invitation</p>
                    <p className="font-script text-xl md:text-3xl lg:text-3xl text-beige-sand">March 21, 2026</p>
                  </motion.div>

                  {/* Envelope Flaps */}
                  <div 
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{ 
                      clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 50%)',
                      background: 'linear-gradient(135deg, #8FA083 0%, #7d8f6f 50%, #56644B 100%)',
                      boxShadow: 'inset 0 0 50px rgba(0,0,0,0.3)'
                    }}
                  />

                  <motion.div 
                    animate={{ 
                      rotateX: flapStage === 'open' ? -175 : flapStage === 'peek' ? -35 : 0,
                      zIndex: flapStage === 'open' ? 0 : 30
                    }}
                    transition={{ 
                        duration: flapStage === 'open' ? 1.2 : 0.8, 
                        ease: flapStage === 'open' ? "easeIn" : "easeInOut" 
                    }}
                    className="absolute top-0 left-0 right-0 h-1/2 bg-[#9FB294] origin-top border-b border-black/10 shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
                    style={{ 
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden'
                    }}
                  />

                  {/* Wax Seal */}
                  <motion.div 
                    animate={{ 
                      scale: flapStage === 'open' ? 0.6 : flapStage === 'peek' ? 1.1 : 1,
                      opacity: flapStage === 'open' ? 0 : 1,
                      y: flapStage === 'open' ? (screenSize === 'mobile' ? -180 : -250) : flapStage === 'peek' ? -40 : 0
                    }}
                    transition={{ duration: flapStage === 'open' ? 1.2 : 0.8 }}
                    className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 md:w-24 md:h-24 lg:w-24 lg:h-24 bg-[#b08b5c] rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.6),inset_0_-5px_10px_rgba(0,0,0,0.4)] flex items-center justify-center border-[2px] border-[#a07a4a] overflow-hidden">
                          <div className="absolute inset-0 opacity-25 mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/granite.png")' }} />
                          <div className="w-12 h-12 md:w-16 md:h-16 lg:w-16 lg:h-16 bg-[#c19a6b] rounded-full shadow-inner border border-[#d4af37]/30 flex items-center justify-center text-white">
                            <Heart size={screenSize === 'mobile' ? 24 : 48} fill="currentColor" />
                          </div>
                      </div>
                      <div className="absolute -inset-2 border border-[#d4af37]/30 rounded-full animate-pulse-slow" />
                    </div>
                  </motion.div>
                </div>
                
                <motion.div 
                  animate={{ opacity: flapStage === 'closed' ? 1 : 0 }}
                  className="mt-12 flex flex-col items-center gap-3"
                >
                  <p className="font-heading text-cream-soft uppercase tracking-[0.5em] text-[10px] md:text-base text-center font-bold">
                    Open Your Invitation
                  </p>
                  <div className="flex items-center gap-2 text-beige-sand animate-pulse">
                    <span className="font-body text-[9px] md:text-sm italic uppercase tracking-[0.2em] font-bold">Tap the seal</span>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="invitation-card"
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="flex flex-col items-center z-10 w-full px-4"
              >
                {/* LANDSCAPE INVITATION CARD */}
                <motion.div
                  className="w-full max-w-[320px] md:max-w-[700px] lg:max-w-[850px] h-[580px] md:h-[400px] lg:h-[480px] bg-paper rounded-sm shadow-[0_60px_130px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-stretch border border-sage-light/40 relative overflow-hidden shrink-0"
                >
                  {/* Decorative Borders */}
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-3 border border-sage-light/10" />
                    <div className="absolute inset-6 border-2 border-double border-sage-light/20" />
                    <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-beige-sand/40" />
                    <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-beige-sand/40" />
                    <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-beige-sand/40" />
                    <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-beige-sand/40" />
                  </div>

                  {/* Landscape Layout Content */}
                  <div className="relative z-10 flex flex-col md:flex-row w-full h-full p-6 md:p-10">
                    
                    {/* LEFT SIDE: Couple & Event Info */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center h-full md:border-r border-sage-light/15 md:pr-10">
                      
                      <div className="w-full flex flex-col items-center justify-center space-y-4 md:space-y-6 lg:space-y-8">
                          
                          <div className="space-y-1 lg:space-y-2 flex flex-col items-center">
                            <p className="font-heading text-sage-dark/60 uppercase tracking-[0.4em] text-[8px] md:text-[9px] lg:text-[11px] font-bold">
                              You are cordially invited to
                            </p>
                            <h2 className="font-script text-5xl md:text-6xl lg:text-7xl text-sage-dark leading-[0.85] py-2">
                              Jerome & Nica's
                            </h2>
                            
                            <div className="flex items-center justify-center gap-3">
                              <div className="h-[1px] w-8 bg-beige-sand/40" />
                              <p className="font-heading text-sm md:text-lg lg:text-2xl text-brown-earth uppercase tracking-[0.4em] font-medium">Wedding</p>
                              <div className="h-[1px] w-8 bg-beige-sand/40" />
                            </div>
                          </div>

                          <div className="pt-4 md:pt-6 border-t border-sage-light/10 w-full flex flex-col items-center">
                            <p className="font-heading text-xl md:text-2xl lg:text-3xl uppercase tracking-[0.3em] font-black text-sage-dark">March 21, 2026</p>
                            <p className="font-body text-gray-500 italic text-[10px] md:text-xs lg:text-base tracking-[0.1em] font-medium mt-1">Mahogany Place, Tagaytay City</p>
                          </div>

                      </div>
                    </div>

                    {/* RIGHT SIDE: Guest & Call to Action */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center w-full h-full mt-6 md:mt-0 md:pl-10">
                      
                      <div className="w-full flex flex-col items-center justify-center space-y-6 md:space-y-8 lg:space-y-12">
                          
                          <div className="space-y-2 flex flex-col items-center w-full">
                            <p className="font-heading text-sage-dark/50 uppercase tracking-[0.25em] text-[7px] md:text-[10px] lg:text-[11px] mb-3 font-bold">
                              For the honor of the presence of
                            </p>
                            
                            <h3 className="font-script text-3xl md:text-4xl lg:text-5xl text-beige-sand leading-tight drop-shadow-sm mb-3 break-words px-2 max-w-full">
                              {guest.groupName}
                            </h3>
                            
                            <div className="flex items-center justify-center gap-2 text-sage-dark font-heading uppercase tracking-[0.15em] font-black">
                              <Users size={screenSize === 'mobile' ? 14 : 20} className="text-sage-light" />
                              <span className="text-[10px] md:text-sm lg:text-lg">
                                {guest.members.length} {guest.members.length === 1 ? 'Seat' : 'Seats'} Reserved
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col items-center gap-4 w-full">
                            <motion.button
                              whileHover={{ scale: 1.05, backgroundColor: '#4a573d' }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleEnterClick} // CHANGED: Calls our new fade-out handler
                              className="w-fit bg-sage-dark text-white px-8 md:px-12 py-3.5 md:py-4 rounded-full font-heading text-[10px] md:text-xs lg:text-xs uppercase tracking-[0.4em] transition-all shadow-2xl border border-white/10 flex items-center justify-center gap-3 cursor-pointer relative z-50 font-black"
                            >
                              Enter Celebration
                            </motion.button>
                            
                            <motion.div 
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 4, repeat: Infinity }}
                              className="flex items-center justify-center gap-2 text-sage-dark/30"
                            >
                              <MousePointer2 size={12} />
                              <span className="font-heading text-[7px] md:text-[9px] lg:text-[10px] uppercase tracking-[0.2em] font-black">Click to enter</span>
                            </motion.div>
                          </div>

                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default EnchantedEnvelope;