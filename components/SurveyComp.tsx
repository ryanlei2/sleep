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
  "completedHtml": "<h3>Great, thank you for completing the survey! You'll soon see your results.</h3>\n      <a href='/results'> Results </a>\n",
  "pages": [
  {
    "name": "SchoolQuestions",
    "elements": [
    {
      "type": "radiogroup",
      "name": "gradeQuestion",
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
      "name": "classLevelQuestion",
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
      "name": "creditQuestion",
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
      "name": "stemInterestQuestion",
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
    "title": "School Questions",
    "description": "We need to know your background first."
  },
  {
    "name": "CoreCredits",
    "elements": [
    {
      "type": "checkbox",
      "name": "sophPreReqQuestion",
      "visibleIf": "{gradeQuestion} = 10",
      "title": "As a sophomore, check which credits you need to take to pass high school.",
      "isRequired": true,
      "choices": [
      {
        "value": "mathNeeded",
        "text": "Math"
      },
      {
        "value": "scienceNeeded",
        "text": "Science"
      },
      {
        "value": "englishNeeded",
        "text": "English"
      },
      {
        "value": "socialNeeded",
        "text": "Social Studies"
      }
      ]
    },
    {
      "type": "checkbox",
      "name": "juniorPreReqQuestion",
      "visibleIf": "{gradeQuestion} = 11\n",
      "title": "As a junior, check which credits you need to take to pass high school.",
      "isRequired": true,
      "choices": [
      {
        "value": "mathNeeded",
        "text": "Math"
      },
      {
        "value": "scienceNeeded",
        "text": "Science"
      },
      {
        "value": "englishNeeded",
        "text": "English"
      },
      {
        "value": "socialNeeded",
        "text": "Social Studies"
      }
      ]
    },
    {
      "type": "checkbox",
      "name": "seniorPreReqQuestion",
      "visibleIf": "{gradeQuestion} = 12",
      "title": "As a senior, check which credits you need to take to pass high school.",
      "isRequired": true,
      "choices": [
      {
        "value": "mathNeeded",
        "text": "Math"
      },
      {
        "value": "scienceNeeded",
        "text": "Science"
      },
      {
        "value": "englishNeeded",
        "text": "English"
      },
      {
        "value": "socialNeeded",
        "text": "Social Studies"
      }
      ]
    }
    ],
    "title": "Core Credits",
    "description": "We use these questions to determine whether we should assign you a core class or give more room for a career class."
  },
  {
    "name": "page1",
    "elements": [
    {
      "type": "expression",
      "name": "Final Remarks",
      "title": "Final Remarks",
      "description": "That was easy! Now, before we finish the survey, we want to just give you some points of advice before you proceed to your results.\n\nBecause these are so general, we want to give you a good starting point for picking out your own classes. You can tweak what we have shown you, or just stick with the classes if they look good enough for you. The point is, we want you to get bearings set up before you trip over yourself on the perfect classes."
    }
    ]
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
    const easyClasses = new Array(6);
    const recommendedClasses = new Array(6);
    const hardClasses = new Array(6);
    //pass is Richlandhigh420
    data.forEach((value, index) => {
      console.log(`Answer ${index + 1}:`);
      if (Array.isArray(value.answer)) {
        value.answer.forEach((choice: any, i: number) => {
          //Choice ${i + 1}
          console.log(`: ${choice}`); //get answer as choice if array answer
        });
      } else {
        console.log(`${value.answer}`); //get answer as value.answer if singular value
      }
//below is within the analyze surey data method btw

//DEFINITELY ADD
//ive now added a collection in firestore titled userresults, which shows the grade (grade(s) if taken multiple times thorughout the years) of the user, with the easy, recommended, and hard classes in a document (all attached to same user id)


    });
  }
  return (
    <div>
      {results ? (
        <div>Survey results: {JSON.stringify(results)}</div>
      ) : (
          <Survey
          json={surveyJSON}
          onComplete={handleSurveyComplete}
        />        
      )}
    </div>
    
  );
}
//gg
export default SurveyComp;
