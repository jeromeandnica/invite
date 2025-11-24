
import React from 'react';
import { Gift } from 'lucide-react';

const Gifts: React.FC = () => {
  return (
    <section className="py-16 bg-paper">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <div className="bg-sage-dark/5 p-10 rounded-xl border border-sage-dark/10">
          <Gift className="w-10 h-10 mx-auto text-sage-dark mb-4" />
          <h2 className="font-heading text-2xl text-sage-dark mb-6 uppercase tracking-widest">Preferred Gifts</h2>
          <p className="font-body text-gray-700 leading-loose">
            As we begin our new life together, your love, prayers, and presence are what we treasure most.
            <br /><br />
            If you wish to bless us further, we'd be grateful for a monetary gift to help us start this new chapter.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gifts;
