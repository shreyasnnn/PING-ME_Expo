// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (Replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyDYLoEm3_BN2oAukQxEjSe1t92Wkbmn_B0",
  authDomain: "pingme-dd1aa.firebaseapp.com",
  projectId: "pingme-dd1aa",
  storageBucket: "pingme-dd1aa.firebasestorage.app",
  messagingSenderId: "1050971238885",
  appId: "1:1050971238885:android:6a58fee92e333a2a73bf0c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
