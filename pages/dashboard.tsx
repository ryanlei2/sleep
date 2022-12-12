import React from 'react'
import { auth } from '../config/firebase';

const Dashboard = () => {
  return (
    <>
      <div className='container'>First time using Coursee? Take a survey!</div><style jsx>{`
            .container {
              margin: 50px;
            }
            div {
              color: green;
            }
          `}</style>
    </>
  )
}


export default Dashboard
