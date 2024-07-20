// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZ7OoyGLLqdtRvXg0hJlq21z7ow_uWlfo",
  authDomain: "socialsphere-70b68.firebaseapp.com",
  projectId: "socialsphere-70b68",
  storageBucket: "socialsphere-70b68.appspot.com",
  messagingSenderId: "941756224880",
  appId: "1:941756224880:web:607292d50aed4ebf982bb5",
  measurementId: "G-ENCBJFTM3B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);