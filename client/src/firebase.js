// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-a8f54.firebaseapp.com",
  projectId: "mern-blog-a8f54",
  storageBucket: "mern-blog-a8f54.appspot.com",
  messagingSenderId: "1060049226232",
  appId: "1:1060049226232:web:936c85fea4132e5c6bae0d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
