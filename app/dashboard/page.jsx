/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Link from "next/link";
import LoadingOverlay from "../components/loadingOverlay";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "@/app/css/dashboard.css"
import QuizList from "../components/QuizList";
import { useEffect, useState } from "react";

const Info = () => {
  return (<div className="info">
    <div className="text">
      <h1>Belajar Interaktif Tunanetra</h1>
      <p>Alat bantu belajar interaktif ini terdiri dari tombol pilihan untuk siswa tunanetra di SLB Cileunyi, menggunakan mikrokontroler Raspberry Pi dan kontrol berbasis web untuk membuat kuis serta menyimpan hasil jawaban siswa.</p>
      <Link href="/kuis/new">Buat Kuis Sekarang</Link>
    </div>
    <div className="img"></div>
  </div>)
}

export default function Dashboard () {
  const [query, setQuery] = useState({list: [], play: []})
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    <Navbar/>

    <div id="dashboard" className="container solid-light">
      <Info/>
      <QuizList list={query.list} play={query.play}/>
      {!query.list.length ? '' : 
      <div className="more">
        <Link href={'/kuis'}>
          Lihat semua
        </Link>
      </div>}
    </div>

    <Footer/>
    <LoadingOverlay isLoading={isLoading} />
  </>)
}