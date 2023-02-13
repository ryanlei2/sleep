import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import * as firebase from "firebase/app";

import { getDatabase, ref } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCiepxy3bi0erjTOH-Ml-i5Kx4G63h-Wcs",
  authDomain: "auth-dev-a6e74.firebaseapp.com",
  projectId: "auth-dev-a6e74",
  storageBucket: "auth-dev-a6e74.appspot.com",
  messagingSenderId: "499650566146",
  appId: "1:499650566146:web:3f66eb27507b72e5deaf1b"
};


const app = initializeApp(firebaseConfig);

// Get a reference to the Realtime Database
const userSelection = getDatabase(app)
// Create a new collection named "userSelection"
export const userSelectionRef = ref(userSelection, "courses")

// Get a reference to the Realtime Database
const db = getDatabase(app)
// Create a new collection named "courses"
export const coursesRef = ref(db, "courses")

export const auth = getAuth()