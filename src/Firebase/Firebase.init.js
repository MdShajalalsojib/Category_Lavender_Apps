// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVVARMf8LT7iNMzgnLaiSVIRnhQ_RB0PE",
  authDomain: "lavender-apps.firebaseapp.com",
  projectId: "lavender-apps",
  storageBucket: "lavender-apps.firebasestorage.app",
  messagingSenderId: "380539365860",
  appId: "1:380539365860:web:23a8778a509072d852bff1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);