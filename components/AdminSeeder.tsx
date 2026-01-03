
import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebase.ts';
import { doc, collection, getDocs, query, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { Loader2, Database, CheckCircle, AlertCircle, RefreshCw, Users, Activity, Trash2 } from 'lucide-react';

const RAW_GUEST_GROUPS = [
  // --- JEROME'S SIDE ---
  ["Jairo Sumilang", "Lorna Sumilang"],
  ["Raciel Parungao", "Jonathan Parungao", "Jairus Joseph Parungao", "Reizh Nathalie Parungao"],
  ["Jessa Mae Angeles", "Hajji Angeles", "Jaina Ysabel Angeles", "Jiana Ysabella Angeles"],
  ["Nelma Policarpio", "Rey Policarpio", "Arabelle Bongon", "Bien Bongon", "Aira Venice Bongon", "Naomi Viel Bongon"],
  ["Remigio Rodelas", "Maria Ruth Rodelas", "Mants"],
  ["Mary Lee San Juan", "Deck San Juan", "Nora Bolante", "Joaquin San Juan"],
  ["Sally Raymundo", "Edivigio Raymundo", "Nydgel Abalin", "Emerson Abalin"],
  ["Analiza Sumilang", "Noblito Sumilang", "Benette Sumilang", "Susan Teodoro", "Marcelo Teodoro"],
  ["Christia Rodelas", "Yohan Moico", "Selah Moico", "Gilbert Moico", "Frencie Rodelas"],
  ["Edryll Mapa"],
  ["Nerly Perez", "John Aldwin Perez"],

  // --- NICA'S SIDE --- 
  ["Jose Victor Espineli", "Jazmine Espineli", "Rasam Espineli", "Ian Rafael Espineli", "Jose Gabriel Espineli"], 
  ["Jose Espineli", "Esperanza Espineli", "Jose Jonathan Espineli"], 
  ["Jose Leonilo Espineli", "Maria Teresa Espineli", "Isabel Espineli", "Karina Espineli", "Maria Espineli", "Justin Delos Reyes"], 
  ["Mike Crisolo", "Maria Teresa Isolda Crisolo", "Chynna Mikaela Crisolo", "Chloe Mikaela Crisolo", "Chad Michael Crisolo"], 
  ["Claire Palermo", "Bryan Palermo", "Engel Palermo", "Bren Palermo", "Yosef Palermo"], 
  ["Janet Laroza", "Nita Laroza", "Loring"], 
  ["Lina Saberola", "Bem Inoferio"], 
  ["Hazel Thomas", "Trishia Anne Thomas", "Xean Cline Thomas", "Charriedel Thomas"], 
  ["Gerardo Garalde", "Maria Victoria Garalde", "Gerard Joseph Garalde"], 
  ["Grace Ballera", "Crisostomo Ballera Jr."], 
  ["Don Allan Garalde", "Michelle Grado"], 
  ["John Joseph Garalde", "Irvinalyn Garalde"], 
  ["Carlos Garalde", "Roselyn Garalde"], 
  ["Glenn Garalde", "Christle Garalde"],

  // --- PAMILY --- 
  ["Lorraine Cortez", "Louie Mejia", "Janelle Sala", "Jojy Juayong", "John Glen Sabado"], 
  ["Kyle Mejia", "Carl Mejia", "Ann Dela Cruz"], 
  ["Faizelle Ann De Leon", "Alonzo Isaiah De Leon", "Flor Soriano"], 
  ["Noimilyn Fernandez", "Emman Amante"], 
  ["Shena Ann Mejia", "John Paul Gatlabayan", "Ruby Mejia"], 
  ["Bernadette Rocha"], 
  ["Marcio Manalo"],

  // --- PRINCIPAL SPONSORS --- 
  ["Nathan Mejia", "Anna Mejia"], 
  ["Rieje Trazo", "Estela Trazo"], 
  ["Ezekiel Orbeta", "Hazel Orbeta"], 
  ["Jas Mendoza"], 
  ["Gabriel Luke Quimson", "Azelle Kayze Free Quimson"], 
  ["Nikko Cunanan", "Bernice Cunanan"], 
  ["Ruel Aves", "Celia Noel"], 
  ["Priscilla Galang"], 
  ["Peter Hauje", "Nelia Hauje", "Kristine Hauje"],

  // --- CHURCH FAM --- 
  ["Patty Pineda", "Jojo Pineda", "Alithia Pineda", "James Cardenas"],
  ["Joel Dublin", "Elaine Dublin"],
  ["Sonia Raymundo", "Alvin Raymundo", "Kyle Raymundo", "Joshua Raymundo", "Sedric Raymundo", "Jan Maydee Andres"],
  ["Bong Diaz", "Jona Diaz"],
  ["Beck Gador", "Hannah Gallura", "Echo Gallura", "Blase Lominoque"],
  ["Julius Bastian", "Chat Bastian", "Joshua Bastian", "John Mickel Bastian"], 
  ["Margret Nichelle Villavicencio", "Alex Villavicencio"],
  ["Joan Christine Sunga", "Ian Sunga"],
  ["Roxanne Gloria Maino", "Wallen Maino"], 
  ["Matthew Baldoza", "Alma Baldoza"],
  ["Crizaldy Osal", "Amie Osal"],
  ["Ruth Opider", "Jorge Opider"],
  ["Vegena Bowering"],
  ["John Baldoza"]
];

const AdminSeeder: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [guestCount, setGuestCount] = useState<number | null>(null);
  const [errorType, setErrorType] = useState<'permission' | 'other' | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [progress, setProgress] = useState<number>(0);

  const fetchStatus = async () => {
    setChecking(true);
    setErrorType(null);
    try {
      const q = query(collection(db, 'guest_groups'));
      const snapshot = await getDocs(q);
      setGuestCount(snapshot.size);
    } catch (err: any) {
      console.error("Database health check failed:", err);
      setGuestCount(null);
      if (err.code === 'permission-denied') {
        setErrorType('permission');
      } else {
        setErrorType('other');
      }
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const generateSearchTags = (names: string[]) => {
    const tags = new Set<string>();
    
    names.forEach(name => {
      const lower = name.toLowerCase().trim();
      if (!lower) return;

      // 1. Basic: Add the full name (e.g., "jose victor espineli")
      tags.add(lower);

      // Split name into parts (remove spaces/dashes)
      const parts = lower.split(/[\s-]+/).filter(p => p.length > 1);
      
      // 2. Basic: Add individual words (e.g., "jose", "victor", "espineli")
      parts.forEach(part => tags.add(part));

      // 3. ADVANCED: Add Smart Combinations
      if (parts.length >= 2) {
        // First + Last (Crucial for "Jose Espineli")
        tags.add(`${parts[0]} ${parts[parts.length - 1]}`);
        
        // First + Second (e.g., "Jose Victor")
        tags.add(`${parts[0]} ${parts[1]}`);
        
        // Last Name only (Explicitly ensure it's there)
        tags.add(parts[parts.length - 1]);
      }

      if (parts.length > 2) {
        // Middle + Last (e.g., "Victor Espineli")
        tags.add(`${parts[parts.length - 2]} ${parts[parts.length - 1]}`);
      }
    });

    return Array.from(tags);
  };

  const runDiagnostic = async () => {
    setTestStatus('running');
    setStatus({ type: null, message: '' });
    
    try {
      const testRef = doc(db, '_diagnostics', 'connectivity_test');
      await setDoc(testRef, {
        timestamp: new Date().toISOString(),
        status: 'OK'
      });
      
      const snap = await getDoc(testRef);
      if (snap.exists()) {
        setTestStatus('success');
        setStatus({ type: 'success', message: 'Connection Verified! Writing and reading works.' });
        fetchStatus();
      } else {
        throw new Error("Wrote document but could not read it back.");
      }
    } catch (err: any) {
      setTestStatus('failed');
      setStatus({ type: 'error', message: `Test Failed: ${err.message}` });
    }
  };

  const slugify = (text: string) => {
    if (!text) return Math.random().toString(36).substring(7);
    return text.toString().toLowerCase().trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };

  const handleSeed = async () => {
    // Skipping confirm prompt as requested to proceed immediately
    setLoading(true);
    setProgress(0);
    setStatus({ type: null, message: '' });

    try {
      const groupsRef = collection(db, 'guest_groups');

      for (let i = 0; i < RAW_GUEST_GROUPS.length; i++) {
        try {
          const party = RAW_GUEST_GROUPS[i];
          const primaryName = party[0];
          const docId = `${slugify(primaryName)}-${i}`;
          
          const groupName = party.length > 1 ? `${party[0]} & ${party[1]}` : party[0];
          const searchTags = generateSearchTags(party);
          const members = party.map(name => ({ name, status: 'pending' }));
          
          const docRef = doc(groupsRef, docId);
          await setDoc(docRef, { 
            groupName, 
            searchTags, 
            members,
            updatedAt: new Date().toISOString(),
            orderIndex: i
          });
          
          setProgress(i + 1);
        } catch (innerErr: any) {
          console.error(`Error at index ${i}:`, innerErr);
        }
      }

      setStatus({ type: 'success', message: `Successfully pushed ${RAW_GUEST_GROUPS.length} groups to the database.` });
      fetchStatus();
    } catch (err: any) {
      setStatus({ type: 'error', message: `Data push failed: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  const handleClearDatabase = async () => {
    if (!confirm("DANGER: This will delete ALL synced guest data. Continue?")) return;
    setLoading(true);
    setStatus({ type: null, message: '' });
    
    try {
      const q = query(collection(db, 'guest_groups'));
      const snapshot = await getDocs(q);
      const deletePromises = snapshot.docs.map(d => deleteDoc(d.ref));
      await Promise.all(deletePromises);
      setStatus({ type: 'success', message: 'Database cleared successfully.' });
      fetchStatus();
    } catch (err: any) {
      setStatus({ type: 'error', message: `Clear failed: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 pt-32">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-sage-light/20 max-w-xl w-full text-center">
        
        <div className="mb-8 flex justify-center">
          <div className="bg-paper border border-sage-light/30 px-6 py-4 rounded-2xl inline-flex items-center gap-4 shadow-inner">
            <div className={`p-2 rounded-lg ${errorType === 'permission' ? 'bg-red-500 text-white' : 'bg-sage-dark text-white'}`}>
              <Users size={20} />
            </div>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Cloud Presence</p>
              <div className="flex items-center gap-2">
                {checking ? (
                  <Loader2 size={16} className="animate-spin text-sage-dark" />
                ) : (
                  <span className={`font-heading text-xl ${errorType === 'permission' ? 'text-red-600' : 'text-sage-dark'}`}>
                    {errorType === 'permission' ? 'Access Denied' : guestCount === null ? 'Unknown' : `${guestCount} Parties Live`}
                  </span>
                )}
                <button onClick={fetchStatus} disabled={checking} className="p-1 hover:bg-gray-100 rounded text-gray-400">
                  <RefreshCw size={14} className={checking ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-sage-dark/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-sage-dark">
          <Database size={40} />
        </div>
        
        <h1 className="font-heading text-2xl text-sage-dark mb-4 uppercase tracking-tight">Data Management</h1>
        
        {status.type && (
          <div className={`mb-8 p-4 rounded-lg flex items-center gap-3 text-left ${
            status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span className="font-body text-sm font-medium">{status.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={runDiagnostic}
              disabled={testStatus === 'running' || loading}
              className="w-full bg-white text-sage-dark border border-sage-dark/30 font-heading uppercase tracking-widest py-4 rounded-xl hover:bg-sage-light/10 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
               {testStatus === 'running' ? <Loader2 className="animate-spin" size={16} /> : <Activity size={16} />}
               <span>Test API</span>
            </button>

            <button
              onClick={handleSeed}
              disabled={loading || testStatus === 'running'}
              className="w-full bg-sage-dark text-white font-heading uppercase tracking-widest py-4 rounded-xl shadow-lg hover:bg-sage-dark/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm relative overflow-hidden"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <Database size={16} />}
              <span>{loading ? `${progress}/${RAW_GUEST_GROUPS.length}` : 'Push Guest List'}</span>
              
              {loading && (
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-300"
                  style={{ width: `${(progress / RAW_GUEST_GROUPS.length) * 100}%` }}
                ></div>
              )}
            </button>
          </div>

          <button
            onClick={handleClearDatabase}
            disabled={loading}
            className="w-full bg-white text-red-600 border border-red-100 font-heading uppercase tracking-widest py-3 rounded-xl hover:bg-red-50 transition-all flex items-center justify-center gap-2 text-xs"
          >
            <Trash2 size={14} />
            <span>Clear Live Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSeeder;
