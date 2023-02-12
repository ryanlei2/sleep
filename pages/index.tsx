import type { NextPage } from 'next'
import { Button, Card, Container, Row, Col} from 'react-bootstrap'
import styles from '../styles/home.module.css'
import banner from '../assets/banner.png'
import Link from 'next/link'
import { IBM_Plex_Sans } from '@next/font/google'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Home: NextPage = () => {
  function handleClick() {
    console.log('increment like count');
  }
  const { user, logout } = useAuth()
  const router = useRouter()

  try {
    // Your code to display the image
  } catch (error) {
    console.error(error);
  }
  return (
    <div className='text-center'>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "400px", width:'100vw', marginBottom:'29em' }}>
        <Container fluid style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200%" }}>
          <div style={{ position: "relative", height: "100%", width: "100vw" }}>
            <Image src={banner} alt='banner' style={{ height: "100%", width: "100vw", objectFit:'cover'}} />
            <div style={{ position: "absolute", top: 70, left: 0, height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <h1 style={{ fontSize: "0.7em" }}>
                <b style={{ fontSize: "5.5em" }}>Let&apos;s Plan Together</b>
                <p style={{ fontSize: "3.5em" }}>We&apos;re on a mission to help every student choose the right path.</p>
                <Link href={"/survey"}
                legacyBehavior>
                  <a style={{ fontSize: "3em" }}
                    onClick={() => {
                      {user ? (
                        router.push('/survey')
                      ) : (
                        router.push('/signup')
                      )}
                        
                      }} 
                  >Get Started</a>
                </Link>
              </h1>
            </div>
          </div>
        </Container>
      </div>
      <div
      style={{
        width: '100%',
        margin: 'auto',
      }}> 
        <h2 className="display-1 text-center"
        style={{
          marginBottom:'90px'
        }}
        >Unsure about your class selection?</h2>
        <div className={styles.buttonsContainer}>
          <Button className={styles.button}>Course Catalog</Button>
          <Button className={styles.button2}>FAQ</Button>
        </div>
      </div>
    </div>
      
  );
}

export default Home
