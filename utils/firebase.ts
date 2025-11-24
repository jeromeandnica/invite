
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZfUFKqbhm2k-mWMN8ZCeKfPTLBCPMBiA",
  authDomain: "jerome-nica-wedding.firebaseapp.com",
  projectId: "jerome-nica-wedding",
  storageBucket: "jerome-nica-wedding.firebasestorage.app",
  messagingSenderId: "81905791720",
  appId: "1:81905791720:web:7164264448be93accb0f5d",
  measurementId: "G-6BPHTM70E8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Types for our Data Model
export interface GuestMember {
  name: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface GuestGroup {
  id: string; // Document ID
  groupName: string;
  // searchTags contains lowercase full names for lookup
  searchTags?: string[];
  passcode?: string; // Keeping optional for backward compatibility if needed
  members: GuestMember[];
}
