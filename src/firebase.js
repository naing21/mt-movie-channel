
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXCK4cF6vqzUoBN4MhuarpKPI3tcMbSIc",
  authDomain: "blog-test-50c60.firebaseapp.com",
  projectId: "blog-test-50c60",
  storageBucket: "blog-test-50c60.firebasestorage.app",
  messagingSenderId: "59847005367",
  appId: "1:59847005367:web:d94d08ed0e0b2180792932"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);