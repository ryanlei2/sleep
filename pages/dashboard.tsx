import React from 'react'
import { auth } from '../config/firebase';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
const Dashboard = () => {
  return (
    <div className="bodyText">
      <Container className="mx-auto">
        <i><b>First</b></i> time using Coursee or having trouble deciding on a path? Take our survey!<br></br>
        <a href="/survey">
          <button className="surveyBtn" role="button">Survey</button>
        </a>
      </Container>
    </div>
      
  )
}


export default Dashboard
