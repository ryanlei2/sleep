import Link from 'next/link'
import React from 'react'
import { Container } from 'react-bootstrap'
import SurveyComp from '../components/SurveyComp'


export default function Survey() {
  return (
    <Container className="mx-auto">
      <SurveyComp />
      {/* link to results template to paste into survey complete in SurveyJS */}
    </Container>
  )
}

// (onSurveyComplete do this return button and send results)


