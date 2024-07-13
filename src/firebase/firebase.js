import {getAuth} from "firebase/auth" 
import {getFirestore} from "firebase/firestore"

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmvLFHLtrTG15kPS7uvn_r3bW5NRVTB2c",
  authDomain: "e-commerce1-d838c.firebaseapp.com",
  projectId: "e-commerce1-d838c",
  storageBucket: "e-commerce1-d838c.appspot.com",
  messagingSenderId: "911796427121",
  appId: "1:911796427121:web:e24371e55bee2f4bc07ed0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DB = getFirestore(app) ;
const auth = getAuth(app) ;

export {auth , DB}