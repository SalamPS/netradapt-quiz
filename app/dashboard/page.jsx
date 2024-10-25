/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Link from "next/link";
import LoadingOverlay from "../components/loadingOverlay";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import QuizList from "../components/QuizList";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Info = () => {
  return (<div className="bg-[#00312d] text-white p-[48px] pl-[60px] rounded-[32px] grid grid-cols-1 md:grid-cols-2">
    <div className="inline-block pr-[100px] text-justify">
      <h1 className="text-lg">
        <b>Selamat datang di Quiz !</b>
      </h1>
      <p className="block my-[24px] mb-[32px]">Alat kuis interaktif ini dirancang sebagai media pembelajaran untuk siswa tunanetra. Dengan fitur text-to-speech dan tombol respon yang intuitif, alat ini memungkinkan siswa untuk mendengarkan soal dan menjawab dengan mudah.</p>
      <Link className="px-[24px] py-[12px] bg-[#5ABE22] rounded-2xl duration-200 hover:bg-[#51aa1e]" href="/kuis/new">Buat Kuis Sekarang</Link>
    </div>
    <div className="inline-block bg-[#afc2af] rounded-3xl"></div>
  </div>)
}

export default function Dashboard () {
  const [query, setQuery] = useState({list: [], play: []})
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()

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
    <Navbar title="Quiz" big>
      <Link href={'kuis/new'} className={`menu ml-10 text-[#668381]`}>Buat Kuis</Link>
      <Link href={'kuis'} className={`menu ml-10 text-[#668381]`}>Daftar Kuis</Link>
    </Navbar>

    <div id="dashboard" className="px-[96px] py-[48px]">
      <Info/>
      <QuizList list={query.list} play={query.play}/>
      {!query.list.length ? '' : 
      <div className="mb-[30px] text-center">
        <Link href={'/kuis'} className="px-[32px] py-[12px] rounded-3xl text-white duration-200 bg-[#5abe22] hover:bg-[#51aa1e]">
          Lihat semua
        </Link>
      </div>}
    </div>

    <Footer>
      <b>Quiz. </b>Alat kuis interaktif yang dirancang untuk siswa tunanetra. Dengan fitur text-to-speech dan tombol respon yang intuitif, alat ini memungkinkan siswa untuk mendengarkan soal dan menjawab dengan mudah.
    </Footer>
    <LoadingOverlay isLoading={isLoading} />
  </>)
}