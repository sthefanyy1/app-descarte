// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default { auth, db }; //feito pelo exemplo