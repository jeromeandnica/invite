import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Entourage from './components/Entourage';
import Attire from './components/Attire';
import Rsvp from './components/Rsvp';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';
import Faq from './components/Faq';
import GuestDashboard from './components/GuestDashboard'; // <--- 1. Import Dashboard

const Home: React.FC = () => (
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
      <Rsvp />
    </ScrollReveal>
  </>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <main className="w-full min-h-screen bg-paper text-gray-800 overflow-x-hidden">
        
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={
            <div className="animate-fade-in">
               <Faq />
            </div>
          } />

          {/* 2. Add Secret Dashboard Route */}
          <Route path="/dashboard" element={<GuestDashboard />} />
          
        </Routes>
        
        <Footer />
      </main>
    </HashRouter>
  );
};

export default App;