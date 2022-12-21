import React from 'react'
import { auth } from '../config/firebase';

const Dashboard = () => {
  return (
    <>
      <div className='dashboardMain'>
        First time using Coursee? Take our survey!<br></br>
        <button className="surveyBtn" role="button">Survey</button>
      </div>
    </>
  )
}


export default Dashboard
