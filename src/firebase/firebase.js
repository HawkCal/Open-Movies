import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCC2aBfZS-6W3-rhQRGwT5Z3VH5Eh5JiS0',
  authDomain: 'classic-movies-d3b9a.firebaseapp.com',
  projectId: 'classic-movies-d3b9a',
  storageBucket: 'classic-movies-d3b9a.appspot.com',
  messagingSenderId: '635657026726',
  appId: '1:635657026726:web:4a51abe6959864589cc867'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  app,
  auth,
  db,
  storage
};