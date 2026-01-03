
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | null;
  altText?: string;
  caption?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ 
  isOpen, 
  onClose, 
  imageSrc, 
  altText = "Full screen view",
  caption 
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && imageSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center"
          onClick={onClose}
        >
          {/* Navigation Bar Area */}
          <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-start z-[10000] pointer-events-none">
            {/* High Contrast Back Button */}
            <button
              onClick={onClose}
              className="pointer-events-auto flex items-center gap-2 bg-white text-sage-dark px-5 py-3 rounded-full shadow-lg hover:bg-gray-100 active:scale-95 transition-all group border border-sage-light/20"
              aria-label="Go Back"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-heading text-xs uppercase tracking-widest font-bold">Back</span>
            </button>
          </div>

          {/* Content Wrapper */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative max-w-full max-h-full p-4 flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
             <div className="relative rounded-lg overflow-hidden shadow-2xl">
               <img
                 src={imageSrc}
                 alt={altText}
                 className="max-w-[95vw] max-h-[80vh] object-contain"
               />
             </div>
             
             {/* Caption */}
             {caption && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 text-center px-4 max-w-2xl mx-auto pointer-events-none"
                >
                   <p className="font-heading text-xl text-white tracking-wider uppercase drop-shadow-md">
                      {caption}
                   </p>
                </motion.div>
             )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render to document body to avoid parent transform stacking contexts
  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body) 
    : null;
};

export default ImageModal;
