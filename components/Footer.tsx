
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-sage-light text-sage-dark py-16 text-center relative">
      <div className="container mx-auto px-4">
        <h3 className="font-heading text-lg md:text-3xl mb-2 tracking-wider">
          #WhenDestiNICAmeForJEROME
        </h3>
        <p className="font-body text-sm opacity-80 mt-6 font-medium">
          © 2026 Jerome & Nica. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
