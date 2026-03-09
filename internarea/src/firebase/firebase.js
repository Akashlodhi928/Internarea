// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAoPqa6oQHDNVcSeUus4RzABn0fsutEA40",
  authDomain: "internarea-d8ea5.firebaseapp.com",
  projectId: "internarea-d8ea5",
  storageBucket: "internarea-d8ea5.firebasestorage.app",
  messagingSenderId: "882674453861",
  appId: "1:882674453861:web:d89a3182f41f629ad9658c",
  measurementId: "G-VZJKZZBTST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };