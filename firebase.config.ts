// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCArmvVxpIzoHZ6_ENlVGGBCcBf3riVSqk",
  authDomain: "art-app-29dc7.firebaseapp.com",
  projectId: "art-app-29dc7",
  storageBucket: "art-app-29dc7.firebasestorage.app",
  messagingSenderId: "237439978029",
  appId: "1:237439978029:web:75d7b7d599c68ed5a346a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
