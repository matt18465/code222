// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQjWpZytrNK8ilnHcbG2YJpQCDYQWzSXI",
  authDomain: "emacs-1dc89.firebaseapp.com",
  databaseURL: "https://emacs-1dc89-default-rtdb.firebaseio.com",
  projectId: "emacs-1dc89",
  storageBucket: "emacs-1dc89.appspot.com",
  messagingSenderId: "1096474550831",
  appId: "1:1096474550831:web:c3cb978ed3231ce1eedcda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
