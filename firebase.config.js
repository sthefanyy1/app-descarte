// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC974Rumhb8yC5A8d0ImI0MpO6nCtoLCvU",
  authDomain: "app-descarte-8c9de.firebaseapp.com",
  projectId: "app-descarte-8c9de",
  storageBucket: "app-descarte-8c9de.firebasestorage.app",
  messagingSenderId: "815702612803",
  appId: "1:815702612803:web:b11bd8bd0e0a6363f0edf6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;