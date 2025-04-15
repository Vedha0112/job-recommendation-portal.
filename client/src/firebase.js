// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 🧠 Replace these values with your Firebase project settings
const firebaseConfig = {
  apiKey: "AIzaSyCTUOvpG5h_IvzYpxOJttbk5rtH1rWBGUg",
  authDomain: "job-recommendation-porta-ad40b.firebaseapp.com",
  projectId: "job-recommendation-porta-ad40b",
  storageBucket: "job-recommendation-porta-ad40b.firebasestorage.app",
  messagingSenderId: "601061582940",
  appId: "1:601061582940:web:d60dfe9275529354f4de99"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
