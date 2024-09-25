// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPibR8kmdmKd34BBCDzVeqnh1eZs7kQQw",
  authDomain: "leads-tracker-b5d1f.firebaseapp.com",
  projectId: "leads-tracker-b5d1f",
  storageBucket: "leads-tracker-b5d1f.appspot.com",
  messagingSenderId: "990555275139",
  appId: "1:990555275139:web:9096bb1a26b376adabc0b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
