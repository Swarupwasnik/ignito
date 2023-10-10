// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth,onAuthStateChanged} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDsReIOlu68EXy0JGqCzAqWaCg9ZdJPa8U",
  authDomain: "social-media-5604b.firebaseapp.com",
  projectId: "social-media-5604b",
  storageBucket: "social-media-5604b.appspot.com",
  messagingSenderId: "528618479049",
  appId: "1:528618479049:web:2fc360e96b0e2af9b3dc18",
  measurementId: "G-TL3LFT14BG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);


export {auth, db, onAuthStateChanged}