import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, Loader2, Play } from 'lucide-react'; // Added Play icon
import EnchantedReveal from './EnchantedReveal';
import ImageModal from './ImageModal';

// --- DYNAMIC IMAGE LOADING ---
const GALLERY_IMAGES = Array.from({ length: 50 }, (_, i) => ({
  src: new URL(`../assets/gallery/image (${i + 1}).JPG`, import.meta.url).href
}));

const VIDEO_THUMBNAIL = new URL('../assets/gallery/image (46).JPG', import.meta.url).href;
const VIDEO_SRC = new URL('../assets/jeromenicavideo.mp4', import.meta.url).href;

const MID_POINT = Math.ceil(GALLERY_IMAGES.length / 2);
const ROW_1_IMAGES = GALLERY_IMAGES.slice(0, MID_POINT);
const ROW_2_IMAGES = GALLERY_IMAGES.slice(MID_POINT);

const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{src: string, caption?: string} | null>(null);
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false); // State to toggle video placeholder

  useEffect(() => {
    window.scrollTo(0, 0);

    const preloadImages = async () => {
      const promises = GALLERY_IMAGES.map((image) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = image.src;
          img.onload = resolve;
          img.onerror = resolve; 
        });
      });

      await Promise.all(promises);
      setAreImagesLoaded(true);
    };

    preloadImages();
  }, []);

  if (!areImagesLoaded) {
    return (
      <div className="min-h-screen bg-paper flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-sage-dark animate-spin mb-4" />
        <p className="font-heading text-xs uppercase tracking-widest text-sage-dark/60 animate-pulse">
          Developing Photos...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper pt-28 pb-20 flex flex-col gap-16 animate-fade-in">
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

      {/* HEADER */}
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

      {/* MARQUEE SECTION */}
      <div className="flex flex-col gap-8 md:gap-12">
        <InteractiveMarquee 
          images={ROW_1_IMAGES} 
          direction="left" 
          speed={0.35} 
          onImageClick={setSelectedImage} 
        />
        <InteractiveMarquee 
          images={ROW_2_IMAGES} 
          direction="right" 
          speed={0.35} 
          onImageClick={setSelectedImage} 
        />
        <div className="text-center opacity-40 -mt-4">
            <p className="font-heading text-[10px] md:text-xs uppercase tracking-widest text-sage-dark">
            Drag to scroll • Click to expand
            </p>
        </div>
      </div>

      {/* --- VIDEO SECTION --- */}
      <section className="container mx-auto px-4 max-w-5xl pt-8 pb-12">
        <div className="text-center mb-8">
            <EnchantedReveal width="100%">
                {/* Centered Title with Decorative Lines */}
                <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="h-px bg-sage-dark/20 w-12 md:w-24"></div>
                    <h2 className="font-script text-5xl md:text-6xl text-sage-dark px-4">
                      Save The Date
                    </h2>
                    <div className="h-px bg-sage-dark/20 w-12 md:w-24"></div>
                </div>
            </EnchantedReveal>
            
            <EnchantedReveal delay={0.1} width="100%">
              <p className="font-heading text-xs uppercase tracking-[0.3em] text-gray-400">
                Official Teaser
              </p>
            </EnchantedReveal>
        </div>

        <EnchantedReveal delay={0.2} width="100%">
            {/* VIDEO CONTAINER */}
            <div className="relative w-full aspect-video bg-black rounded-xl shadow-2xl overflow-hidden border-[6px] border-white ring-1 ring-gray-200 group mx-auto">
                
                {!isVideoPlaying ? (
                    /* 1. PLACEHOLDER STATE */
                    <div 
                        className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 cursor-pointer"
                        onClick={() => setIsVideoPlaying(true)}
                    >
                        {/* Thumbnail Image */}
                        <div 
                          className="absolute inset-0 opacity-40 bg-cover bg-center grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                          style={{ backgroundImage: `url("${VIDEO_THUMBNAIL}")` }}
                        ></div>
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500"></div>
                        
                        {/* Play Button */}
                        <div className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Play size={40} className="text-white fill-white ml-1" />
                        </div>
                        <p className="relative z-10 mt-4 font-heading text-white text-xs uppercase tracking-[0.2em] font-bold">
                          Watch Video
                        </p>
                    </div>
                ) : (
                    /* 2. ACTUAL VIDEO EMBED */
                <video
                    className="w-full h-full object-cover"
                    src={VIDEO_SRC} 
                    title="Save The Date Video"
                    controls             // Adds Play/Pause/Volume controls
                    autoPlay             // Starts playing immediately
                    playsInline          // Prevents full-screen force on iOS
                    poster={VIDEO_THUMBNAIL} // Optional: Shows thumbnail while loading
                >
                    Your browser does not support the video tag.
                </video>
                )}
            </div>
        </EnchantedReveal>
      </section>

    </div>
  );
};

// --- INTERACTIVE MARQUEE COMPONENT (UNCHANGED) ---
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
  
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  const displayImages = [...images, ...images, ...images];

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
    setTimeout(() => setIsHovered(false), 1000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }

    const newPos = startScrollLeft - walk;
    scrollRef.current.scrollLeft = newPos;
    positionRef.current = newPos; 
  };

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

      if (!isDown && !isHovered && singleSetWidth > 0) {
        if (direction === 'left') {
          positionRef.current += speed;
        } else {
          positionRef.current -= speed;
        }

        if (positionRef.current >= singleSetWidth * 2) {
          positionRef.current = singleSetWidth;
        } else if (positionRef.current <= 0) {
          positionRef.current = singleSetWidth;
        }

        scrollContainer.scrollLeft = positionRef.current;
      } 
      else if (isDown || isHovered) {
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
      <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-paper to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-paper to-transparent z-20 pointer-events-none"></div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
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
    onMouseDown={(e) => e.preventDefault()} 
    onClick={onClick}
  >
    <div className="bg-white p-2 md:p-3 shadow-lg rotate-1 hover:rotate-0 transition-transform duration-500 rounded-sm">
      <div className="overflow-hidden bg-gray-100 relative min-w-[150px] min-h-[250px]">
        <img 
          src={img.src} 
          alt="Gallery Memory"
          className="h-[250px] md:h-[350px] w-auto object-cover block pointer-events-none" 
          loading="eager"
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