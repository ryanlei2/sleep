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
    "name": "CCS",
    "elements": [
    {
      "type": "checkbox",
      "name": "scienceFieldsQuestion",
      "visibleIf": "{stemInterestQuestion} = 'scienceClass'",
      "title": "Within the science field, choose the 3 best options that best suit you.",
      "description": "Remember, the options are to guide you through high school and then funnel your college experience, which can be very tentative.To help you choose, here is a link to science-based career descriptions:<LINK>",
      "isRequired": true,
      "choices": [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6"
      ],
      "maxSelectedChoices": 3
    },
    {
      "type": "checkbox",
      "name": "techFieldsQuestion",
      "visibleIf": "{stemInterestQuestion} = 'techClass'",
      "title": "Within the technological field, choose the 3 best options that best suit you.",
      "description": "Remember, the options are to guide you through high school and then funnel your college experience, which can be very tentative.\n\nTo help you choose, here is a link to technology-based career descriptions:\n<LINK>\n",
      "isRequired": true,
      "choices": [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6"
      ]
    },
    {
      "type": "checkbox",
      "name": "engineerFieldsQuestion",
      "visibleIf": "{stemInterestQuestion} = 'engineerClass'",
      "title": "Within the engineering field, choose the 3 best options that best suit you.",
      "description": "Remember, the options are to guide you through high school and then funnel your college experience, which can be very tentative.\n\nTo help you choose, here is a link to engineering-based\n career descriptions:\n<LINK>\n",
      "isRequired": true,
      "choices": [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6"
      ]
    },
    {
      "type": "checkbox",
      "name": "mathFieldsQuestion",
      "visibleIf": "{stemInterestQuestion} = 'mathClass'",
      "title": "Within the mathematical field, choose the 3 best options that best suit you.",
      "description": "Remember, the options are to guide you through high school and then funnel your college experience, which can be very tentative.\n\nTo help you choose, here is a link to math-based career descriptions:<LINK>",
      "isRequired": true,
      "choices": [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6"
      ]
    }
    ],
    "title": "Curated Course Selection (CCS)",
    "description": "In each question, choose as little options as possible to narrow the analysis down to a definitive answer; remember, most of the options will help generate a couple classes that will not defer from the general selection of the required math, science, language arts, or history credits.\n\nThere is no 'perfect' set of classes which you can take to get the exact career path--that's not what highschool is about! "
  },
  {
    "name": "CoreCredits",
    "elements": [
    {
      "type": "checkbox",
      "name": "sophPreReq",
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
      "name": "juniorPreReq",
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
      "name": "seniorPreReq",
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
          console.log(`Choice ${i + 1}: ${choice}`); //get answer as choice if array answer
        });
      } else {
        console.log(`${value.answer}`); //get answer as value.answer if singular value
      }
//below is within the analyze surey data method btw

//DEFINITELY ADD
// admin dashboard to see students' responses, they should be able to indicate thumbs up or down based on a career we gave them (short description included) to see if our model can be fixed (store good or bad from survey)
//ive now added a collection in firestore titled userresults, which shows the grade (grade(s) if taken multiple times thorughout the years) of the user, with the easy, recommended, and hard classes in a document (all attached to same user id)


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
