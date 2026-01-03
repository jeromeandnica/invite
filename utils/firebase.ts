
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

/**
 * ! ACTION REQUIRED: FIRESTORE SECURITY RULES !
 * ---------------------------------------------
 * You MUST apply these rules in your Firebase Console to fix the "permissions" error.
 * Location: Firebase Console > Firestore Database > Rules
 * 
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /guest_groups/{groupId} {
 *       allow read: if true;
 *       allow write: if true;
 *     }
 *   }
 * }
 */

const firebaseConfig = {
  apiKey: "AIzaSyAZfUFKqbhm2k-mWMN8ZCeKfPTLBCPMBiA",
  authDomain: "jerome-nica-wedding.firebaseapp.com",
  projectId: "jerome-nica-wedding",
  storageBucket: "jerome-nica-wedding.firebasestorage.app",
  messagingSenderId: "81905791720",
  appId: "1:81905791720:web:7164264448be93accb0f5d",
  measurementId: "G-6BPHTM70E8"
};

const app = initializeApp(firebaseConfig);

// Fix for [code=unavailable] error: Use initializeFirestore with experimentalForceLongPolling 
// to ensure connection stability in environments where WebSockets might be restricted.
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export interface GuestMember {
  name: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface GuestGroup {
  id: string;
  groupName: string;
  searchTags?: string[];
  members: GuestMember[];
}
