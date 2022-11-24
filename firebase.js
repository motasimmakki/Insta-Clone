// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClvuf_DAOBqtYmXIy8qy3fctZMZ0XJmrQ",
  authDomain: "insta-clone-45afa.firebaseapp.com",
  projectId: "insta-clone-45afa",
  storageBucket: "insta-clone-45afa.appspot.com",
  messagingSenderId: "200295811953",
  appId: "1:200295811953:web:e6cae501fced9141d9c4d0",
  measurementId: "G-40K2BTCMHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
const auth = getAuth(app);
const storage = getStorage(app);

export {auth, storage}