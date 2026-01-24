import React, { useState, useEffect, useRef } from 'react';
import { Maximize2 } from 'lucide-react';
import EnchantedReveal from './EnchantedReveal';
import ImageModal from './ImageModal';

// --- DYNAMIC IMAGE LOADING ---
const GALLERY_IMAGES = Array.from({ length: 50 }, (_, i) => ({
  src: new URL(`../assets/gallery/image (${i + 1}).JPG`, import.meta.url).href
}));

const MID_POINT = Math.ceil(GALLERY_IMAGES.length / 2);
const ROW_1_IMAGES = GALLERY_IMAGES.slice(0, MID_POINT);
const ROW_2_IMAGES = GALLERY_IMAGES.slice(MID_POINT);

const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{src: string, caption?: string} | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-paper pt-28 pb-20 flex flex-col gap-10">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
        imageSrc={selectedImage?.src || null}
        caption="" 
      />

      <div className="container mx-auto px-4 text-center">
        <EnchantedReveal>
          <h1 className="font-script text-5xl md:text-6xl text-sage-dark mb-4">Our Gallery</h1>
        </EnchantedReveal>
        <EnchantedReveal delay={0.2}>
          <p className="font-body text-gray-600 max-w-2xl mx-auto italic text-sm md:text-base">
            A collection of moments that tell the story of us.
          </p>
        </EnchantedReveal>
      </div>

      <div className="flex flex-col gap-8 md:gap-12">
        
        {/* Row 1: Moves Left */}
        <InteractiveMarquee 
          images={ROW_1_IMAGES} 
          direction="left" 
          speed={0.35} 
          onImageClick={setSelectedImage} 
        />

        {/* Row 2: Moves Right */}
        <InteractiveMarquee 
          images={ROW_2_IMAGES} 
          direction="right" 
          speed={0.35} 
          onImageClick={setSelectedImage} 
        />

      </div>

      <div className="text-center opacity-60">
        <p className="font-heading text-[10px] md:text-xs uppercase tracking-widest text-sage-dark">
          Drag to scroll • Click to expand
        </p>
      </div>
    </div>
  );
};

// --- INTERACTIVE COMPONENT ---
interface MarqueeProps {
  images: { src: string }[];
  direction: 'left' | 'right';
  speed: number;
  onImageClick: (img: { src: string }) => void;
}

const InteractiveMarquee: React.FC<MarqueeProps> = ({ images, direction, speed, onImageClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<number>(0);
  const isInitialized = useRef(false);
  const requestRef = useRef<number>();
  
  // Drag State
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasDragged, setHasDragged] = useState(false); // To prevent clicks when dragging

  const displayImages = [...images, ...images, ...images];

  // --- MOUSE EVENT HANDLERS (Manual Drag) ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setIsHovered(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setStartScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
    // Delay resuming auto-scroll slightly so user can read
    setTimeout(() => setIsHovered(false), 1000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiply by 1.5 for faster dragging feel
    
    // If moved more than 5 pixels, consider it a "Drag" not a "Click"
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }

    const newPos = startScrollLeft - walk;
    scrollRef.current.scrollLeft = newPos;
    positionRef.current = newPos; // Sync float tracker
  };

  // --- ANIMATION LOOP (Auto Scroll) ---
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    if (!isInitialized.current) {
      const singleSetWidth = scrollContainer.scrollWidth / 3;
      if (singleSetWidth > 0) {
        positionRef.current = singleSetWidth;
        scrollContainer.scrollLeft = singleSetWidth;
        isInitialized.current = true;
      }
    }

    const animate = () => {
      if (!scrollContainer) return;
      const singleSetWidth = scrollContainer.scrollWidth / 3;

      // Only auto-scroll if NOT holding mouse down and NOT hovering
      if (!isDown && !isHovered && singleSetWidth > 0) {
        if (direction === 'left') {
          positionRef.current += speed;
        } else {
          positionRef.current -= speed;
        }

        // Teleport Logic
        if (positionRef.current >= singleSetWidth * 2) {
          positionRef.current = singleSetWidth;
        } else if (positionRef.current <= 0) {
          positionRef.current = singleSetWidth;
        }

        scrollContainer.scrollLeft = positionRef.current;
      } 
      else if (isDown || isHovered) {
        // Keep tracker synced while user is in control
        positionRef.current = scrollContainer.scrollLeft;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [direction, speed, isHovered, isDown, images]);

  return (
    <div className="relative w-full group">
      {/* Fade Edges */}
      <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-paper to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-paper to-transparent z-20 pointer-events-none"></div>

      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none" // select-none fixes the blue highlight
        
        // Mouse Events
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}

        // Touch Events (Native momentum)
        onTouchStart={() => { setIsHovered(true); setHasDragged(false); }}
        onTouchMove={() => setHasDragged(true)}
        onTouchEnd={() => setTimeout(() => setIsHovered(false), 1000)}
        
        style={{ 
          WebkitOverflowScrolling: 'touch', 
          overscrollBehaviorX: 'none' 
        }}
      >
        {displayImages.map((img, idx) => (
          <GalleryCard 
            key={`${direction}-${idx}`} 
            img={img} 
            // Only fire click if we haven't dragged
            onClick={() => {
              if (!hasDragged) onImageClick(img);
            }} 
          />
        ))}
      </div>
    </div>
  );
};

const GalleryCard = ({ img, onClick }: { img: { src: string }, onClick: () => void }) => (
  <div 
    className="relative flex-shrink-0 mx-3 md:mx-4 transition-transform duration-500 hover:scale-105"
    // onMouseDown here prevents the image itself from being "dragged" as a file ghost
    onMouseDown={(e) => e.preventDefault()} 
    onClick={onClick}
  >
    <div className="bg-white p-2 md:p-3 shadow-lg rotate-1 hover:rotate-0 transition-transform duration-500 rounded-sm">
      <div className="overflow-hidden bg-gray-100 relative">
        <img 
          src={img.src} 
          alt="Gallery Memory"
          className="h-[250px] md:h-[350px] w-auto object-cover block pointer-events-none" // Double protection
          loading="lazy"
        />
        <div className="absolute inset-0 bg-sage-dark/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/90 p-2 md:p-3 rounded-full text-sage-dark shadow-sm">
             <Maximize2 size={20} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default GalleryPage;