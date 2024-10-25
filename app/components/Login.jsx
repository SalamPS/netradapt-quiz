'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Login () {
  const router = useRouter()

  const [login, setLogin] = useState({
    deviceId: '',
    password: ''
  })

  const handleInput = (name, value) => {
    setLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const startLogin = () => {
    fetch('/api/auth', {
      method: "POST",
      body: JSON.stringify({target: "login", deviceId:login.deviceId, password:login.password})
    }).then(res => {
      if (!res.ok) throw new Error
      return res.json()
    })
    .then(res => localStorage.setItem('logged', JSON.stringify(res)))
    .then(() => router.push('/dashboard'))
    .catch(err => err)
  }

  return (
    <form>
      <label htmlFor="id">
        <div>Device ID</div>
        <input 
          type="text" 
          name="deviceId"
          id="deviceId" 
          value={login.deviceId}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
      </label>

      <label htmlFor="password">
        <div>Password</div>
        <input 
          type="password" 
          name="password"
          id="password" 
          value={login.password}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
      </label>

      <div id="submit" onClick={startLogin}>
        <h4>Login</h4>
      </div>
    </form>
  )
}