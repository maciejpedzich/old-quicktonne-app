import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const apps = getApps();

if (apps.length === 0) {
  const firebaseAppConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
  };

  initializeApp(firebaseAppConfig);
}

const db = getFirestore();

export default db;
