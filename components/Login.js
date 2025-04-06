"use client"

import { Fugaz_One } from 'next/font/google';
import React, { useState } from 'react'
import Button from './Button';
import { useAuth } from '@/context/AuthContext';

const fugazOne = Fugaz_One({
  variable: "--font-fugaz-one",
  subsets: ["latin"],
  weight: ["400"],
});

export default function Login(props) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authenticating, setAuthenticating] = useState(false)

  const { signup, login, clickHandler, isRegister, setIsRegister } = useAuth()

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return
    }

    setAuthenticating(true)
    try {

      if (isRegister) {
        console.log("Signing up a new user")
        await signup(email, password)
      } else {
        console.log("Logging in as existing client")
        await login(email, password)
      }
    } catch(err) {
      console.log(err.message)
    } finally {
      setAuthenticating(false)
    }
  }

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      
      
      <h3 className={"text-4xl sm:text-5xl md:text-6xl " + fugazOne.className}>{isRegister ? "Register" : "Login"}</h3>
      <p>You&#39;re one step away!</p>
      
      
      <input value={email} onChange={(e) => {
        setEmail(e.target.value)
      }} className='w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-emerald-400 rounded-full outline-none duration-200 hover:bordeemeraldldld-600 focus:boremeraldaldald-600' placeholder='Email'/>
      
      
      <input value={password} onChange={(e) => {
        setPassword(e.target.value)
      }} className='w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-emerald-400 rounded-full outline-none duration-200 hover:bordeemeraldldld-600 focus:boremeraldaldald-600' placeholder='Password'/>
      
      
      <div className='max-w-[400px] w-full mx-auto'>
        <Button clickHandler={handleSubmit} text={authenticating ? "Submitting" : "Submit"} full/>
      </div>
    
      <p className='text-center'>{isRegister ? "Already have an account? " : "Don't have an account? "}
        <button onClick={() => {
        setIsRegister(!isRegister)
      }} className='text-emerald-600'>{isRegister ? "Sign in" : "Sign up"}
      </button>
      </p>
     
    </div>
  )
}
