import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { StylesManager, Survey } from 'survey-react';
import "survey-core/defaultV2.css";
import 'firebase/database';
import * as firebase from 'firebase/app';
import { userDatadb, userSelectionRef } from '../config/firebase';
import { push, ref, set } from 'firebase/database';
import { getDatabase } from "firebase/database";


const surveyJSON = {
  //copy paste survey from surveyJS creator
    "title": "Career Survey",
    "description": "Give us some general knowledge on the career you want to choose.",
    "logoPosition": "right",
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "radiogroup",
        "name": "question1",
        "title": "Which subject interests you the most?",
        "isRequired": true,
        "choices": [
         {
          "value": "scienceClass",
          "text": "Science"
         },
         {
          "value": "techClass",
          "text": "Technology"
         },
         {
          "value": "engineerClass",
          "text": "Engineering"
         },
         {
          "value": "mathClass",
          "text": "Mathematics"
         }
        ]
       }
      ],
      "title": "Branches",
      "description": "The main STEM paths."
     },
     {
      "name": "page2",
      "elements": [
       {
        "type": "checkbox",
        "name": "question2",
        "visibleIf": "{question1} = 'scienceClass'",
        "title": "Within the scientific field, choose the options that best suit you.",
        "isRequired": true,
        "choices": [
         "Item 1",
         "Item 2",
         "Item 3"
        ]
       },
       {
        "type": "checkbox",
        "name": "question3",
        "visibleIf": "{question1} = 'techClass'",
        "title": "Within the technological field, choose the options that best suit you.",
        "isRequired": true,
        "choices": [
         "Item 1",
         "Item 2",
         "Item 3"
        ]
       },
       {
        "type": "checkbox",
        "name": "question4",
        "visibleIf": "{question1} = 'engineerClass'",
        "title": "Within the engineering field, choose the options that best suit you.",
        "isRequired": true,
        "choices": [
         "Item 1",
         "Item 2",
         "Item 3"
        ]
       },
       {
        "type": "checkbox",
        "name": "question5",
        "visibleIf": "{question1} = 'mathClass'",
        "title": "Within the mathematical field, choose the options that best suit you.",
        "isRequired": true,
        "choices": [
         "Item 1",
         "Item 2",
         "Item 3"
        ]
       }
      ],
      "title": "Science Field"
     }
    ]
   };

function SurveyComp() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      StylesManager.applyTheme("defaultV2");
    }
  }, []);
  const [results, setResults] = useState(null);


  const handleSurveyComplete = (survey: {
    //checks if survey is complete
    onComplete: any; 
    //data: React.SetStateAction<null>; 
    data: Record<string, any>;
  }) => {
    console.log(survey.data)
    //create array to hold data
    const dataArray = Object.entries(survey.data).map(([key, value]) => ({
      question: key,
      answer: value
    }));
    console.log(dataArray);
    analyzeSurveyData(dataArray)
  };

  //look at data and select courses
  function analyzeSurveyData(data: any[]) {
    data.forEach((value, index) => {
      console.log(`Answer ${index + 1}: ${value.answer} (to question: ${value.question})`);
    });
  }
  

  
  return (
    <Container>
      {results ? (
        <div>Survey results: {JSON.stringify(results)}</div>
      ) : (
        <Survey
          json={surveyJSON}
          onComplete={handleSurveyComplete}
        />
      )}
    </Container>
  );
}


//gg
export default SurveyComp;

//dont need this as i wil now use an array, all survey db code is irrelevant
    // var dbRef = firebase.database().ref().child('jumbotron/header');
    // dbRef.on('value', snapshot => {
    //   console.log(snapshot.val());
    // });
  
    // Write a message to the database
    //push data to userSelection db  

    //how about i just put it into an array since i dont have that much data and take realt data from coureses firebase