import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Entourage from './components/Entourage';
import Attire from './components/Attire';
import Rsvp from './components/Rsvp';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';
import GalleryPage from './components/GalleryPage';
import GuestDashboard from './components/GuestDashboard';
import Faq from './components/Faq';
import IntroGate from './components/IntroGate';
import { GuestGroup } from './utils/firebase';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast'; // Ensure this is imported for your notifications

const Home: React.FC<{ initialGuest: GuestGroup | null }> = ({ initialGuest }) => (
  <>
    <Hero />
    
    <ScrollReveal>
      <Countdown />
    </ScrollReveal>
    
    <ScrollReveal>
      <Entourage />
    </ScrollReveal>
    
    <ScrollReveal>
      <Attire />
    </ScrollReveal>
    
    <ScrollReveal className="relative z-30">
      <Rsvp initialGuest={initialGuest} />
    </ScrollReveal>
  </>
);

const App: React.FC = () => {
  // 1. CHECK URL IMMEDIATELY
  // We check if the current URL hash contains 'dashboard'.
  // If it does, we set the initial state to TRUE (Show site), skipping the IntroGate.
  const isDashboard = window.location.hash.includes('dashboard');

  const [currentGuest, setCurrentGuest] = useState<GuestGroup | null>(null);
  
  // 2. USE THAT CHECK FOR INITIAL STATE
  const [showMainSite, setShowMainSite] = useState(isDashboard);

  const handleEnterSite = (guest: GuestGroup) => {
    setCurrentGuest(guest);
    setShowMainSite(true);
    window.scrollTo(0, 0);
  };

  return (
    <HashRouter>
      <Toaster position="top-center" />
      
      <main className="w-full min-h-screen bg-paper text-gray-800 overflow-x-hidden">
        
        <AnimatePresence mode='wait'>
          {!showMainSite ? (
            <IntroGate onEnterSite={handleEnterSite} />
          ) : (
            <motion.div
              key="main-site" // Added key for AnimatePresence to work correctly
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {/* Optional: Hide Navbar on Dashboard if you want a clean view */}
              {!isDashboard && <Navbar />}
              {/* Or just <Navbar /> if you want navigation on the dashboard too */}

              <Routes>
                <Route path="/" element={<Home initialGuest={currentGuest} />} />
                
                <Route path="/gallery" element={
                  <div className="animate-fade-in">
                    <GalleryPage />
                  </div>
                } />
                
                <Route path="/faq" element={
                  <div className="animate-fade-in">
                     <Faq />
                  </div>
                } />

                {/* Dashboard Route */}
                <Route path="/dashboard" element={<GuestDashboard />} />
              </Routes>
              
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </HashRouter>
  );
};

export default App;