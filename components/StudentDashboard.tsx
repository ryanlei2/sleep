import React from 'react'
import { Container } from 'react-bootstrap'
import Link from 'next/link'
import styles from '../styles/dashboard.module.css'

const StudentDashboard = () => {
  return (
    <Container className={styles.body} style={{
      marginBottom: '900px',
      marginTop: '200px'
    }}>
      <div>
      <Container className='display-3 my-5'>
        <i><b>First</b></i> time using Coursee or having trouble deciding on a path? Take our survey!<br></br>
        <Link href="/survey">
          <button className="surveyBtn" role="button">Survey</button>
        </Link>
      </Container>
    </div>
    </Container>
  )
}

export default StudentDashboard
