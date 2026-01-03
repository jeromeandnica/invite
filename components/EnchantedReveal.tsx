
import React from 'react';
import { motion } from 'framer-motion';

interface EnchantedRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  className?: string;
}

const EnchantedReveal: React.FC<EnchantedRevealProps> = ({ 
  children, 
  width = "fit-content", 
  delay = 0,
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
      whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease: "easeOut", delay }}
      style={{ width }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default EnchantedReveal;
