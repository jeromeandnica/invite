
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-sage-light text-sage-dark py-16 text-center">
      <div className="container mx-auto px-4">
        <h3 className="font-heading text-lg md:text-3xl mb-2 tracking-wider flex items-baseline justify-center flex-wrap gap-1">
          <span>#WhenDesti</span>
          <span className="font-script text-4xl md:text-7xl mx-1">Nica</span>
          <span>meFor</span>
          <span className="font-script text-4xl md:text-7xl mx-1">Jerome</span>
        </h3>
        <p className="font-body text-sm opacity-80 mt-6 font-medium">
          © 2026 Jerome & Nica. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
