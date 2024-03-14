import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { StylesManager, Survey } from 'survey-react';
import "survey-core/defaultV2.css";
import 'firebase/database';
import * as firebase from 'firebase/app';
import { coursesRef, rtdb, userResultsRef, userSelectionRef, saveSurveyData, auth, userDataRef } from '../config/firebase';
import { child, get, onValue, push, ref, set } from 'firebase/database';
import { getDatabase } from "firebase/database";
import { useRouter } from 'next/router'
import { Link } from 'react-router-dom';
import { addDoc, serverTimestamp } from 'firebase/firestore';

//paste in te survey from surveyJS
const surveyJSON = 
{
  "title": "Sleep Statement",
  "description": "When did you sleep?",
  "logoPosition": "right",
  "pages": [
   {
    "name": "page1",
    "elements": [
     {
      "type": "radiogroup",
      "name": "question2",
      "title": "I slept at (P.M./A.M.):",
      "choices": [
       {
        "value": "9 PM",
        "text": "9:00"
       },
       {
        "value": "9:30 PM",
        "text": "9:30"
       },
       {
        "value": "10 PM",
        "text": "10:00"
       },
       {
        "value": "10:30 PM",
        "text": "10:30"
       },
       {
        "value": "11 PM",
        "text": "11:00"
       },
       {
        "value": "11:30 PM",
        "text": "11:30"
       },
       {
        "value": "12 AM",
        "text": "12:00"
       },
       {
        "value": "12:30 AM",
        "text": "12:30"
       },
       {
        "value": "1 AM",
        "text": "1:00"
       }
      ]
     }
    ],
    "title": "Sleeping Time",
    "description": "When did you sleep yesterday?"
   },
   {
    "name": "page2",
    "elements": [
     {
      "type": "radiogroup",
      "name": "question1",
      "title": "I woke up at (A.M.):",
      "choices": [
       {
        "value": "5 AM",
        "text": "5:00"
       },
       {
        "value": "5:15 AM",
        "text": "5:15"
       },
       {
        "value": "5:30 AM",
        "text": "5:30"
       },
       {
        "value": "5:45 AM",
        "text": "5:45"
       },
       {
        "value": "6 AM",
        "text": "6:00"
       },
       {
        "value": "6:15 AM",
        "text": "6:15"
       },
       {
        "value": "6:30 AM",
        "text": "6:30"
       },
       {
        "value": "6:45 AM",
        "text": "6:45"
       },
       {
        "value": "7 AM",
        "text": "7:00"
       },
       {
        "value": "7:15 AM",
        "text": "7:15"
       },
       {
        "value": "7:30 AM",
        "text": "7:30"
       },
       {
        "value": "7:45 AM",
        "text": "7:45"
       },
       {
        "value": "8 AM",
        "text": "8:00"
       }
      ]
     }
    ],
    "title": "Waking Time",
    "description": "When did you wake up today?"
   },
   {
    "name": "page3",
    "elements": [
     {
      "type": "radiogroup",
      "name": "question3",
      "title": "On a scale of  one to three, one being the worst and three being the best, what would you rate your quality of sleep?",
      "choices": [
       {
        "value": "one",
        "text": "1"
       },
       {
        "value": "two",
        "text": "2"
       },
       {
        "value": "three",
        "text": "3"
       }
      ]
     }
    ],
    "title": "Quality"
   }
  ]
 }

function SurveyComp() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      StylesManager.applyTheme("defaultV2");
    }
  }, []);
  const [results, setResults] = useState(null);




  const handleSurveyComplete = (survey: {
    onComplete: any;
    data: Record<string, any>;
  }) => {
    console.log(survey.data);
    const wakingTime = survey.data.question1;
    const sleepingTime = survey.data.question2;
    const quality = survey.data.question3;
    // Save waking and sleeping times to Firestore
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error('User is not logged in.');
      return;
    }
  
    addDoc(userDataRef, {
      userId: userId,
      wakingTime,
      sleepingTime,
      quality,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        console.log("User data saved successfully to Cloud Firestore!");
      })
      .catch((error) => {
        console.error("Error saving user data: ", error);
      });
      setTimeout(() => {
            router.push({
              pathname: '/dashboard',
            })
          },);
  };

  return (
    <div>
      {results ? (
        <div>Survey results: {JSON.stringify(results)}</div>
      ) : (
        <div>
          <Survey
          json={surveyJSON}
          onComplete={handleSurveyComplete}
          /> 
        </div> 
      )}
    </div>
    
  );
}
//gg
export default SurveyComp;
