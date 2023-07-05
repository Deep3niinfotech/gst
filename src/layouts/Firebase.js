import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCV7_EHgu1D-XrFwjMpTW7kC3cdhh40Gks',
  authDomain: 'gst-dashboard-8485c.firebaseapp.com',
  projectId: 'gst-dashboard-8485c',
  storageBucket: 'gst-dashboard-8485c.appspot.com',
  messagingSenderId: '84264996870',
  appId: '1:84264996870:web:9ffdea4896d2fb8fcc3387',
  measurementId: 'G-7LM567QNB0',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;