import React from 'react'
import { auth } from '../config/firebase';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import styles from '../styles/dashboard.module.css'
import Link from 'next/link';
const Dashboard = () => {
  return (
    <div className="bodyText">
      <Container>
        <i><b>First</b></i> time using Coursee or having trouble deciding on a path? Take our survey!<br></br>
        <Link href="/survey">
          <a>
          <button className="surveyBtn" role="button">Survey</button>
          </a>
        </Link>
        
      </Container>
    </div>
      
  )
}


export default Dashboard
