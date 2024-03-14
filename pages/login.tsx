import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'


const Login = () => {
  const router = useRouter()
  const { user, login } = useAuth()
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleLogin = async (e: any) => {
    e.preventDefault()

    console.log(user)
    try {
      await login(data.email, data.password)
      router.push('/dashboard')
    } catch (err :any) {
      if (err.code === 'auth/user-not-found') {
        window.alert('Email address not found')
      } else if (err.code === 'auth/wrong-password') {
        window.alert('Incorrect password')
      } else {
        console.log(err)
      }
    }
  }

  return (
    <div
      style={{
        width: '40%',
        margin: 'auto',
        fontSize: '2vmax',
        marginTop: '150px',
        marginBottom: '250px'
      }}
    >
      <h1 className="text-center my-3 display-3 ">Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
          style={{ height: '50px', fontSize:'20px' }}
            onChange={(e: any) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
            value={data.email}
            required
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
          style={{ height: '50px', fontSize:'20px' }}
            onChange={(e: any) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
            value={data.password}
            required
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit"
        style={{ height: '40px', fontSize:'20px', marginTop:'30px', marginBottom:'15px' }}
        >
          Login
        </Button>
      </Form>
      <hr></hr>
      <p>New to Snooz? <Link href='/signup'>Sign Up</Link></p>
      <Button href='PasswordResetForm'
      style={{ height: '40px', fontSize:'20px'}}
      >Forgot Password?</Button>

    </div>
  )
}

export default Login
