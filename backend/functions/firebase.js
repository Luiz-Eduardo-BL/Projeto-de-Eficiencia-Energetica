// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbTKzcqaO4WVrbHsOqST5h--jHO4p9UcM",
  authDomain: "eficiencia-energetica---jf.firebaseapp.com",
  projectId: "eficiencia-energetica---jf",
  storageBucket: "eficiencia-energetica---jf.appspot.com",
  messagingSenderId: "586722507060",
  appId: "1:586722507060:web:640684ce4a06eca5548d61",
  measurementId: "G-7M6VTTVBLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);