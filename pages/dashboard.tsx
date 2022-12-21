import React from 'react'
import { auth } from '../config/firebase';

const Dashboard = () => {
  return (
    <>
      <div className='dashboardMain'>
        <i><b>First</b></i> time using Coursee or having trouble deciding on a path? Take our survey!<br></br>
        <a href="/survey">
          <button className="surveyBtn" role="button">Survey</button>
        </a>
      </div>
    </>
  )
}


export default Dashboard
