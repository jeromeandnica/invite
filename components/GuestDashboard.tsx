import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { Users, CheckCircle, XCircle, Clock, RefreshCw, Search, Download, Lock, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

// --- CONFIGURATION ---
const DASHBOARD_PASSWORD = "lupetniGabs2026";

// Types matched to your Rsvp.tsx
interface Member {
  name: string;
  status: 'accepted' | 'declined' | 'pending';
}

interface GuestGroup {
  id: string;
  groupName: string;
  members: Member[];
}

// Flattened Guest for the Table View
interface FlatGuest extends Member {
  groupName: string;
  groupId: string;
}

const GuestDashboard: React.FC = () => {
  // --- AUTH STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  // --- DATA STATE ---
  const [guests, setGuests] = useState<FlatGuest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'accepted' | 'pending' | 'declined'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Stats State
  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    declined: 0,
    pending: 0
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'guest_groups'), orderBy('groupName'));
      const querySnapshot = await getDocs(q);
      
      const flatList: FlatGuest[] = [];
      let statCounts = { total: 0, accepted: 0, declined: 0, pending: 0 };

      querySnapshot.forEach((doc) => {
        const data = doc.data() as GuestGroup;
        
        data.members.forEach((member) => {
          flatList.push({
            ...member,
            groupName: data.groupName,
            groupId: doc.id,
            status: member.status || 'pending' 
          });

          statCounts.total++;
          if (member.status === 'accepted') statCounts.accepted++;
          else if (member.status === 'declined') statCounts.declined++;
          else statCounts.pending++;
        });
      });

      setGuests(flatList);
      setStats(statCounts);
    } catch (error) {
      console.error("Error fetching guests:", error);
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLE LOGIN ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === DASHBOARD_PASSWORD) {
      setIsAuthenticated(true);
      fetchData(); // Only fetch data AFTER success
      toast.success("Welcome, Admin!");
    } else {
      toast.error("Incorrect Password");
      setPasswordInput('');
    }
  };

  const filteredGuests = guests.filter(g => {
    const matchesFilter = filter === 'all' || g.status === filter;
    const matchesSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          g.groupName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExport = () => {
    const headers = ['Group Name', 'Guest Name', 'Status'];
    const csvContent = [
      headers.join(','),
      ...guests.map(g => 
        `"${g.groupName}","${g.name}","${g.status === 'accepted' ? 'Going' : g.status === 'declined' ? 'Not Going' : 'Pending'}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Guest_List_Summary_${new Date().toLocaleDateString()}.csv`;
    link.click();
  };

  // --- RENDER LOGIN SCREEN IF NOT AUTHENTICATED ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center px-4 pt-20">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full border border-sage-light/20 text-center">
          <div className="w-16 h-16 bg-sage-light/20 rounded-full flex items-center justify-center mx-auto mb-6 text-sage-dark">
            <Lock size={32} />
          </div>
          <h2 className="font-heading text-2xl text-sage-dark mb-2 font-bold">Admin Access</h2>
          <p className="text-gray-500 mb-6 text-sm">Please enter the password to view the guest list.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter Password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-light transition-all text-center tracking-widest"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoFocus
            />
            <button 
              type="submit"
              className="w-full bg-sage-dark text-white py-3 rounded-lg font-heading uppercase tracking-widest text-sm hover:bg-sage-dark/90 transition-colors flex items-center justify-center gap-2"
            >
              Access Dashboard <ChevronRight size={16} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER DASHBOARD IF AUTHENTICATED ---
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 pb-6 pt-28 md:px-12 md:pb-12 md:pt-32 font-sans animate-fade-in">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="font-heading text-3xl text-sage-dark font-bold">Guest List Dashboard</h1>
            <p className="text-gray-500">Live RSVP tracking for Jerome & Nica</p>
          </div>
          <div className="flex gap-2">
            <button onClick={fetchData} className="p-2 bg-white border rounded hover:bg-gray-100 text-gray-600 transition-colors" title="Refresh Data">
                <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
            <button onClick={handleExport} className="flex items-center gap-2 bg-sage-dark text-white px-4 py-2 rounded shadow hover:bg-sage-dark/90 transition-all">
                <Download size={18} /> Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Guests" value={stats.total} icon={<Users />} color="bg-blue-100 text-blue-800" />
          <StatCard label="Confirmed" value={stats.accepted} icon={<CheckCircle />} color="bg-green-100 text-green-800" />
          <StatCard label="Pending" value={stats.pending} icon={<Clock />} color="bg-yellow-100 text-yellow-800" />
          <StatCard label="Declined" value={stats.declined} icon={<XCircle />} color="bg-red-100 text-red-800" />
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {['all', 'accepted', 'pending', 'declined'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded-full text-sm font-bold capitalize whitespace-nowrap transition-colors ${
                  filter === f ? 'bg-sage-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f === 'accepted' ? 'Going' : f === 'declined' ? 'Not Going' : f}
              </button>
            ))}
          </div>
          <div className="relative">
             <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
             <input 
               type="text" 
               placeholder="Search name or group..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="pl-10 pr-4 py-2 border rounded-full w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-sage-light transition-shadow"
             />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold">
                <tr>
                  <th className="p-4 border-b w-1/3">Guest Name</th>
                  <th className="p-4 border-b w-1/4">Status</th>
                  <th className="p-4 border-b w-1/3">Group / Family</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={3} className="p-8 text-center text-gray-500">Loading guest list...</td></tr>
                ) : filteredGuests.length === 0 ? (
                  <tr><td colSpan={3} className="p-8 text-center text-gray-500">No guests found.</td></tr>
                ) : (
                  filteredGuests.map((guest, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-800">{guest.name}</td>
                      <td className="p-4">
                        <StatusBadge status={guest.status} />
                      </td>
                      <td className="p-4 text-gray-500 text-sm">{guest.groupName}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t bg-gray-50 text-xs text-gray-500 text-center">
              Showing {filteredGuests.length} guests
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Helper Components ---

const StatCard = ({ label, value, icon, color }: any) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between transition-transform hover:-translate-y-1">
    <div>
       <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
       <p className="text-3xl font-heading font-bold text-gray-800">{value}</p>
    </div>
    <div className={`p-3 rounded-full ${color}`}>
       {icon}
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    accepted: "bg-green-100 text-green-700 border-green-200",
    declined: "bg-red-100 text-red-700 border-red-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  };
  const labels = {
    accepted: "Going",
    declined: "Not Going",
    pending: "No Response",
  };
  
  // Safe fallback for status key
  const key = status as keyof typeof styles;
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 w-fit ${styles[key] || styles.pending}`}>
       {status === 'accepted' && <CheckCircle size={12} />}
       {status === 'declined' && <XCircle size={12} />}
       {status === 'pending' && <Clock size={12} />}
       {labels[key] || "Pending"}
    </span>
  );
};

export default GuestDashboard;