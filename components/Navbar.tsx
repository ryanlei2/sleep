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
          <Nav.Link className=''>
            <Image 
            className='me-5'
              width="80" height="80"
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
                <Nav.Link className='' 
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
        <Nav className='container-fluid'>
            {user ? (
              <>
              </>//if not logged in show btn
            ) : (
              <>
                <Nav.Item className='display-5 ms-auto'>
                  <Nav.Link href='/about' className='' aria-current="page">
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
                  <Nav.Link href='/faq' className='' aria-current="page"
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
              <Nav.Link className=''
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
                <Nav.Link href='/login' className='' aria-current="page">
                  login
                </Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav> 
          </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComp
