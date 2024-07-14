// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAffAyMApMAfuk2Ua365gVPAtZB7BVRMaU",
  authDomain: "recipe-ai-b566e.firebaseapp.com",
  projectId: "recipe-ai-b566e",
  storageBucket: "recipe-ai-b566e.appspot.com",
  messagingSenderId: "380868675390",
  appId: "1:380868675390:web:b9627d470d90aa7307ce6f",
  measurementId: "G-02RWYTYX98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth }