import type { NextPage } from 'next'
import { Button, Card, Container, Row, Col, ButtonGroup } from 'react-bootstrap'
import styles from '../styles/home.module.css'
import banner from '../assets/banner.png'
import Link from 'next/link'
import { IBM_Plex_Sans } from '@next/font/google'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import Image from 'next/image'
import faq1 from '../assets/faq1.png'
import { useState } from 'react'


const Home: NextPage = () => {

  const [isHovered, setIsHovered] = useState(false);

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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "400px", width:'100vw', marginBottom:'29em', marginTop:'200px' }}>
        <Container fluid style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200%" }}>
          <div style={{ position: "relative", height: "100%", width: "100vw" }}>
            <Image src={banner} alt='banner' style={{ height: "100%", width: "100vw", objectFit:'cover'}} />
            <div className={styles.bannerText} style={{position: "absolute", top: 70, left: 0, height: "100%", width: "100%", display: "flex" , alignItems: "center", justifyContent: "center"}}>
              <h1 style={{ fontSize: "0.7em" }}>
                <b style={{ fontSize: "5.5em" }}>Let&apos;s Rest</b>
                <p style={{ fontSize: "3.5em" }}>We&apos;re on a mission to help every person choose the right schedule.</p>
                <Link href={"/survey"}
                legacyBehavior>
                  <a 
                    className='shadow-lg'
                    style={{ fontSize: "3em" }}
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
        width: '80%',
        margin: 'auto',
        paddingBottom: '150px',
      }}> 
        <h2 className={styles.titleText}
        style={{
          marginBottom:'200px',
          fontSize: '70px',
          fontWeight: 'normal'
        }}
        ><strong>Snooz: </strong>Unsure about your Sleep?</h2>
        <Row style={{
          justifyContent:'center',
          fontSize: '3rem'
        }}>
          Find out your hours!
        </Row>
      </div>
      <div
      style={{
        marginTop: '200px',
        marginBottom: '100px',
        backgroundColor:'#C9F0FF',
        height:'300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
          <div className='display-5'
          style={{width:'70%',
            backgroundColor:'#caf0f8',
            height:'400px',
            position: 'relative',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          }}
          >
            <h1 className='display-1'
            style={{
              marginTop: '100px',
              marginBottom:'20px'
            }}
            >Why Sleep?
            </h1>
                Sleep is single-handedly the most effective way to contribute to our society.<br
              style={{
                marginBottom:'30px'
              }}
              ></br>
                <Link className='display-4' href={'/about'}>
                  About
                </Link>
          </div>
      </div>
    </div>
      
  );
}

export default Home
