import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import Image from 'next/image';
import favicon from '../assets/favicon.ico'
import styles from '../styles/navbar.module.css'

const NavbarComp = () => {
  const { user, logout } = useAuth()
  const router = useRouter()

  return (

      <Navbar expand="xl" sticky='top' className={styles.navBar}>
        <Link href="/"  passHref legacyBehavior>
          <Nav.Link className='ms-5 me-5'
          // style={{
          //   marginLeft:'50px',
          //   // marginRight:'70px',
          // }}
          > 
            <Image 
            className='my-5 me-5'
              width="100" height="100"
              src={favicon}
              alt='logo'
            />
          </Nav.Link>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
          <Nav
          >
            {user ? (
              <Nav.Item className="ms-auto display-5">
                <Nav.Link className='me-5'
                  onClick={() => {
                    router.push('/dashboard')
                  }}
                >
                  dashboard
                </Nav.Link>
              </Nav.Item>
            ) : (
              <>
              </>
            )}
          </Nav>
          {/* dont use emsp make this css (you know how) */}

        <Nav className='container-fluid'>
            {user ? (
              <>
              </>//if not logged in show btn
            ) : (
              <>
                <Nav.Item className='display-5 ms-auto'>
                  <Nav.Link href='/about' className='ms-5' aria-current="page">
                    about
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
        </Nav>
        <Nav className='container-fluid'>
            {user ? (
              <>
              </>//if not logged in show btn
            ) : (
              <>
                <Nav.Item className='display-5 ms-auto'>
                  <Nav.Link href='/faq' className='me-5' aria-current="page"
                  >
                    FAQ
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
        </Nav>
        <Nav className='container-fluid'>
          {user ? (
            <Nav.Item className="ms-auto display-5">
              <Nav.Link className='ms-5'
                onClick={() => {
                  logout()
                  router.push('/login')
                }}
              >
                logout
              </Nav.Link>
            </Nav.Item>
          ) : (
            <>
              <Nav.Item className='ms-auto display-5'>
                <Nav.Link href='/login' className='ms-5 me-5' aria-current="page"
                // style={{
                //   marginRight:'50px',
                //   // marginLeft:'70px',
                // }}
                >
                  login
                </Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav> 
          </Navbar.Collapse>
    </Navbar>
    // </div>
  );
}

export default NavbarComp
