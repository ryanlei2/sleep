import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, CollectionReference } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref } from 'firebase/database';
import { Auth, sendPasswordResetEmail as firebaseSendPasswordResetEmail } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCiepxy3bi0erjTOH-Ml-i5Kx4G63h-Wcs",
  authDomain: "auth-dev-a6e74.firebaseapp.com",
  projectId: "auth-dev-a6e74",
  storageBucket: "auth-dev-a6e74.appspot.com",
  messagingSenderId: "499650566146",
  appId: "1:499650566146:web:3f66eb27507b72e5deaf1b"
};


// initialize Firebase app
const app = initializeApp(firebaseConfig);

// Firestore reference from app
const db = getFirestore(app);
export const userSelectionRef = collection(db, "userSelection");

// Realtime Database reference from app
const rtdb = getDatabase(app);
export const coursesRef = ref(rtdb, "courses");

// Auth
export const auth = getAuth();

export const sendPasswordResetEmail = async (auth: Auth, email: string) => {
  try {
    await firebaseSendPasswordResetEmail(auth, email); // Modify the email value here
    console.log('Password reset email sent successfully.')
  } catch (error) {
    console.log(error)
  }
}


export function saveSurveyData(surveyData: { question: string; answer: any; }[]) {
  //take user id
  const userId = auth.currentUser?.uid;
  if (!userId) {
    console.error('User is not logged in.');
    return;
  }
  //add document to the userSelectionRef firestore db with time added and data, which is survey res
  addDoc(userSelectionRef, {
    userId: userId,
    timestamp: serverTimestamp(),
    data: surveyData,
  })
    .then(() => {
      console.log("Survey data saved successfully to Cloud Firestore!");
    })
    .catch((error) => {
      console.error("Error saving survey data: ", error);
    });
}