
import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle, Phone, Facebook } from 'lucide-react';
import EnchantedReveal from './EnchantedReveal.tsx';
import { Link, useNavigate } from 'react-router-dom';

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

interface FaqSection {
  category: string;
  items: FaqItem[];
}

const FAQ_SECTIONS: FaqSection[] = [
  {
    category: "Venue, Time, Transportation, Parking",
    items: [
      {
        question: "Where is the venue?",
        answer: (
          <span>
            We’d love to celebrate our special day with you at Mahogany Place Tagaytay. You can <a href="https://ul.waze.com/ul?venue_id=79233165.792528258.945667&overview=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location" target="_blank" rel="noreferrer" className="text-sage-dark underline font-bold hover:text-sage-light">click here</a> to open it in Waze and <a href="https://www.google.com/maps/search/?api=1&query=Mahogany+Place+Tagaytay" target="_blank" rel="noreferrer" className="text-sage-dark underline font-bold hover:text-sage-light">here</a> to view it on Google Maps.
          </span>
        )
      },
      {
        question: "What time should I arrive?",
        answer: "The ceremony will strictly start at 3:30 PM. The entourage will march by 3:15 PM. Please be at the venue at least 10-15 minutes before 3:00 PM."
      },
      {
        question: "Where do I park?",
        answer: "We’ve made sure parking will be easy for you! There will be allotted spaces at the venue, and a parking attendant will be there to assist you when you arrive."
      },
      {
        question: "When can we leave?",
        answer: "Our program is estimated to wrap up around 9:00 PM, and we’d really love for you to stay and celebrate with us until the end—it’ll be worth it, we promise! We kindly ask that you don’t “eat and run” so we can all enjoy the evening together. But if you do need to leave early, we’d appreciate the chance to personally thank you and say goodbye before you go."
      }
    ]
  },
  {
    category: "RSVP",
    items: [
      {
        question: "Is RSVP essential?",
        answer: (
          <span>
            Yes, please RSVP on or before <strong>February 20, 2026</strong>, to ensure you are included in our final guest list. If you have already RSVPed to attend, but find that you will not make it, please notify us.
          </span>
        )
      },
      {
        question: "What if I don't RSVP in time?",
        answer: "Unfortunately, we will not be able to accommodate you if you RSVP late. We will need to provide our vendors and the venue with the exact guest count by a certain date. While we will send out reminders, as well as send out invitations early, please be sure to RSVP as soon as possible."
      },
      {
        question: "What if I did not RSVP but will attend the wedding?",
        answer: (
          <span><b>NO RSVP = NO SEAT</b>. 
            We will assign your seats, so we strongly suggest you do the RSVP on or before <strong>February 20, 2026</strong>, or you may contact and inform us ahead of time. In any case that you may have said yes in our RSVP but suddenly won't be able to attend, please let us know ASAP so we can accommodate any changes.
          </span>
        )
      },
      {
        question: "What do I do if I can't make it?",
        answer: "You will be missed! If you can not make it to the wedding, please let us know as soon as possible and RSVP \"not attending\" so we can plan accordingly. Thank you!"
      },
      {
        question: "What date should I RSVP?",
        answer: (
          <span>
            We’ll appreciate it if you RSVP on or before <strong>February 20, 2026</strong>. Kindly <Link to="/" onClick={() => setTimeout(() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' }), 300)} className="text-sage-dark underline font-bold hover:text-sage-light">click here</Link> to go directly to the forms.
          </span>
        )
      }
    ]
  },
  {
    category: "Kids, Plus One, Substitute guest/s, Pets",
    items: [
      {
        question: "If you reserved us two seats or more and only one can make it, can I bring someone else along with me?",
        answer: "No, unless we have personally confirmed this. We wanted to be surrounded by our families, friends, and super familiar faces, meaning we can only take in those who are invited."
      },
      {
        question: "Can I bring a plus-one with me?",
        answer: "As much as we’d love to include everyone, we are only able to accommodate the guests whose names appear on the invitation."
      },
      {
        question: "Can I bring my kids with me?",
        answer: "Children are really adorable, but our event is an adult-only event. Only children who are part of the entourage are included in both the ceremony and reception."
      },
      {
        question: "Can I bring my furbaby with me?",
        answer: (
          <span>
            We know furbabies are super cute, adorable, and hard to leave at home, but we kindly ask that you <strong>DON’T</strong> bring them with you. Having other pets around might distract our own furbabies, who we’re hoping can walk down the aisle calmly as part of the entourage.
          </span>
        )
      }
    ]
  },
  {
    category: "Others",
    items: [
      {
        question: "Do you have a gift preference?",
        answer: "As love is what this day is all about, your presence is one we couldn't celebrate without. However, should you insist that a gift is worth giving, a small saving for our future is a delightful blessing."
      },
      {
        question: "What is the dress code?",
        answer: (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
               <div>
                  <p className="font-heading text-sage-dark font-bold text-sm uppercase tracking-wider mb-1">Ninong</p>
                  <p>Beige Suit and Pants, White Long Sleeves Polo and Sage Green Necktie</p>
               </div>
               <div>
                  <p className="font-heading text-sage-dark font-bold text-sm uppercase tracking-wider mb-1">Ninang</p>
                  <p>Formal Flowy Beige Gowns</p>
               </div>
            </div>
            
            <div>
               <p className="font-heading text-sage-dark font-bold text-sm uppercase tracking-wider mb-2">Guests</p>
               <ul className="space-y-2">
                 <li><span className="font-bold text-brown-earth">LADIES:</span> semi-formal flowy maxi dress</li>
                 <li><span className="font-bold text-brown-earth">GENTLEMEN:</span> long/short sleeve button-up and trousers</li>
               </ul>
            </div>

            <div className="bg-paper p-4 rounded-lg border border-sage-light/20">
               <p className="font-heading text-xs uppercase tracking-widest text-sage-dark mb-2 font-bold">Attire Note</p>
               <p className="text-sm italic text-gray-600">We kindly ask everyone to stick to the colors in our guide and avoid wearing polo shirt, jeans, shorts, or flip-flops so we can keep the dress code respectful and festive.</p>
            </div>
          </div>
        )
      },
      {
        question: "Can I take pictures during the ceremony?",
        answer: (
          <span>
            Of course! We’d love to see the wedding through your eyes, so feel free to snap away. We just kindly ask that you don’t block our official photographers so they can capture the moments smoothly.
            <br /><br />
            You can <a href="#" className="text-sage-dark underline font-bold hover:text-sage-light">click here</a> to upload your photos so we’ll be able to see your lovely shots. We’d also be so happy if you share them on social media using our hashtag <span className="font-bold">#WhenDestiNICAmeForJEROME</span>—don’t forget to tag us, we’ll definitely be checking it out!
          </span>
        )
      },
      {
        question: "Can we sit anywhere at the reception?",
        answer: "We have assigned seats for each of you. It took us a lot of effort and discussion to finalize the seating arrangement, which is meant for everyone's convenience and group familiarity, so no need to worry. Our coordinators will gladly assist you in finding your designated seats."
      }
    ]
  }
];

const Faq: React.FC = () => {
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <section className="pt-32 pb-24 min-h-screen bg-paper">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16 flex flex-col items-center">
           <EnchantedReveal>
             <div className="flex flex-col items-center">
                <HelpCircle className="w-12 h-12 text-beige-sand mx-auto mb-4" />
                <h1 className="font-heading text-4xl md:text-5xl text-sage-dark mb-4 tracking-wider uppercase border-b-2 border-sage-light/30 pb-4">Wedding FAQs</h1>
             </div>
           </EnchantedReveal>
        </div>

        <div className="space-y-12">
          {FAQ_SECTIONS.map((section, secIndex) => (
            <EnchantedReveal key={secIndex} width="100%" delay={secIndex * 0.1}>
              <div className="bg-white rounded-2xl shadow-sm border border-sage-light/20 overflow-hidden">
                <div className="bg-sage-dark/5 px-6 py-4 border-b border-sage-light/10">
                  <h3 className="font-heading text-xl md:text-2xl text-sage-dark font-bold">
                    {section.category}
                  </h3>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {section.items.map((item, index) => {
                    const key = `${secIndex}-${index}`;
                    const isOpen = openKey === key;
                    
                    return (
                      <div 
                        key={key} 
                        className={`transition-colors duration-300 ${isOpen ? 'bg-sage-light/5' : 'hover:bg-gray-50'}`}
                      >
                        <button
                          onClick={() => toggleFaq(key)}
                          className="w-full flex items-start md:items-center justify-between p-6 text-left focus:outline-none gap-4"
                        >
                          <span className={`font-heading text-base md:text-lg text-sage-dark leading-snug ${isOpen ? 'font-bold' : 'font-medium'}`}>
                            {index + 1}. {item.question}
                          </span>
                          <div className={`flex-shrink-0 text-beige-sand transition-transform duration-300 mt-1 md:mt-0 ${isOpen ? 'rotate-180' : ''}`}>
                            <ChevronDown size={20} />
                          </div>
                        </button>
                        
                        <div 
                          className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="px-6 pb-6 pt-0 font-body text-gray-600 leading-relaxed md:pl-10 text-sm md:text-base">
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </EnchantedReveal>
          ))}
        </div>

        {/* Contact Section optimized for smaller, neater rectangular proportions */}
        <div className="mt-16 text-center pb-16 flex flex-col items-center">
          <EnchantedReveal delay={0.2}>
            <p className="font-body text-[#8e98a5] italic mb-8 text-xl">Still have questions? We'd love to help!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full px-4">
              
              {/* Call or Text Card - Small & Neat */}
              <div className="bg-white border border-gray-100 rounded-[2rem] px-8 py-10 shadow-sm flex flex-col items-center justify-center min-h-[240px]">
                <div className="bg-[#f4f6f2] p-4 rounded-full text-[#56644b] mb-4">
                  <Phone size={28} strokeWidth={1.5} />
                </div>
                <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-[#8e98a5] font-bold mb-2">Call or Text</p>
                <p className="font-heading text-3xl text-[#56644b] font-bold">0936-041-5271</p>
              </div>

              {/* Connect on Facebook Card - Small & Neat */}
              <div className="bg-white border border-gray-100 rounded-[2rem] px-8 py-10 shadow-sm flex flex-col items-center justify-center min-h-[240px]">
                <div className="bg-[#f4f6f2] p-4 rounded-full text-[#56644b] mb-4">
                  <Facebook size={28} strokeWidth={1.5} />
                </div>
                <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-[#8e98a5] font-bold mb-5">Connect on Facebook</p>
                
                <div className="flex gap-3 w-full">
                   <a 
                     href="https://www.facebook.com/jerome.sumilang.9"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex-1 bg-[#56644b] text-white px-3 py-4 rounded-2xl font-heading text-[10px] uppercase tracking-[0.1em] font-bold hover:brightness-110 transition-all shadow-md flex items-center justify-center text-center leading-tight min-h-[54px]"
                   >
                     Message<br/>Jerome
                   </a>
                   <a 
                     href="https://www.facebook.com/nicaespineli"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex-1 bg-[#c1aa87] text-white px-3 py-4 rounded-2xl font-heading text-[10px] uppercase tracking-[0.1em] font-bold hover:brightness-110 transition-all shadow-md flex items-center justify-center text-center leading-tight min-h-[54px]"
                   >
                     Message<br/>Nica
                   </a>
                </div>
              </div>

            </div>
          </EnchantedReveal>
        </div>
      </div>
    </section>
  );
};

export default Faq;
