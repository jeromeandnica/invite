
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Check, X, Loader2, Send, Database } from 'lucide-react';
import { db, GuestGroup, GuestMember } from '../utils/firebase';
import { collection, query, where, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { ENTOURAGE_DATA } from '../constants';

const Rsvp: React.FC = () => {
  // State Machine: 'login' -> 'selection' -> 'success'
  const [step, setStep] = useState<'login' | 'selection' | 'success'>('login');
  
  // Login/Search State
  const [searchName, setSearchName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Data State
  const [groupData, setGroupData] = useState<GuestGroup | null>(null);
  const [updatedMembers, setUpdatedMembers] = useState<GuestMember[]>([]);

  // Seed Status State (Text feedback instead of alerts)
  const [seedStatus, setSeedStatus] = useState<string>('');

  // --- ACTION: Handle Name Search ---
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchName.trim()) return;

    setLoading(true);
    setError(null);

    // Normalize input: remove extra spaces, convert to lowercase
    const normalizedSearch = searchName.trim().toLowerCase();

    try {
      const groupsRef = collection(db, 'guest_groups');
      
      // Query: Check if 'searchTags' array contains the normalized name
      const q = query(groupsRef, where('searchTags', 'array-contains', normalizedSearch));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("We couldn't find an invitation under that name. Please try entering the name exactly as it appears on your invite, or try another family member's name.");
        setLoading(false);
        return;
      }

      // Take the first matching group
      const docSnap = querySnapshot.docs[0];
      const data = docSnap.data() as Omit<GuestGroup, 'id'>;
      
      setGroupData({ id: docSnap.id, ...data });
      setUpdatedMembers(data.members); // Initialize local state with current DB state
      setStep('selection');
    } catch (err) {
      console.error("Error fetching guest group:", err);
      setError("Something went wrong connecting to the guest list. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- ACTION: Update Local Member State ---
  const updateMemberStatus = (index: number, status: 'accepted' | 'declined') => {
    const newMembers = [...updatedMembers];
    newMembers[index].status = status;
    setUpdatedMembers(newMembers);
  };

  // --- ACTION: Submit Final RSVP ---
  const handleSubmitRsvp = async () => {
    if (!groupData) return;
    
    setLoading(true);
    try {
      const groupRef = doc(db, 'guest_groups', groupData.id);
      await updateDoc(groupRef, {
        members: updatedMembers
      });
      setStep('success');
    } catch (err) {
      console.error("Error updating RSVP:", err);
      alert("Failed to save RSVP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- TEMPORARY: SEED DATABASE FUNCTION ---
  const handleSeedEntourage = async () => {
    setLoading(true);
    setSeedStatus('Preparing data...');

    try {
      // Robust flattening for Principal Sponsors (array of arrays)
      const flatPrincipalSponsors = ENTOURAGE_DATA.principalSponsors.reduce(
        (acc, val) => acc.concat(val), 
        [] as string[]
      );

      // 1. Flatten all names from Constants
      const allNames: string[] = [
        ...ENTOURAGE_DATA.parents.groom,
        ...ENTOURAGE_DATA.parents.bride,
        ...ENTOURAGE_DATA.grandparents.bride,
        ENTOURAGE_DATA.attendants.bestMan,
        ENTOURAGE_DATA.attendants.maidOfHonor,
        ...ENTOURAGE_DATA.secondarySponsors.flatMap(s => s.names),
        ...flatPrincipalSponsors,
        ...ENTOURAGE_DATA.groomsmen,
        ...ENTOURAGE_DATA.bridesmaids,
        ...ENTOURAGE_DATA.bearers.map(b => b.name),
        ...ENTOURAGE_DATA.flowerGirls,
        ENTOURAGE_DATA.officiant
      ];

      setSeedStatus(`Found ${allNames.length} names. Grouping...`);

      // 2. Group by Last Name (Simple logic: take the last word)
      const groups: Record<string, string[]> = {};
      
      allNames.forEach(fullName => {
        const cleanName = fullName.trim();
        const parts = cleanName.split(' ');
        const lastName = parts[parts.length - 1];

        if (!groups[lastName]) {
          groups[lastName] = [];
        }
        groups[lastName].push(cleanName);
      });

      setSeedStatus(`Uploading ${Object.keys(groups).length} family groups to Firestore...`);

      // 3. Upload to Firestore
      const batchPromises = Object.entries(groups).map(async ([lastName, members]) => {
        const groupPayload = {
          groupName: `The ${lastName} Family`,
          searchTags: members.map(name => name.toLowerCase()), // Important for lookup
          members: members.map(name => ({
            name: name,
            status: 'pending'
          }))
        };
        
        const colRef = collection(db, 'guest_groups');
        await addDoc(colRef, groupPayload);
      });

      await Promise.all(batchPromises);
      setSeedStatus(`Success! Seeded ${Object.keys(groups).length} groups.`);
      setTimeout(() => setSeedStatus(''), 5000); // Clear message after 5s

    } catch (e) {
      console.error(e);
      setSeedStatus(`Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <section id="rsvp" className="py-24 relative min-h-[800px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundColor: '#C1AA87' }} // Fallback
    >
      {/* Rustic Overlay Texture */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-3xl">
        
        {/* Header */}
        <div className="text-center mb-12 text-white drop-shadow-md">
          <h2 className="font-script text-7xl mb-4">R.S.V.P.</h2>
          <p className="font-heading text-xl tracking-widest uppercase opacity-90">
            Please respond by <span className="font-bold border-b border-white/60 pb-1 block md:inline mt-2 md:mt-0">February 1, 2026</span>
          </p>
        </div>

        {/* Main Card - Glassmorphism */}
        <motion.div 
          layout
          className="bg-paper/95 backdrop-blur-sm rounded-xl shadow-2xl border border-white/50 p-8 md:p-12 overflow-hidden relative"
        >
          {/* Rustic Flower Decor */}
          <img 
            src="images/flower.png" 
            alt="" 
            className="absolute -top-10 -right-10 w-40 h-40 opacity-50 rotate-12 pointer-events-none"
          />

          <AnimatePresence mode='wait'>
            
            {/* --- STEP 1: LOGIN / NAME SEARCH --- */}
            {step === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <h3 className="font-heading text-2xl text-sage-dark mb-2">Find Your Invitation</h3>
                <p className="font-body text-gray-600 mb-8">
                  Please enter your Full Name below to locate your party.
                </p>

                <form onSubmit={handleSearch} className="max-w-md mx-auto space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      placeholder="Juan Dela Cruz"
                      className="w-full text-center text-2xl font-heading tracking-wide py-4 border-b-2 border-sage-light bg-transparent focus:outline-none focus:border-sage-dark transition-colors placeholder:text-gray-300 text-sage-dark"
                    />
                  </div>

                  {error && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-sm font-body bg-red-50 p-3 rounded"
                    >
                      {error}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-sage-dark text-white font-heading uppercase tracking-widest py-4 rounded shadow-lg hover:bg-sage-dark/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <Search size={18} />}
                    <span>Find Invitation</span>
                  </button>
                </form>
              </motion.div>
            )}

            {/* --- STEP 2: SELECTION --- */}
            {step === 'selection' && groupData && (
              <motion.div
                key="selection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8 border-b border-sage-light/20 pb-6">
                  <p className="font-body text-gray-500 italic mb-2">Responding for</p>
                  <h3 className="font-script text-5xl text-sage-dark">{groupData.groupName}</h3>
                </div>

                <div className="space-y-8 mb-10">
                  {updatedMembers.map((member, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-sage-light/10">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <span className="font-heading text-xl text-brown-earth">{member.name}</span>
                        
                        {/* Status Toggles */}
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
                            <span className="text-sm font-bold uppercase tracking-wide">Accepts</span>
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
                            <span className="text-sm font-bold uppercase tracking-wide">Declines</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4">
                   <button
                    onClick={() => {
                      setStep('login');
                      setSearchName('');
                      setError(null);
                    }}
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
              </motion.div>
            )}

            {/* --- STEP 3: SUCCESS --- */}
            {step === 'success' && (
              <motion.div
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
                  onClick={() => {
                    setSearchName('');
                    setStep('login');
                  }}
                  className="text-sage-dark underline font-heading text-sm uppercase tracking-widest hover:text-sage-light"
                >
                  Close
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Rsvp;
