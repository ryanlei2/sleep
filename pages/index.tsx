import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Container } from 'react-bootstrap'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className='indexContainer'>
      <Container className="mx-auto">
        <p></p>
      <h1 className={styles.heading}>Coursee -- Welcome!<br></br><br></br></h1>
      <h2>What is Coursee?</h2>
      <p></p>
      <p>Coursee is a website designed to help student choose courses based on a set path of any STEM variant.</p>
      <h3>Why was it created?</h3>
      <p>We wanted to help new students who were unsure about the best route to success in their high school career.</p>
      </Container>
    </div>
  )
}

export default Home
