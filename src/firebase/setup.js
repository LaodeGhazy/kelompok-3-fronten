// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbLd-Cpmvnf0OEZP2BPJ7rbbI0jvlU2as",
  authDomain: "rock-paper-scissors-af949.firebaseapp.com",
  projectId: "rock-paper-scissors-af949",
  storageBucket: "rock-paper-scissors-af949.appspot.com",
  messagingSenderId: "698039680340",
  appId: "1:698039680340:web:eb3c7ebb8f70c590d39cc1",
  measurementId: "G-0K2X2JLXL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);