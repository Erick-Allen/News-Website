import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: "news-website-e8d00.firebasestorage.app",
    messagingSenderId: "438390327530",
    appId: "1:438390327530:web:3ddd3b18f4cf9de6bd6f93"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };