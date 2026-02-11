// Firebase Configuration and Initialization (Client-side only)
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate Firebase configuration
const isFirebaseConfigValid = () => {
  const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingKeys = requiredKeys.filter(key => !firebaseConfig[key]);

  if (missingKeys.length > 0) {
    console.error('[Firebase] Missing environment variables:', missingKeys.map(key => `NEXT_PUBLIC_FIREBASE_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`));
    return false;
  }
  return true;
};

// Initialize Firebase only on client-side
let app;
let auth;
let db;

if (typeof window !== 'undefined') {
  // Only initialize on client-side if config is valid
  if (isFirebaseConfigValid()) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
  } else {
    console.warn('[Firebase] Skipping initialization due to missing environment variables. Please check your .env.local file.');
  }
}

// Google Auth Provider (only on client)
const googleProvider = typeof window !== 'undefined' ? new GoogleAuthProvider() : null;

// Auth Methods
export const loginWithGoogle = async () => {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Not available on server' };
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Google login error:', error);
    return { success: false, error: error.message };
  }
};

export const loginWithEmail = async (email, password) => {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Not available on server' };
  }
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Email login error:', error);
    return { success: false, error: error.message };
  }
};

export const signupWithEmail = async (email, password, displayName) => {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Not available on server' };
  }
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // Create user profile in Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      uid: result.user.uid,
      email: email,
      displayName: displayName || 'Player',
      createdAt: new Date().toISOString(),
      walletBalance: 100000, // Starting virtual money
      portfolioValue: 0,
      rankings: 0,
    });
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Not available on server' };
  }
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
};

// Firestore Methods
export const getUserProfile = async (uid) => {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Not available on server' };
  }
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    }
    return { success: false, error: 'User not found' };
  } catch (error) {
    console.error('Get user profile error:', error);
    return { success: false, error: error.message };
  }
};

export const updateUserProfile = async (uid, data) => {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Not available on server' };
  }
  try {
    await setDoc(doc(db, 'users', uid), data, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Update user profile error:', error);
    return { success: false, error: error.message };
  }
};

export const getLeaderboard = async (limitCount = 100) => {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Not available on server', data: [] };
  }
  try {
    const q = query(
      collection(db, 'users'),
      orderBy('portfolioValue', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const leaderboard = [];
    querySnapshot.forEach((doc) => {
      leaderboard.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: leaderboard };
  } catch (error) {
    console.error('Get leaderboard error:', error);
    return { success: false, error: error.message };
  }
};

export { auth, db };
