import React, { useState } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { saveUserFeedback } from '../config/firebase';
import {
  easyMathClasses,
  easyScienceClasses,
  easySocialClasses,
  easyLAClasses,
  recommendedMathClasses,
  recommendedScienceClasses,
  recommendedSocialClasses,
  recommendedLAClasses,
  hardMathClasses,
  hardScienceClasses,
  hardSocialClasses,
  hardLAClasses,
  recommendedClassesConsider,
  stemChoicesBasedOnRigor
} from '../components/SurveyComp';
import { useLocation } from 'react-router-dom';


const Results = () => {
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
                <td>{recommendedMathClasses.join(", ")}</td>
                <td>{hardMathClasses.join(", ")}</td>
                <td>{easyMathClasses.join(", ")}</td>
              </tr>
              <tr>
                <td>Science</td>
                <td>{recommendedScienceClasses.join(", ")}</td>
                <td>{hardScienceClasses.join(", ")}</td>
                <td>{easyScienceClasses.join(", ")}</td>
              </tr>
              <tr>
                <td>Social</td>
                <td>{recommendedSocialClasses.join(", ")}</td>
                <td>{hardSocialClasses.join(", ")}</td>
                <td>{easySocialClasses.join(", ")}</td>
              </tr>
              <tr>
                <td>LA</td>
                <td>{recommendedLAClasses.join(", ")}</td>
                <td>{hardLAClasses.join(", ")}</td>
                <td>{easyLAClasses.join(", ")}</td>
              </tr>
              <tr>
                <td>STEM</td>
                <td>{stemChoicesBasedOnRigor.join(", ")}</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Classes to Consider:</td>
                <td>{recommendedClassesConsider.join(", ")}</td>
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
