import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'

const NavbarComp = () => {
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <Navbar bg = "light" expand = "lg">
      <Container>
        <Link href="/" passHref>
          <Nav.Link><img src='https://i.imgur.com/yVyveSz.png' width="50px" height="50px"></img>&emsp;</Nav.Link>
        </Link>
        <Link href="/dashboard" passHref>
          <Nav.Link>Dashboard&emsp;&emsp;</Nav.Link>
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
                <Link href="/signup" passHref>
                  <Nav.Link>Signup&emsp;&ensp;</Nav.Link>
                </Link>
                <Link href="/login" passHref>
                  <Nav.Link>Login</Nav.Link>
                </Link>
                
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComp
