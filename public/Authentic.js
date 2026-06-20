import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBbPqJp47o1X4doKPgl81SYgrH7plb3GbI",
  authDomain: "scholartracker-4c89b.firebaseapp.com",
  projectId: "scholartracker-4c89b",
  storageBucket: "scholartracker-4c89b.firebasestorage.app",
  messagingSenderId: "358267174657",
  appId: "1:358267174657:web:1b914119e06a19f490a500"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


