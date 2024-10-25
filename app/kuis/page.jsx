'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from "../components/Navbar";
import QuizList from "../components/QuizList";
import LoadingOverlay from "../components/loadingOverlay";
import '@/app/css/kuis.css'


export default function Kuis ({params}) {
  const [query, setQuery] = useState({list: [], play: []})
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const data = JSON.parse(localStorage.getItem('logged'))

    fetch(`/api/list`, {
      method: "POST",
      body: JSON.stringify({deviceId: data.deviceId})
    }).then(res => {
      if (!res.ok) throw new Error
      return res.json()
    })
    .then(res => {
      setQuery(res);
      setIsLoading(false);
    })
    .catch(err => {
      setIsLoading(false);
      err;
    })
  }, [])

  return (<>
    <Navbar active={'kuis'} text={'Daftar Kuis'}/>

    <main>
      <Link id="create" href={'kuis/new'}>
        <i className="bi bi-plus-circle-fill"></i>
      </Link>
      <QuizList list={query.list} play={query.play}/>
    </main>
    <LoadingOverlay isLoading={isLoading} />
  </>)
}