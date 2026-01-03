
import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, User, ChevronRight } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db, GuestGroup } from '../utils/firebase.ts';
import { motion, AnimatePresence } from 'framer-motion';

interface RsvpSearchProps {
  onSelect: (group: GuestGroup) => void;
}

interface SearchResult {
  group: GuestGroup;
  matchReason?: string;
}

const RsvpSearch: React.FC<RsvpSearchProps> = ({ onSelect }) => {
  const [allGroups, setAllGroups] = useState<GuestGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 1. Fetch all groups on mount for fast client-side filtering
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'guest_groups'));
        const groups: GuestGroup[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as GuestGroup));
        setAllGroups(groups);
      } catch (error) {
        console.error("Error loading guest list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // 2. Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Filter logic
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const lowerTerm = searchTerm.toLowerCase().trim();
    const queryTokens = lowerTerm.split(/\s+/).filter(t => t.length > 0);

    // Helper: Check if text contains words starting with ALL query tokens
    const matchesSearch = (text: string) => {
        const textWords = text.toLowerCase().split(/[\s-]+/);
        
        // Every query token must match at least one word in the text (Starts With)
        return queryTokens.every(qToken => 
            textWords.some(word => word.startsWith(qToken))
        );
    };
    
    // Prioritize and filter results
    const results: SearchResult[] = allGroups
      .map((group): SearchResult | null => {
        // Direct match on Group Name
        if (matchesSearch(group.groupName)) {
          return { group };
        }

        // Partial match on specific Members
        const matchedMember = group.members.find(m => matchesSearch(m.name));
        if (matchedMember) {
           return { 
             group, 
             matchReason: `Found ${matchedMember.name} in this party` 
           };
        }

        // Fallback to searchTags if defined
        if (group.searchTags?.some(tag => matchesSearch(tag))) {
          return { group };
        }

        return null;
      })
      .filter((item): item is SearchResult => item !== null)
      .slice(0, 5); // Limit to top 5 matches to keep UI clean

    setSuggestions(results);
    setIsOpen(true);
  }, [searchTerm, allGroups]);

  const handleSelect = (result: SearchResult) => {
    setSearchTerm(result.group.groupName);
    setIsOpen(false);
    onSelect(result.group);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md mx-auto z-50">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
             if (searchTerm.trim().length > 0) setIsOpen(true);
          }}
          disabled={isLoading}
          placeholder={isLoading ? "Loading guest list..." : "Start typing your name..."}
          className="w-full text-center text-xl md:text-2xl font-heading tracking-wide py-4 border-b-2 border-sage-light bg-transparent focus:outline-none focus:border-sage-dark transition-colors placeholder:text-gray-300 text-sage-dark disabled:opacity-50"
          autoComplete="off"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sage-dark/50">
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && searchTerm.trim().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-4 bg-white rounded-xl shadow-2xl border border-sage-light/20 overflow-hidden max-h-60 overflow-y-auto"
          >
            {suggestions.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {suggestions.map((item) => (
                  <li key={item.group.id}>
                    <button
                      onClick={() => handleSelect(item)}
                      className="w-full text-left px-6 py-4 hover:bg-paper transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <p className="font-heading text-lg text-sage-dark font-bold group-hover:text-sage-light transition-colors">
                          {item.group.groupName}
                        </p>
                        {item.matchReason && (
                          <p className="font-body text-xs text-gray-500 mt-1 flex items-center gap-1 italic">
                            <User size={10} />
                            {item.matchReason}
                          </p>
                        )}
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-sage-light" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
                !isLoading && (
                    <div className="p-6 text-center text-gray-400">
                        <p className="font-body text-sm">No invitation found matching "{searchTerm}"</p>
                    </div>
                )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RsvpSearch;
