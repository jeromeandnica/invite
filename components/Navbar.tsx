import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
          className="font-script text-3xl md:text-4xl text-sage-dark hover:opacity-80 transition-opacity"
        >
          J&N
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/"
            onClick={handleNavClick}
            className={`font-heading text-sm uppercase tracking-widest hover:text-sage-dark transition-colors ${
              isHome ? 'text-sage-dark font-bold border-b-2 border-sage-dark pb-1' : 'text-gray-500'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/faq"
            onClick={handleNavClick}
            className={`font-heading text-sm uppercase tracking-widest hover:text-sage-dark transition-colors ${
              isFaq ? 'text-sage-dark font-bold border-b-2 border-sage-dark pb-1' : 'text-gray-500'
            }`}
          >
            FAQs
          </Link>
          {/* RSVP Button */}
          <button 
            onClick={handleRsvpClick}
            className="bg-sage-dark text-white px-6 py-2 rounded-full font-heading text-xs uppercase tracking-wider hover:bg-sage-dark/90 transition-colors shadow-md"
          >
            RSVP
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-sage-dark p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-cream-soft border-t border-sage-light/20 animate-fade-in absolute w-full shadow-lg">
          <div className="flex flex-col py-4 px-6 space-y-4">
            <Link 
              to="/"
              onClick={handleNavClick}
              className={`text-left font-heading text-sm uppercase tracking-widest py-2 ${
                isHome ? 'text-sage-dark font-bold' : 'text-gray-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/faq"
              onClick={handleNavClick}
              className={`text-left font-heading text-sm uppercase tracking-widest py-2 ${
                isFaq ? 'text-sage-dark font-bold' : 'text-gray-600'
              }`}
            >
              FAQs
            </Link>
            <button 
              onClick={handleRsvpClick}
              className="bg-sage-dark text-white px-6 py-3 rounded text-center font-heading text-xs uppercase tracking-wider"
            >
              RSVP
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;