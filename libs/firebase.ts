// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4Lv-kzDEw13J_xXi6QStl_E3I9JZqPgs",
  authDomain: "marketing-analytics-tool.firebaseapp.com",
  projectId: "marketing-analytics-tool",
  storageBucket: "marketing-analytics-tool.appspot.com",
  messagingSenderId: "118523417441",
  appId: "1:118523417441:web:b3e1422225dc1721a2eb20",
  measurementId: "G-MRYVYML7J4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
