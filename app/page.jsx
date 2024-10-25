'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import LoadingOverlay from "./components/loadingOverlay";

export default function Home() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [errorText, setErrorText] = useState("")
  const [login, setLogin] = useState({
    username: '',
    password: ''
  })

  const handleInput = (name, value) => {
    setErrorText("")
    setLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const startLogin = () => {
    setIsLoading(true)
    fetch('/api/auth', {
      method: "POST",
      body: JSON.stringify({target: "login", deviceId:login.username, password:login.password})
    }).then(res => {
      if (!res.ok) throw res
      return res.json()
    })
    .then(res => localStorage.setItem('logged', JSON.stringify(res)))
    .then(() => {
      router.push('/dashboard')
    })
    .catch(err => {
      setIsLoading(false)
      if (err.status === 401) setErrorText("Username atau password salah!")
      else if (err.status === 500) setErrorText("Gagal login. Silahkan coba lagi nanti!")
    })
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (<>
    <LoadingOverlay isLoading={isLoading}/>
    <div id="login" className="bg-[#afc2af] h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="bg-[#00312d] text-white p-[36px] rounded-[24px] w-[30vw]">
        <h1 className="title text-center mb-[36px] text-2xl text-[#5abe22]">Netradapt</h1>
        
        <form className="bg-[#00312d]">
          <label htmlFor="id">
            <div className="text-sm ml-2">Username</div>
            <input 
              type="text" 
              name="username"
              className="input-default"
              value={login.username}
              onChange={(e) => handleInput(e.target.name, e.target.value)}
            />
          </label>

          <label htmlFor="password">
            <div className="text-sm ml-2">Password</div>
            <input 
              type="password" 
              name="password"
              className="input-default"
              value={login.password}
              onChange={(e) => handleInput(e.target.name, e.target.value)}
            />
          </label>
          <p className="text-xs text-right cursor-pointer">Forgot Password?</p>

          <div className="bg-[#5abe22] mt-[24px] mb-[8px] rounded-2xl text-center px-4 py-2 cursor-pointer duration-200 hover:bg-[#51aa1e]" onClick={startLogin}>
            <h4>Login</h4>
          </div>
          <p className="text-sm text-center text-[#ff9587]">{errorText}</p>
          </form>
      </div>
    </div>
  </>);
}
