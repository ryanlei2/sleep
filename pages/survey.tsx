import React from 'react'
import SurveyComp from '../components/SurveyComp'

export default function Survey() {
  return (
    <SurveyComp />
  )
}

// TODO
// questionaire whereby choosing specific answers leads to a small handful of career options, upon choosing one user will be redirected to variety of classes to pick

// ALSO create admin role with elevated privileges to input classes
// implemenation idea: check if user has a certain ID token, if so, give access to them by their token

