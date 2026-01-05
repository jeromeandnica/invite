import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import logoImg from '../assets/logo.png'; 
// ==================================================================================
// !!! REPLACE THIS IMAGE: NAVBAR LOGO !!!
// Description: The logo displayed in the top left of the navigation bar.
// Recommended: Transparent PNG, approx height 50-80px.
// ==================================================================================
const logoImage = logoImg;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = () => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  const handleRsvpClick = () => {
    setIsOpen(false);
    if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation then scroll
        setTimeout(() => {
            const rsvpSection = document.getElementById('rsvp');
            if (rsvpSection) rsvpSection.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    } else {
        const rsvpSection = document.getElementById('rsvp');
        if (rsvpSection) rsvpSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHome = location.pathname === '/';
  const isFaq = location.pathname === '/faq';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-soft/95 backdrop-blur-sm shadow-sm border-b border-sage-light/20 transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          to="/"
          onClick={handleNavClick}
          className="hover:opacity-80 transition-opacity flex items-center"
        >
          <img 
            src={logoImage} 
            alt="Jerome & Nica Logo" 
            className="h-14 md:h-12 w-auto object-contain" 
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/"
            onClick={handleNavClick}
            className={`font-heading text-sm uppercase tracking-widest hover:text-sage-dark transition-colors duration-200 ${
              isHome ? 'text-sage-dark font-bold border-b-2 border-sage-dark pb-1' : 'text-gray-500'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/faq"
            onClick={handleNavClick}
            className={`font-heading text-sm uppercase tracking-widest hover:text-sage-dark transition-colors duration-200 ${
              isFaq ? 'text-sage-dark font-bold border-b-2 border-sage-dark pb-1' : 'text-gray-500'
            }`}
          >
            FAQs
          </Link>
          {/* RSVP Button - Kept as a button on Desktop for emphasis, but you can change this too if you want */}
          <button 
            onClick={handleRsvpClick}
            className="bg-sage-dark text-white px-6 py-2 rounded-full font-heading text-xs uppercase tracking-wider hover:bg-sage-dark/90 transition-all duration-200 shadow-md active:scale-95"
          >
            RSVP
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-sage-dark p-2 transition-transform duration-200 active:scale-90"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden bg-cream-soft border-t border-sage-light/20 absolute w-full shadow-lg overflow-hidden"
          >
            <div className="flex flex-col py-6 px-6 space-y-4">
              <Link 
                to="/"
                onClick={handleNavClick}
                className={`text-left font-heading text-sm uppercase tracking-widest py-2 transition-colors ${
                  isHome ? 'text-sage-dark font-bold' : 'text-gray-600'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/faq"
                onClick={handleNavClick}
                className={`text-left font-heading text-sm uppercase tracking-widest py-2 transition-colors ${
                  isFaq ? 'text-sage-dark font-bold' : 'text-gray-600'
                }`}
              >
                FAQs
              </Link>
              
              {/* UPDATED: RSVP Button matches Link style now */}
              <button 
                onClick={handleRsvpClick}
                className="text-left font-heading text-sm uppercase tracking-widest py-2 text-gray-600 hover:text-sage-dark transition-colors"
              >
                RSVP
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;