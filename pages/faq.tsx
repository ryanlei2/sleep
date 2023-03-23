import React from 'react'
import { Container } from 'react-bootstrap'

const Faq = () => {  return (
    <Container>
      <h1
      style={{
        textAlign:'center',
        fontSize: '5rem',
        marginTop:'150px'
      }}
      >Frequently Asked Questions</h1>
      <div style={{
        fontSize: '2.2rem'
      }}>
        <h1 style={{
          marginTop:'70px',
        }}><b>Q:</b> Why are some classes the same for some difficulties?</h1>
        <p><b>A:</b> In our opinion, the first two years of high school are the most important, as they set up the foundation for the tougher classes such as calculus, or other ap sciences. For example, intro to chem is stellar foundational science class to begin with, as you learn basic concepts to prepare you for both AP chem and AP bio. </p>
      </div>
    </Container>
  )
}

export default Faq