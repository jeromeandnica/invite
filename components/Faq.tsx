
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

const FAQ_DATA: FaqItem[] = [
  {
    question: "When is the RSVP deadline?",
    answer: "Please respond by February 1, 2026, so we can finalize our headcount and arrangements."
  },
  {
    question: "What time should I arrive?",
    answer: "The ceremony will start promptly at 3:00 PM. We kindly ask that you arrive at least 30 minutes early to find your seat and settle in."
  },
  {
    question: "Is there a dress code?",
    answer: (
      <span>
        Yes, strictly <strong>Formal / Semi-Formal</strong>. Ladies are requested to wear semi-formal flowy maxi dresses, and gentlemen are requested to wear long/short sleeve button-ups and trousers. Please refer to the <strong className="text-sage-dark">Attire Guide</strong> on the home page for color details.
      </span>
    )
  },
  {
    question: "Can I bring a date or plus one?",
    answer: "Due to venue capacity limits, we have a strict guest list. We can only accommodate those explicitly listed on your invitation."
  },
  {
    question: "Are kids invited?",
    answer: "We adore your children, but for this special day, we have decided to make it an adult-only celebration. We hope you understand and enjoy a night off!"
  },
  {
    question: "Is there parking at the venue?",
    answer: "Yes, Mahogany Place Tagaytay provides ample parking space for guests."
  },
  {
    question: "Do you have a wedding registry?",
    answer: "Your presence is the greatest gift! However, should you wish to honor us with a gift, a monetary contribution towards our new life together would be greatly appreciated."
  }
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pt-32 pb-24 min-h-screen bg-paper">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
           <HelpCircle className="w-12 h-12 text-beige-sand mx-auto mb-4" />
           <h1 className="font-script text-6xl text-sage-dark mb-4">Frequently Asked Questions</h1>
           <p className="font-body text-gray-600">Everything you need to know about our big day.</p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
            <div 
              key={index} 
              className={`border border-sage-light/20 rounded-xl bg-white overflow-hidden transition-shadow duration-300 ${
                openIndex === index ? 'shadow-md ring-1 ring-sage-light/30' : 'hover:shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`font-heading text-lg text-sage-dark ${openIndex === index ? 'font-bold' : 'font-medium'}`}>
                  {item.question}
                </span>
                <div className={`ml-4 text-beige-sand transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ChevronDown size={24} />
                </div>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 font-body text-gray-600 leading-relaxed border-t border-gray-100">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-body text-gray-500 mb-4">Still have questions?</p>
          <a href="mailto:jeromeandnica@gmail.com" className="font-heading text-sage-dark underline hover:text-sage-light">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Faq;
