/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import QuizProvider from '@/app/components/QuizProvider'
import '@/app/css/quizNew.css'

export default function KuisInfo ({params}) {
  return (<>
    <QuizProvider kuisId={params.id}/>
  </>)
}