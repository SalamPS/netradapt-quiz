/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Navbar from "@/app/components/Navbar"
import { useEffect, useState } from "react"
import LoadingOverlay from "@/app/components/loadingOverlay"
import '@/app/css/report.css'

export default function KuisMulai ({params}) {
  const [kuisData, setKuisData] = useState({
    title: undefined,
    class: undefined,
    plays: undefined
  })
  const [popupContent, setPopupContent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const device = JSON.parse(localStorage.getItem('logged'))
    fetch('/api/kuis/read', {
      method: "POST",
      body: JSON.stringify({kuisId: params.id, deviceId: device.deviceId})
    })
    .then(res => (res.json()))
    .then(res => {
      const answers = res.plays.map((item,i) => {
        return {
          ...item,
          answers: item.answers.split(','),
        }
      })
      answers.sort((a,b) => b.played - a.played)
      setKuisData({...res, plays: answers})
      setIsLoading(false)
    })
    .catch(err => {
      setIsLoading(false)
      err
    })
  }, [])

  const handlePlayClick = (play) => {
    setPopupContent(play)
  }

  const closePopup = () => {
    setPopupContent(null)
  }

  return (<>
    <Navbar active={'kuis'} text={`Report Kuis ${kuisData.title ? '- ' + kuisData.title : ''}`}/>
    <main>
      <div className="playContainer">
        {kuisData.plays?.map((play,i) => {
          const utc7Time = new Date(play.played*1000);          
          const year = utc7Time.getFullYear();
          const month = utc7Time.getMonth() + 1;
          const date = utc7Time.getDate();
          const hours = utc7Time.getHours();
          const minutes = utc7Time.getMinutes();
          const formattedTime = `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

          return (<div className="plays" key={i} onClick={() => handlePlayClick(play)}>
            <div>ID Perangkat: {play.deviceId}</div>
            <div>Waktu Selesai: {formattedTime}</div>
          </div>)
        })}
      </div>
      {popupContent && (
        <div className="popup">
          <div className="popup-content">
            <button onClick={closePopup} className="close">Close</button>
            <div>ID Perangkat: {popupContent.deviceId}</div>
            <div>Waktu Selesai: {new Date(popupContent.played * 1000).toLocaleString()}</div>
            <div className="answers">
              {popupContent.answers.map((answer, index) => {
                const validAnswer = (index < kuisData.questions.length)
                const listed = kuisData.questions[index]
                let ans = '';
                if (answer === 'TRUE') {
                  if (listed?.valid == 'RIGHT')
                    ans = listed?.ansB
                  if (listed?.valid == 'LEFT')
                    ans = listed?.ansA
                }
                if (answer === 'FALSE') {
                  if (listed?.valid == 'RIGHT')
                    ans = listed?.ansA
                  if (listed?.valid == 'LEFT')
                    ans = listed?.ansB
                }

                if (answer.length && validAnswer) return (
                <div key={index} className="list">
                  <span className="head">Pertanyaan {index+1}</span>
                  <span>{listed?.quest}</span>
                  <div className={`answer ${validAnswer && answer}`}>
                    {ans}
                  </div>
                </div>)
              })}
            </div>
          </div>
        </div>
      )}
    </main>
    <LoadingOverlay isLoading={isLoading} />
  </>)
}