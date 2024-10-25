/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import '@/app/css/quizNew.css'
import Navbar from "@/app/components/Navbar"
import QuizQuest from "@/app/components/QuizQuest"
import QuestNew, {inputHandler, insertHandler, spliceHandler} from "@/app/components/QuestProp";
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingOverlay from './loadingOverlay';

const QuizContext = createContext({})
export const QuizProps = () => {
  return useContext(QuizContext)
}

export default function QuizProvider ({kuisId}) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true);
  const [deleted, setDeleted] = useState([])
  const [editable, setEditable] = useState(kuisId ? false : true)
  const [kuisData, setKuisData] = useState({
    title: '',
    class: '',
    questions: []
  })
  const [error, setError] = useState('') // State untuk pesan kesalahan
  const [showPopup, setShowPopup] = useState(false) // State untuk visibilitas popup

  const navbarActions = [
    {
      type: 'save',
      text: kuisId ? 'Riwayat Kuis' : 'Simpan Kuis',
      action: () => {
        if (kuisId) router.push(`report`)
        else {
          setIsLoading(true)
          if (!validateInputs()) return; // Validasi input sebelum menyimpan
          const logged = JSON.parse(localStorage.getItem('logged'))
          fetch(`/api/kuis/create`, {
            method: "POST",
            body: JSON.stringify({
              deviceId: logged.deviceId,
              questions: kuisData.questions,
              title: kuisData.title,
              Class: kuisData.class,
              updated: new Date().getTime() 
            })
          }).then(res => {
            setIsLoading(false)
            if (!res.ok) throw new Error
            return res.json()
          })
          .then(res => {
            setKuisData(res)
            router.push(`/kuis`)
          })
          .catch(err => err)
        }
      }
    }
  ]

  useEffect(() => {
    if (kuisId) {
      fetch(`/api/info`, {
        method: "POST",
        body: JSON.stringify({kuisId})
      }).then(res => {
        if (!res.ok) throw new Error
        return res.json()
      })
      .then(res => {
        setIsLoading(false)
        setKuisData(res)
      })
      .catch(err => setIsLoading(false))
    }
    else setIsLoading(false)
  }, [])
  
  const validateInputs = () => {
    let error = false
    if (kuisData.questions.length) {
      kuisData.questions.forEach(item => {
        if (item.quest.length < 1 || item.ansA.length < 1 || item.ansB.length < 1) error = true
      })
    }
    if (kuisData.title.length < 1 || kuisData.class.length < 1) error = true
    if (error) {
      setError('Input tidak boleh kurang dari 1 karakter.')
      setShowPopup(true)
      return false
    }
    return true
  }

  const headerInputHandler = (key, value) => {
    const updated = {...kuisData}
    updated[key] = value
    setKuisData(updated)
  }

  const editSaveHandler = (e) => { 
    e.preventDefault(); 
    if (editable) {
      if (kuisId) {
        if (!validateInputs()) return; 
        setIsLoading(true)
        fetch(`/api/kuis/update`, {
          method: "PUT",
          body: JSON.stringify({data: kuisData, deleted})
        }).then(res => {
          setIsLoading(false)
          if (!res.ok) throw new Error
        })
        .catch(err => err)
      }
    }
    setEditable(!editable);
  }

  return (
  <QuizContext.Provider
    value={{kuisData, setKuisData, editable, setEditable, setDeleted}}>
    <Navbar active={'kuis'} title={kuisId ? 'Edit Kuis' : 'Buat Kuis'} actions={navbarActions}/>
    <main>
      <form>
        <div id="head" className="container">
          <div className="title">
            {editable ? 
            <input 
              type="text" 
              name="title"
              value={kuisData.title}
              onChange={(e) => {headerInputHandler(e.target.name, e.target.value)}}
              placeholder={kuisData.title ? kuisData.title : "Judul Kuis"} 
              required/> 
            : 
            <h3>{kuisData.title}</h3>}
          </div>
          <div className="class">
            {editable ? 
            <input 
              type="text" 
              name="class"
              value={kuisData.class}
              onChange={(e) => {headerInputHandler(e.target.name, e.target.value)}}
              placeholder={kuisData.class ? kuisData.class : "Kelas"} 
              required/> 
            : 
            <h3>Kelas {kuisData.class}</h3>}
          </div>
          {kuisId ? <button className='edit' onClick={(e) => {editSaveHandler(e)}}>
            {!editable ? 'Edit' : 'Save'}
          </button> : ""}
        </div>
        <div id="body">
          <QuizQuest 
            data={kuisData} 
            input={inputHandler} 
            splice={spliceHandler}/>
          {editable ? <QuestNew action={() => {insertHandler(kuisData, setKuisData)}}/> : ''}
        </div>
      </form>
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Input tidak valid</h2>
            <p>{error}</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </main>
    <LoadingOverlay isLoading={isLoading} />
  </QuizContext.Provider>)
}