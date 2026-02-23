
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Loader2, Send, RefreshCcw } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db, GuestGroup, GuestMember } from '../utils/firebase';
import EnchantedReveal from './EnchantedReveal';
import RsvpSearch from './RsvpSearch';

const MotionDiv = motion.div as any;

interface RsvpProps {
  initialGuest: GuestGroup | null;
}

const Rsvp: React.FC<RsvpProps> = ({ initialGuest }) => {
  const [step, setStep] = useState<'login' | 'selection' | 'success'>('login');
  const [loading, setLoading] = useState(false);
  const [groupData, setGroupData] = useState<GuestGroup | null>(null);
  const [updatedMembers, setUpdatedMembers] = useState<GuestMember[]>([]);

  // Automatically skip to selection if guest is provided from intro
  useEffect(() => {
    if (initialGuest) {
      setGroupData(initialGuest);
      setUpdatedMembers(initialGuest.members);
      setStep('selection');
    }
  }, [initialGuest]);

  const handleGroupSelect = (group: GuestGroup) => {
    setGroupData(group);
    setUpdatedMembers(group.members);
    setStep('selection');
  };

  const updateMemberStatus = (index: number, status: 'accepted' | 'declined') => {
    const newMembers = [...updatedMembers];
    newMembers[index].status = status;
    setUpdatedMembers(newMembers);
  };

  const handleSubmitRsvp = async () => {
    if (!groupData) return;
    
    setLoading(true);
    try {
      const groupRef = doc(db, 'guest_groups', groupData.id);
      await updateDoc(groupRef, {
        members: updatedMembers
      });
      setStep('success');
    } catch (err: any) {
      console.error("Error updating RSVP:", err);
      alert("Failed to save RSVP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep('login');
    setGroupData(null);
    setUpdatedMembers([]);
  };

  return (
    <section id="rsvp" className="py-24 relative min-h-[800px] bg-beige-sand flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-3xl">
        <div className="text-center mb-12 text-white drop-shadow-md flex flex-col items-center">
          <EnchantedReveal>
            <h2 className="font-script text-7xl mb-4">R.S.V.P.</h2>
          </EnchantedReveal>
          
          <EnchantedReveal delay={0.2}>
            <p className="font-heading text-xl tracking-widest uppercase opacity-90">
              Please respond by <span className="font-bold border-b border-white/60 pb-1 block md:inline mt-2 md:mt-0">March 10, 2026</span>
            </p>
          </EnchantedReveal>
        </div>

        <MotionDiv 
          layout
          className="bg-paper/95 backdrop-blur-sm rounded-xl shadow-2xl border border-white/50 p-8 md:p-12 overflow-visible relative"
        >
          <AnimatePresence mode='wait'>
            {step === 'login' && (
              <MotionDiv
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <h3 className="font-heading text-2xl text-sage-dark mb-2">Find Your Invitation</h3>
                <p className="font-body text-gray-600 mb-8">
                  Please enter your name below to locate your party.
                </p>

                <div className="mb-8">
                   <RsvpSearch onSelect={handleGroupSelect} />
                </div>
              </MotionDiv>
            )}

            {step === 'selection' && groupData && (
              <MotionDiv
                key="selection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8 border-b border-sage-light/20 pb-6 relative">
                  <p className="font-body text-gray-500 italic mb-2">Responding for</p>
                  <h3 className="font-script text-5xl text-sage-dark">
                    {groupData.groupName}
                  </h3>
                  
                  {/* "Not you?" button to reset if they searched for someone else or wrong guest found */}
                  <button 
                    onClick={handleReset}
                    className="mt-4 flex items-center gap-1 text-[10px] uppercase tracking-widest text-gray-400 hover:text-sage-dark transition-colors mx-auto"
                  >
                    <RefreshCcw size={10} />
                    Not you? Change Party
                  </button>
                </div>

                <div className="space-y-8 mb-10">
                  {updatedMembers.map((member, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-sage-light/10">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <span className="font-heading text-xl text-brown-earth">{member.name}</span>
                        <div className="flex gap-3">
                          <button
                            onClick={() => updateMemberStatus(index, 'accepted')}
                            className={`flex-1 md:flex-none px-4 py-2 rounded-full flex items-center justify-center gap-2 transition-all border ${
                              member.status === 'accepted' 
                                ? 'bg-sage-dark text-white border-sage-dark shadow-md' 
                                : 'bg-gray-50 text-gray-400 border-gray-200 hover:border-sage-light'
                            }`}
                          >
                            <Check size={16} />
                            <span className="text-sm font-bold uppercase tracking-wide">Attending</span>
                          </button>
                          <button
                            onClick={() => updateMemberStatus(index, 'declined')}
                            className={`flex-1 md:flex-none px-4 py-2 rounded-full flex items-center justify-center gap-2 transition-all border ${
                              member.status === 'declined' 
                                ? 'bg-gray-600 text-white border-gray-600 shadow-md' 
                                : 'bg-gray-50 text-gray-400 border-gray-200 hover:border-red-200'
                            }`}
                          >
                            <X size={16} />
                            <span className="text-sm font-bold uppercase tracking-wide">Not Attending</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={handleReset}
                    className="w-1/3 bg-transparent text-sage-dark font-heading uppercase text-sm tracking-widest py-4 rounded border border-sage-dark/20 hover:bg-sage-dark/5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmitRsvp}
                    disabled={loading}
                    className="w-2/3 bg-sage-dark text-white font-heading uppercase tracking-widest py-4 rounded shadow-lg hover:bg-sage-dark/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                    <span>Confirm RSVP</span>
                  </button>
                </div>
              </MotionDiv>
            )}

            {step === 'success' && (
              <MotionDiv
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-sage-light/20 rounded-full flex items-center justify-center mx-auto mb-6 text-sage-dark">
                  <Check size={40} />
                </div>
                <h3 className="font-script text-6xl text-sage-dark mb-4">Thank You!</h3>
                <p className="font-body text-gray-600 mb-8 text-lg">
                  Your response has been successfully recorded. We can't wait to celebrate with you!
                </p>
                <button
                  onClick={handleReset}
                  className="text-sage-dark underline font-heading text-sm uppercase tracking-widest hover:text-sage-light"
                >
                  Close
                </button>
              </MotionDiv>
            )}
          </AnimatePresence>
        </MotionDiv>
      </div>
    </section>
  );
};

export default Rsvp;
