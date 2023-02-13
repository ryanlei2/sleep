import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {getFirestore} from "firebase/firestore";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCiepxy3bi0erjTOH-Ml-i5Kx4G63h-Wcs",
  authDomain: "auth-dev-a6e74.firebaseapp.com",
  projectId: "auth-dev-a6e74",
  storageBucket: "auth-dev-a6e74.appspot.com",
  messagingSenderId: "499650566146",
  appId: "1:499650566146:web:3f66eb27507b72e5deaf1b"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth()