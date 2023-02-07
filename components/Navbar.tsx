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
    <Navbar className={styles.navbar} expand = 'lg'>
      <Container>
        <Link href="/" className={styles.logo} passHref legacyBehavior>
          <Navbar.Brand>
            <Image 
              src={favicon}
              alt='logo'
              width={70}
              height={70}
              
            />
            </Navbar.Brand>
        </Link>
        <Link href="/dashboard" passHref legacyBehavior>
          <Nav.Link
          >
            {user ? (
              <Nav.Item className="ms-auto">
                <Nav.Link
                  onClick={() => {
                    router.push('/dashboard')
                  }}
                >
                  Dashboard
                </Nav.Link>
              </Nav.Item>
            ) : (
              <>
              </>
            )}
          </Nav.Link>
          {/* dont use emsp make this css (you know how) */}
        </Link>
        <Link href="/dashboard" passHref legacyBehavior>
          <Nav.Link>
              about
          </Nav.Link>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='container-fluid'>
            {user ? (
              <Nav.Item className="ms-auto">
                <Nav.Link
                  onClick={() => {
                    logout()
                    router.push('/login')
                  }}
                >
                  Logout
                </Nav.Link>
              </Nav.Item>
            ) : (
              <>
                <Nav.Item className='ms-auto'>
                  <Nav.Link href='/login'>
                    Login
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp
