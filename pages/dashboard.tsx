import React from 'react'
import { auth } from '../config/firebase';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import styles from '../styles/dashboard.module.css'
import Link from 'next/link';
const Dashboard = () => {
  return (
    <div className={styles.body}>
      <Container>
        <i><b>First</b></i> time using Coursee or having trouble deciding on a path? Take our survey!<br></br>
        <Link href="/survey">

          <button className="surveyBtn" role="button">Survey</button>

        </Link>
        
      </Container>
    </div>
  );
}


export default Dashboard
