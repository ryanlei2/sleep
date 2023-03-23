import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, CollectionReference, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get, child, equalTo, orderByValue } from 'firebase/database';
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
export const db = getFirestore(app);
export const userSelectionRef = collection(db, "userSelection");
export const userFeedbackRef = collection(db, "userFeedback");
export const userResultsRef = collection(db, "userResults");

// Realtime Database reference from app
export const rtdb = getDatabase(app);
export const coursesRef = ref(rtdb, "courses") 

// Auth
export const auth = getAuth();

//collections within the firebase realtime db... also need one for courses.. yea?
export const adminsCollection = collection(db, 'admins');
export const coursesCollection = collection(db, 'courses');

// Function to check if a user is an admin
export async function checkAdmin(userId: string) {
  try {
    //refer to admin collection within db
    const adminsRef = ref(rtdb, "admins");
    //await the current list of admins
    const snapshot = await get(adminsRef);
    //once gotten set it to constant of all admins
    const admins = snapshot.val();
    console.log(admins);
    
    //check if admins list is not empty and inclues current users id
    const isAdmin = admins && Object.values(admins).includes(userId);
    if (isAdmin) {
      console.log('User is an admin, loading admin dashboard');
    } else {
      console.log('User is NOT an admin, loading student dashboard');
    }
    return isAdmin;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

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

export function saveUserFeedback(feedback: string[]) {
  //take user id
  const userId = auth.currentUser?.uid;
  const email = auth.currentUser?.email;
  console.log(email);
  if (!email) {
    console.error('User email not available.');
    return;
  }
  if (!userId) {
    console.error('User is not logged in.');
    return;
  }
  //add document to the userSelectionRef firestore db with time added and data, which is user feedback
  addDoc(userFeedbackRef, {
    userId: userId,
    userEmail: email,
    date: new Date().toLocaleDateString('en-GB'),
    data: feedback
  })
    .then(() => {
      console.log("User feedback saved successfully to Cloud Firestore!");
    })
    .catch((error) => {
      console.error("Error saving user feedback: ", error);
    });
}
