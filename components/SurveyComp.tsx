import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { StylesManager, Survey } from 'survey-react';
import "survey-core/defaultV2.css";
import 'firebase/database';
import * as firebase from 'firebase/app';
import { coursesRef, rtdb, userSelectionRef, saveSurveyData } from '../config/firebase';
import { child, get, onValue, push, ref, set } from 'firebase/database';
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
      "type": "radiogroup",
      "name": "freshMathCheck",
      "visibleIf": "{gradeQuestion} = 9",
      "title": "As a freshman, check which math you took previously in middle school.",
      "isRequired": true,
      "choices": [
      {
        "value": "genMath",
        "text": "General Math 3"
      },
      {
        "value": "geometry",
        "text": "Geometry"
      },
      {
        "value": "algebra",
        "text": "Algebra 1"
      }
      ]
    },
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
    "name": "page3",
    "elements": [
    {
      "type": "expression",
      "name": "Final Remarks",
      "title": "Final Remarks",
      "description": "That was easy! Now, before we finish the survey, we want to just give you some points of advice before you proceed to your results.\n\nBecause these are so general, we want to give you a good starting point for picking out your own classes. You can tweak what we have shown you, or just stick with the classes if they look good enough for you. The point is, we want you to get bearings set up before you trip over yourself on the perfect classes."
    }
    ],
    "title": "You Did it!"
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
  function analyzeSurveyData(dataArray: any[]) {
    const easyMathClasses = new Array();
    const easyScienceClasses = new Array();
    const easySocialClasses = new Array();
    const easyLAClasses = new Array();

    const recommendedMathClasses = new Array();
    const recommendedScienceClasses = new Array();
    const recommendedSocialClasses = new Array();
    const recommendedLAClasses = new Array();

    const hardMathClasses = new Array();
    const hardScienceClasses = new Array();
    const hardSocialClasses = new Array();
    const hardLAClasses = new Array();

    let rigor: any;
    let grade: any;


    const sections = ["science", "math", "la", "social"];

    dataArray.forEach((value, index) => {
      console.log(`Answer ${index + 1}:`);
      if (Array.isArray(value.answer)) {
        value.answer.forEach((choice: any, i: number) => {
          //Choice ${i + 1}
          console.log(`: ${choice}`); //get answer as choice if array answer
        });
      } else {
        console.log(`${value.answer}`); //get answer as value.answer if singular value
        //freshmen math
        if (index === 4 && value.answer === 'genMath') {
          console.log('genmath chosen');
            easyMathClasses.push('Algebra 1')
            recommendedMathClasses.push('Algebra 1')
            hardMathClasses.push('Algebra 1')
          console.log('science must-have');
            easyScienceClasses.push('Introduction to Chemistry')
            recommendedScienceClasses.push('Introduction to Chemistry')
            hardScienceClasses.push('Introduction to Chemistry')
        } else if (value.answer === 'geometry') {
          console.log('geometry chosen');
            easyMathClasses.push('Algebra 2')
            recommendedMathClasses.push('Algebra 2 Honors')
            hardMathClasses.push('Algebra 2 Honors')
        } else if (value.answer === 'algebra') {
          console.log('algebra chosen');
            easyMathClasses.push('Geometry')
            recommendedMathClasses.push('Geometry Honors')
            hardMathClasses.push('Geometry Honors')
        }

        if (index === 1) {
          rigor = value.answer
        }
        //soph+ math
        if (index === 0) {
          grade = value.answer
        }
        //grab all courses with that grade and shoot them into the right arrays with their rigor
      }
    });
//ive now added a collection in firestore titled userresults, which shows the grade (grade(s) if taken multiple times thorughout the years) of the user, with the easy, recommended, and hard classes in a document (all attached to same user id
    
const coursesRef = ref(rtdb, 'courses');

onValue(coursesRef, (snapshot) => {
  const sections = ['science', 'math', 'la', 'social'];
  
  sections.forEach((section) => {
    const sectionRef = child(coursesRef, section);
    onValue(sectionRef, (sectionSnapshot) => {
      sectionSnapshot.forEach((courseSnapshot) => {
        const course = courseSnapshot.val();
        const grades = course.grade?.split(",") ?? [];
        
        if (grades.includes(String(grade))) {
          console.log(`Found course with grade ${grade}: ${courseSnapshot.key}`);
          //lowerlevel of course (property)
          const gradeRef = child(courseSnapshot.ref, "grade");
          const rigorRef = child(courseSnapshot.ref, "rigor");
          //not part of property, more like brand
          const courseName= courseSnapshot.key;
          const courseSection = sectionSnapshot.key;
          let courseRigor;
          let courseGrade;
          onValue(gradeRef, (gradeSnapshot) => {
            courseGrade = gradeSnapshot.val();
            console.log(`Course grade(s): ${courseGrade}`);
          });
          onValue(rigorRef, (rigorSnapshot) => {
            courseRigor = rigorSnapshot.val();
            console.log(`Course rigor: ${courseRigor}`);
          });
          console.log(courseName);
          console.log(courseSection);
          
          if (courseSection === 'science') {
            if (courseRigor === 'easy') {
              console.log('hellow');
              //HAHHA YES NOW ADD IT TO THE ARRAY THEN PUT IT ON TABLE AND FINALLY ADD BTTON TO UIP IT
            }
          } else if (courseSection === 'math') {

          } else if (courseSection === 'la') {

          } else if (courseSection === 'social') {

          }
          
        } else {
          console.log(`Could not find any courses with grade ${grade}`);
        }
      });
    });
  });
});
// switch (course.rigor) {
            //   case "easy":
            //     if (section === "science") {
            //       easyScienceClasses.push(courseSnapshot.key);
            //     } else if (section === "math") {
            //       easyMathClasses.push(courseSnapshot.key);
            //     } else if (section === "la") {
            //       easyLAClasses.push(courseSnapshot.key);
            //     } else if (section === "social") {
            //       easySocialClasses.push(courseSnapshot.key);
            //     }
            //     break;
            //   case "recommended":
            //     if (section === "science") {
            //       recommendedScienceClasses.push(courseSnapshot.key);
            //     } else if (section === "math") {
            //       recommendedMathClasses.push(courseSnapshot.key);
            //     } else if (section === "la") {
            //       recommendedLAClasses.push(courseSnapshot.key);
            //     } else if (section === "social") {
            //       recommendedSocialClasses.push(courseSnapshot.key);
            //     }
            //     break;
            //   case "intermediate":
            //     if (section === "science") {
            //       hardScienceClasses.push(courseSnapshot.key);
            //     } else if (section === "math") {
            //       hardMathClasses.push(courseSnapshot.key);
            //     } else if (section === "la") {
            //       hardLAClasses.push(courseSnapshot.key);
            //     } else if (section === "social") {
            //       hardSocialClasses.push(courseSnapshot.key);
            //     }
            //     break;
            // }












      console.log(rigor);
      console.log(grade);
      
      
      console.log(easyMathClasses);
      console.log(easyScienceClasses);
      console.log(easySocialClasses);
      console.log(easyLAClasses);

      console.log(recommendedMathClasses);
      console.log(recommendedScienceClasses);
      console.log(recommendedSocialClasses);
      console.log(recommendedLAClasses);

      console.log(hardMathClasses);
      console.log(hardScienceClasses);
      console.log(hardSocialClasses);
      console.log(hardLAClasses);
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
