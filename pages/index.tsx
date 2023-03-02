import type { NextPage } from 'next'
import { Button, Card, Container, Row, Col, ButtonGroup } from 'react-bootstrap'
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
        <h2 className="display-4 text-center"
        style={{
          marginBottom:'200px',
          fontSize: '60px'
        }}
        >Unsure about your class selection?</h2>
        <Row style={{
          justifyContent:'center',
        }}>
          <Card className='shadow-lg' border="success" style={{ width: '40rem', marginRight: '100px' }}>
            <Card.Img variant="top" src="#" />
            <Card.Body>
              <Card.Title className='display-6'
              style={{
                fontWeight:'bold'
              }}
              >FAQ</Card.Title>
              <Card.Text style={{
                fontSize:'2.7rem'
              }}>
                Have a question you need answered?
              </Card.Text>
                <Link href="/faq">
                  <Button style={{height: '50px', width: '100px', fontSize: '1.3rem'}} variant="primary">Click Here</Button>
                </Link>
            </Card.Body>
          </Card>
          <Card className='shadow-lg' border="success" style={{ width: '40rem', marginLeft:'100px' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title className='display-6'
              style={{
                fontWeight:'bold'
              }}
              >Catalog</Card.Title>
              <Card.Text style={{
                fontSize:'2.7rem'
              }}>
                Take a look at our course catalog!
              </Card.Text>
              <Link href="/catalog">
                  <Button style={{height: '50px', width: '100px', fontSize: '1.3rem'}} variant="primary">Click Here</Button>
                </Link>
            </Card.Body>
          </Card>
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
            >Why Coursee
            </h1>
              Coursee is a streamlined and free way of choosing your courses without any external guidance. <br
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
