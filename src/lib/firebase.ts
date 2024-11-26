import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAtzFaxkP-61TfxVdVuks2Gx74uTHH_O7Q',
  authDomain: 'elite-clubhouse.firebaseapp.com',
  projectId: 'elite-clubhouse',
  storageBucket: 'elite-clubhouse.appspot.com',
  messagingSenderId: '293560097797',
  appId: '1:293560097797:web:d40238687172ece670106c'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);