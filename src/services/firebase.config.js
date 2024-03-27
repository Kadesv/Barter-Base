// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpx8Zg3PRvcYym-38KUw2L2ctXY-sgZ8g",
  authDomain: "mytradingproject-6.firebaseapp.com",
  projectId: "mytradingproject-6",
  storageBucket: "mytradingproject-6.appspot.com",
  messagingSenderId: "314974789143",
  appId: "1:314974789143:web:d6e1a49480e7e7a236c652",
  measurementId: "G-38R5CCZ31F"
};



// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
const storage = getStorage (fireBaseApp);

export default storage;