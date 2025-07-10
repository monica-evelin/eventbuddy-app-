/*import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";*/

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*COLOCAR O VOSSO FIREBASE CONFIG AQUI*/
const firebaseConfig = {
  apiKey: "AIzaSyCKtx8vq_R9Gr0G7QW0D9LPd-t38SxoeDw",
  authDomain: "appeventos-3f5d2.firebaseapp.com",
  projectId: "appeventos-3f5d2",
  storageBucket: "appeventos-3f5d2.firebasestorage.app",
  messagingSenderId: "617002466051",
  appId: "1:617002466051:web:0d61eb5cd856cb5db54736",
  measurementId: "G-DPFN8QD31S",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const database = firebase.firestore();
export const auth = firebase.auth();
