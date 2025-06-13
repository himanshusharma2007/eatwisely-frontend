// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmAjDB2VzBlKXKgXi436fqYcwCfKwaZNI",
  authDomain: "eatwisely-1cbbd.firebaseapp.com",
  projectId: "eatwisely-1cbbd",
  storageBucket: "eatwisely-1cbbd.firebasestorage.app",
  messagingSenderId: "1084588136677",
  appId: "1:1084588136677:web:9119bc1e5f2d6764ebdc0c",
  measurementId: "G-MCM89RHP6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };