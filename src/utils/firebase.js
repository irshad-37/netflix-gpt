// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOReIMY7qfIrsjyax9tJI4ZyZtGhBzFbg",
  authDomain: "netflixgpt-fc4d5.firebaseapp.com",
  projectId: "netflixgpt-fc4d5",
  storageBucket: "netflixgpt-fc4d5.appspot.com",
  messagingSenderId: "194063892696",
  appId: "1:194063892696:web:d1f4392ae76bc69dc457ad",
  measurementId: "G-FDYV9SJM79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();