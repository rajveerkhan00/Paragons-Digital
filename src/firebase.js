import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyD8XbcVnxSYhpYaucRLyG6EqEuugFs92k4",
  authDomain: "paragon-digital.firebaseapp.com",
  projectId: "paragon-digital",
  storageBucket: "paragon-digital.appspot.com",
  messagingSenderId: "604346125049",
  appId: "1:604346125049:web:24d12dc5785b0f255af028"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, functions };