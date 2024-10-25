'use client'
import '@/app/css/quizQuest.css'
import { useEffect, useState } from 'react'
import { QuizProps } from './QuizProvider'

const Quest = ({i, item, input, splice}) => {
  const bench = 'Masukkan soal di sini ...'
  const { kuisData, setKuisData, editable, setDeleted } = QuizProps()

  useEffect(() => {
    if (item.quest == bench) setEdit(i)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCheckboxChange = (index, value) => {
    const updated = [...kuisData.questions]
    updated[index].valid = value
    setKuisData({
      ...kuisData,
      questions: updated
    })
  }

  return (<>
    <div className={`top ${editable ? 'edit' : ''}`}>
      <div className="block quest">
        Pertanyaan {i+1}
      </div>
      <div className="block action">
        {!editable ? '' : <div 
          className={`bi delete bi-trash3-fill`}
          onClick={() => {splice(kuisData, setKuisData, i, item.questionsId, setDeleted)}}
        />}
      </div>
    </div>
    <div className="mid">
      <textarea 
        name="quest"
        readOnly={!editable}
        contentEditable={editable} 
        onChange={(e) => {input(kuisData, setKuisData, i, e.target.name, e.target.value)}} 
        value={item.quest}/>
    </div>
    <div className="bot">
      <div className={`answer ${item.valid === 'LEFT' ? 'left' : 'right'} LEFT`}>
        <input 
          type="checkbox" 
          checked={item.valid === 'LEFT'}
          onChange={() => handleCheckboxChange(i, 'LEFT')}
          disabled={!editable}
        />
        <input 
          type="text" 
          name="ansA"
          readOnly={!editable}
          contentEditable={editable} 
          onChange={(e) => {input(kuisData, setKuisData, i, e.target.name, e.target.value)}} 
          value={item.ansA}/>
      </div>
      <div className={`answer ${item.valid === 'RIGHT' ? 'left' : 'right'} RIGHT`}>
        <input 
          type="checkbox" 
          checked={item.valid === 'RIGHT'}
          onChange={() => handleCheckboxChange(i, 'RIGHT')}
          disabled={!editable}
        />
        <input 
          type="text" 
          name="ansB"
          readOnly={!editable}
          contentEditable={editable} 
          onChange={(e) => {input(kuisData, setKuisData, i, e.target.name, e.target.value)}} 
          value={item.ansB}/>
      </div>
    </div>
  </>)
}

export default function QuizQuest ({input, splice}) {
  const { kuisData } = QuizProps()
  return (<>
    {kuisData?.questions?.map((item, i) => (
      <div className="container question" key={i}>
        <Quest 
          i={i}
          item={item} 
          input={input} 
          splice={splice} 
        />
      </div>
    ))}
  </>)
}