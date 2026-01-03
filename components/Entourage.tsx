
import React from 'react';
import { ENTOURAGE_DATA } from '../constants';
import EnchantedReveal from './EnchantedReveal';
import flowerImg from '../assets/flower.png'; 
// ==================================================================================
// !!! REPLACE THIS IMAGE: VINE PATTERN SIDE BORDER !!!
// Description: A decorative vine or leaf pattern used for the entourage section side borders.
// Recommended: A transparent PNG or a pattern that looks good when repeated vertically.
// ==================================================================================
const vinePatternImage = flowerImg;

// Consistent styling constants for uniform font sizes
const NAME_CLASS = "font-body text-lg md:text-xl text-cream-soft";
const ROLE_CLASS = "font-heading text-sm md:text-base text-sage-light uppercase tracking-wider mb-1";

// --- UI COMPONENTS ---

// 1. Round, Simple Flower for Dividers
const SimpleFlowerSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Center */}
    <circle cx="50" cy="50" r="8" fill="currentColor" fillOpacity="0.2" />
    {/* Petals */}
    <path d="M50 38 C50 20 30 20 30 40 C30 48 42 50 50 50" />
    <path d="M50 38 C50 20 70 20 70 40 C70 48 58 50 50 50" />
    <path d="M50 62 C50 80 30 80 30 60 C30 52 42 50 50 50" />
    <path d="M50 62 C50 80 70 80 70 60 C70 52 58 50 50 50" />
    <path d="M62 50 C80 50 80 30 60 30 C52 30 50 42 50 50" />
    <path d="M62 50 C80 50 80 70 60 70 C52 70 50 58 50 50" />
    <path d="M38 50 C20 50 20 30 40 30 C48 30 50 42 50 50" />
    <path d="M38 50 C20 50 20 70 40 70 C48 70 50 58 50 50" />
  </svg>
);

// --- COMPOSITES ---

// Divider Component
const DividerFlower = () => (
  <div className="flex items-center justify-center my-10 opacity-40 text-beige-sand">
    <div className="h-px w-12 bg-beige-sand/50 mr-4"></div>
    <SimpleFlowerSVG className="w-8 h-8" />
    <div className="h-px w-12 bg-beige-sand/50 ml-4"></div>
  </div>
);

// Side Border Component using Image Placeholder
const SideBorderColumn: React.FC<{ position: 'left' | 'right' }> = ({ position }) => {
  return (
    <div 
      className={`absolute top-0 bottom-0 w-24 md:w-48 z-0 pointer-events-none opacity-20 overflow-hidden ${
        position === 'left' ? 'left-0' : 'right-0'
      }`}
    >
      <div 
        className={`w-full h-full bg-repeat-y bg-contain ${position === 'right' ? 'scale-x-[-1]' : ''}`}
        style={{ 
          backgroundImage: `url(${vinePatternImage})`,
          backgroundSize: '100% auto'
        }}
      />
      {/* Softening overlay to blend edges */}
      <div className={`absolute inset-0 bg-gradient-to-${position === 'left' ? 'r' : 'l'} from-transparent to-sage-dark/10`}></div>
    </div>
  );
};


const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="font-heading text-xl md:text-2xl text-beige-sand mb-6 uppercase tracking-widest mt-4 pb-2 inline-block relative">
    {title}
  </h3>
);

const NameBlock: React.FC<{ role?: string; names: string | string[] }> = ({ role, names }) => (
  <div className="mb-4">
    {role && <p className={ROLE_CLASS}>{role}</p>}
    {Array.isArray(names) ? (
      names.map((name, i) => <p key={i} className={NAME_CLASS}>{name}</p>)
    ) : (
      <p className={NAME_CLASS}>{names}</p>
    )}
  </div>
);

const Entourage: React.FC = () => {
  return (
    <section id="entourage" className="py-24 bg-sage-dark text-cream-soft relative overflow-hidden">
      
      {/* Floral Side Borders using Images */}
      <SideBorderColumn position="left" />
      <SideBorderColumn position="right" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex justify-center mb-10">
          <EnchantedReveal>
            <h2 className="font-script text-6xl md:text-7xl text-beige-sand">The Entourage</h2>
          </EnchantedReveal>
        </div>

        {/* Groom & Bride - Top Section */}
        <div className="flex flex-col items-center justify-center gap-4 mb-12">
            <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-4">
                <span className="font-heading text-xl md:text-2xl text-beige-sand font-bold uppercase tracking-wider text-right md:w-32">Groom</span>
                <span className="font-body text-2xl md:text-3xl text-cream-soft text-center md:text-left">Jerome R. Sumilang</span>
            </div>
            <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-4">
                 <span className="font-heading text-xl md:text-2xl text-beige-sand font-bold uppercase tracking-wider text-right md:w-32">Bride</span>
                 <span className="font-body text-2xl md:text-3xl text-cream-soft text-center md:text-left">Veronica G. Espineli</span>
            </div>
        </div>

        <DividerFlower />

        {/* Parents */}
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-8">
          <div>
            <SectionHeader title="Groom's Parents" />
            <NameBlock names={ENTOURAGE_DATA.parents.groom} />
          </div>
          <div>
            <SectionHeader title="Bride's Parents" />
            <NameBlock names={ENTOURAGE_DATA.parents.bride} />
          </div>
        </div>

        {/* Bride's Grandparents */}
        <div className="mb-8">
           <SectionHeader title="Bride's Grandparents" />
           <NameBlock names={ENTOURAGE_DATA.grandparents.bride} />
        </div>

        <DividerFlower />

        {/* Main Attendants */}
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-8">
          <div>
            <SectionHeader title="Best Man" />
            <NameBlock names={ENTOURAGE_DATA.attendants.bestMan} />
          </div>
          <div>
            <SectionHeader title="Maid of Honor" />
            <NameBlock names={ENTOURAGE_DATA.attendants.maidOfHonor} />
          </div>
        </div>

        <DividerFlower />

        {/* Secondary Sponsors */}
        <div className="max-w-4xl mx-auto mb-8">
          <SectionHeader title="Secondary Sponsors" />
          <div className="grid md:grid-cols-3 gap-8 mt-4">
            {ENTOURAGE_DATA.secondarySponsors.map((group, idx) => (
              <div key={idx}>
                 <h4 className={ROLE_CLASS}>{group.role}</h4>
                 {group.names.map((n, i) => (
                   <p key={i} className={NAME_CLASS}>{n}</p>
                 ))}
              </div>
            ))}
          </div>
        </div>

        <DividerFlower />

        {/* Principal Sponsors */}
        <div className="max-w-6xl mx-auto mb-8 px-4">
          <SectionHeader title="Principal Sponsors" />
          
          {/* Desktop View: Split Layout */}
          <div className="hidden md:grid grid-cols-2 gap-x-8 gap-y-3 max-w-5xl mx-auto mt-6">
            {ENTOURAGE_DATA.principalSponsors.map((pair, idx) => (
              <React.Fragment key={idx}>
                <div className={`text-right ${NAME_CLASS}`}>{pair[0]}</div>
                <div className={`text-left ${NAME_CLASS}`}>{pair[1]}</div>
              </React.Fragment>
            ))}
          </div>

          {/* Mobile View: Stacked */}
          <div className="md:hidden flex flex-col gap-6 mt-6">
            {ENTOURAGE_DATA.principalSponsors.map((pair, idx) => (
              <div key={idx} className="text-center">
                <div className={NAME_CLASS}>{pair[0]}</div>
                <div className={NAME_CLASS}>{pair[1]}</div>
              </div>
            ))}
          </div>
        </div>

        <DividerFlower />

        {/* Groomsmen & Bridesmaids */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-8">
          <div>
            <SectionHeader title="Groomsmen" />
            <div className="space-y-2">
              {ENTOURAGE_DATA.groomsmen.map((name, i) => (
                <p key={i} className={NAME_CLASS}>{name}</p>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="Bridesmaids" />
            <div className="space-y-2">
              {ENTOURAGE_DATA.bridesmaids.map((name, i) => (
                <p key={i} className={NAME_CLASS}>{name}</p>
              ))}
            </div>
          </div>
        </div>

        <DividerFlower />

        {/* Bearers - Own Row, 3 Columns */}
        <div className="max-w-5xl mx-auto mb-12">
            <SectionHeader title="Bearers" />
            <div className="grid md:grid-cols-3 gap-8 mt-6">
                {ENTOURAGE_DATA.bearers.map((bearer, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <p className={ROLE_CLASS}>{bearer.role}</p>
                        <p className={NAME_CLASS}>{bearer.name}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Flower Girls - Single List */}
        <div className="max-w-4xl mx-auto mb-12">
            <SectionHeader title="Flower Girls" />
            <div className="flex flex-col items-center gap-2 mt-6">
                {ENTOURAGE_DATA.flowerGirls.map((name, i) => (
                   <p key={i} className={NAME_CLASS}>{name}</p>
                ))}
            </div>
        </div>
        
        <div className="max-w-lg mx-auto mt-16 pt-8 border-t border-cream-soft/20">
             <SectionHeader title="Wedding Officiant" />
             <p className="font-body text-2xl text-cream-soft">{ENTOURAGE_DATA.officiant}</p>
        </div>

      </div>
    </section>
  );
};

export default Entourage;
