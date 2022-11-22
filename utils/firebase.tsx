// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3bYtEAvQd4sOaIbYWrAdjNiMwPmx9Ypk",
  authDomain: "firstapp-229cf.firebaseapp.com",
  projectId: "firstapp-229cf",
  storageBucket: "firstapp-229cf.appspot.com",
  messagingSenderId: "915567537380",
  appId: "1:915567537380:web:93aa602abc1ebc1f3610f1",
  measurementId: "G-C0LPESKCLQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;