import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { StylesManager, Survey } from 'survey-react';
import "survey-core/defaultV2.css";
import 'firebase/database';
import * as firebase from 'firebase/app';
import { coursesRef, userSelectionRef, saveSurveyData } from '../config/firebase';
import { push, ref, set } from 'firebase/database';
import { getDatabase } from "firebase/database";

//paste in te survey from surveyJS
const surveyJSON = 
{
  "title": "Career Survey",
  "description": "Give us some general knowledge on the career you want to choose.",
  "logoPosition": "right",
  "completedHtml": "<h3>Thank you for completing the survey</h3>\n      <a href='/results'> Results </a>\n",
  "pages": [
   {
    "name": "page1",
    "elements": [
     {
      "type": "radiogroup",
      "name": "question6",
      "title": "Which highschool level are you?",
      "isRequired": true,
      "choices": [
       {
        "value": "9",
        "text": "Freshman (9th)"
       },
       {
        "value": "10",
        "text": "Sophomore (10th)"
       },
       {
        "value": "11",
        "text": "Junior (11th)"
       },
       {
        "value": "12",
        "text": "Senior (12th)"
       }
      ]
     },
     {
      "type": "radiogroup",
      "name": "question7",
      "title": "How hard do you want your classes to be?",
      "isRequired": true,
      "choices": [
       {
        "value": "hard",
        "text": "Challenging (AP/Honors)"
       },
       {
        "value": "medium",
        "text": "Intermediate (Honors)"
       },
       {
        "value": "easy",
        "text": "Basic (:P)"
       }
      ]
     },
     {
      "type": "radiogroup",
      "name": "question1",
      "title": "Have you completed your PE and/or Health Credits (complete these ASAP)",
      "isRequired": true,
      "choices": [
       {
        "value": "both",
        "text": "Yes, both"
       },
       {
        "value": "pe",
        "text": "Only PE"
       },
       {
        "value": "health",
        "text": "Only Health"
       },
       {
        "value": "none",
        "text": "Neither"
       }
      ]
     },
     {
      "type": "radiogroup",
      "name": "question8",
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
    "title": "Questions",
    "description": "Answer these as honestly as possible."
   },
   {
    "name": "page2",
    "elements": [
     {
      "type": "checkbox",
      "name": "question2",
      "visibleIf": "{question1} = 'both'",
      "title": "Within the science field, choose the 3 best options that best suit you.",
      "description": "Remember, the options are to guide you through high school and then funnel your college experience, which can be very tentative.\n\nTo help you choose, here is a link to science-based career descriptions:\n<LINK>\n",
      "isRequired": true,
      "choices": [
       "Item 1",
       "Item 2",
       "Item 3"
      ],
      "maxSelectedChoices": 3
     },
     {
      "type": "checkbox",
      "name": "question3",
      "visibleIf": "{question1} = 'pe'",
      "title": "Within the technological field, choose the 3 best options that best suit you.",
      "description": "Remember, the options are to guide you through high school and then funnel your college experience, which can be very tentative.\n\nTo help you choose, here is a link to technology-based career descriptions:\n<LINK>\n",
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
      "visibleIf": "{question1} = 'health'",
      "title": "Within the engineering field, choose the 3 best options that best suit you.",
      "description": "Remember, the options are to guide you through high school and then funnel your college experience, which can be very tentative.\n\nTo help you choose, here is a link to engineering-based\n career descriptions:\n<LINK>\n",
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
      "visibleIf": "{question1} = 'none'",
      "title": "Within the mathematical field, choose the 3 best options that best suit you.",
      "description": "Remember, the options are to guide you through high school and then funnel your college experience, which can be very tentative.\n\nTo help you choose, here is a link to math-based career descriptions:\n<LINK>\n",
      "isRequired": true,
      "choices": [
       "Item 1",
       "Item 2",
       "Item 3"
      ]
     }
    ],
    "title": "Curated Course Selection (CCS)",
    "description": "In each question, choose as little options as possible to narrow the analysis down to a definitive answer; remember, most of the options will help generate a couple classes that will not defer from the general selection of the required math, science, language arts, or history credits."
   }
  ],
  "widthMode": "static"
 }

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
    saveSurveyData(dataArray); // Save survey data to Firestore
  };

  //look at data and select courses
  function analyzeSurveyData(data: any[]) {
    //pass is Richlandhigh420
    data.forEach((value, index) => {
      console.log(`Answer ${index + 1}:`);
      if (Array.isArray(value.answer)) {
        value.answer.forEach((choice: any, i: number) => {
          console.log(`Choice ${i + 1}: ${choice}`); //get answer as choice if array answer
        });
      } else {
        console.log(`${value.answer}`); //get answer as value.answer if singular value
      }   
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