// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJS77hpsioHBslBmqCcd-kUyErczb1u8k",
  authDomain: "netflixgpt-5fbb4.firebaseapp.com",
  projectId: "netflixgpt-5fbb4",
  storageBucket: "netflixgpt-5fbb4.appspot.com",
  messagingSenderId: "210641583251",
  appId: "1:210641583251:web:55841b555a8fe157956166",
  measurementId: "G-8LNXEJL8PD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
