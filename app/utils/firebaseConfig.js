import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKH_B4nqz61gkcaBPvabk_Pi7tz9vhNUU",
  authDomain: "donation-app-10f97.firebaseapp.com",
  projectId: "donation-app-10f97",
  storageBucket: "donation-app-10f97.firebasestorage.app",
  messagingSenderId: "597136163911",
  appId: "1:597136163911:web:38ce8840dc46d7c9985d62"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);