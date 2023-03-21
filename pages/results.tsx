import React, { useState } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { saveUserFeedback } from '../config/firebase';
import { useLocation } from 'react-router-dom';
import { useRouter } from 'next/router';
import { ArrayChanges } from 'survey-react';
import { arrayBuffer } from 'stream/consumers';

    

const Results = () => {
  const router = useRouter()

let recommendedConsider: string[] = []
let stemBasedOnRigor: string[] = []
  const data = router.query
  console.log(router.query.data);
  let easyMath = data.easyMathClasses;
  console.log(router.query.data);
    
  let easyScience: string[] = []
  let easySocial: string[] = []
  let easyLA: string[] = []

  let recommendedMath: string[] = []
  let recommendedScience: string[] = []
  let recommendedSocial: string[] = []
  let recommendedLA: string[] = []

  let hardMath: string[] = []
  let hardScience: string[] = []
  let hardSocial: string[] = []
  let hardLA: string[] = []

  const [feedback, setFeedback] = useState('');
  const [buttonClicked, setButtonClicked] = useState('');

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(event.target.value);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.target as HTMLButtonElement;
    setButtonClicked(button.name);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const feedbackData = [`${feedback} ${buttonClicked}`];
    saveUserFeedback(feedbackData);
    setFeedback('');
    setButtonClicked('');
  };

  return (
    <div>
      <div className='display-5' style={{ textAlign: 'center', marginTop: '6rem' }}>
        <Container>
          <Table striped bordered>
            <thead>
              <tr>
                <th></th>
                <th>Recommended</th>
                <th>Intermediate</th>
                <th>Easy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Math</td>
                <td>{recommendedMath.join(", ")}</td>
                <td>{hardMath.join(", ")}</td>
                <td>{}</td>
                {/* easyMath.join(", ") */}
              </tr>
              <tr>
                <td>Science</td>
                <td>{recommendedScience.join(", ")}</td>
                <td>{hardScience.join(", ")}</td>
                <td>{easyScience.join(", ")}</td>
              </tr>
              <tr>
                <td>Social</td>
                <td>{recommendedSocial.join(", ")}</td>
                <td>{hardSocial.join(", ")}</td>
                <td>{easySocial.join(", ")}</td>
              </tr>
              <tr>
                <td>LA</td>
                <td>{recommendedLA.join(", ")}</td>
                <td>{hardLA.join(", ")}</td>
                <td>{easyLA.join(", ")}</td>
              </tr>
              <tr>
                <td>STEM</td>
                <td>{stemBasedOnRigor.join(", ")}</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Classes to Consider:</td>
                <td>{recommendedConsider.join(", ")}</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <Button variant='success' size='lg' name='agree' onClick={handleButtonClick}>
            Agree
          </Button>
          <Button variant='danger' size='lg' name='disagree' onClick={handleButtonClick}>
            Disagree
          </Button>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <h3>Feedback</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='feedbackForm'>
              <Form.Control as='textarea' rows={3} value={feedback} onChange={handleFeedbackChange}/>
              <Button variant='primary' type='submit' style={{ marginTop: '3rem' }}>
                Submit Feedback
              </Button>
            </Form.Group>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Results;
// // Ryan
// I am using nextJS and reactbootstrap. I am trying to convert a JSON file into a bunch of arrays, after stringify ing them and passing them.
// Here is what the console logs when I show the data query from the JSON:
// {"easyMathClasses":["Algebra 1"],"easySocialClasses":["world geography"],"easyScienceClasses":["Introduction to Chemistry"],"easyLAClasses":["language arts 9"],"recommendedMathClasses":["Algebra 1"],"recommendedScienceClasses":["Introduction to Chemistry"],"recommendedSocialClasses":["ap human geography","ap world history"],"recommendedLAClasses":[],"hardMathClasses":["Algebra 1"],"hardScienceClasses":["Introduction to Chemistry"],"hardSocialClasses":["world geography"],"hardLAClasses":["language arts 9 honors"],"recommendedClassesConsider":[],"stemChoicesBasedOnRigor":[]}
// As you can see, it is not a string at all, but a bunch of arrays. How can I parse it into arrays from that?

// this line:
//   const parsedData = JSON.parse(data);
// gives error on data:
// const data: string | string[] | undefined
// Argument of type 'string | string[] | undefined' is not assignable to parameter of type 'string'.
//   Type 'undefined' is not assignable to type 'string'.ts(2345)
// because some arrays are empty, some are filled with more than one string, and some are just one string. The empty ones are treated as undefined, the one-length arrays are strings, and the string[] are arrays with length longer than one. How can I account for these?
// That's not what I want. If the type is of an array, i want to add all the array values to my array on the page, and if it is is a string, just add it to the array, and if it is null, add an empty string to the array, for all arrays i have.
// Also, data is separated into many arrays. I want Each array to be given to my array, like all the contents of easyMathClasses should be transferred to the array easyMath, in here:
// let easyMath: string[] = []
//     let easyScience: string[] = []
//     let easySocial: string[] = []
//     let easyLA: string[] = []

//     let recommendedMath: string[] = []
//     let recommendedScience: string[] = []
//     let recommendedSocial: string[] = []
//     let recommendedLA: string[] = []

//     let hardMath: string[] = []
//     let hardScience: string[] = []
//     let hardSocial: string[] = []
//     let hardLA: string[] = []

//     let recommendedConsider: string[] = []
//     let stemBasedOnRigor: string[] = []