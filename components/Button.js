"use client"

import { useAuth } from '@/context/AuthContext';
import { Fugaz_One } from 'next/font/google'
import React from 'react'

const fugazOne = Fugaz_One({
    variable: "--font-fugaz-one",
    subsets: ["latin"],
    weight: ["400"],
  });

export default function Button(props) {

    const { text, dark, full, clickHandler } = props

    const { isRegister, setIsRegister } = useAuth()

    function clickHandler1() {
        if (text == "Login") {
            setIsRegister(false)
        }
        if (text == "Sign Up") {
            setIsRegister(true)
        }
    }

    return (
        <button onClick={() => {
            if (clickHandler) {
                clickHandler()
            }
            clickHandler1()
        }} className={"rounded-full overflow-hidden border-2 border-solid border-emerald-600 duration-200 hover:opacity-60 hover:cursor-pointer" + (dark ? " text-white bg-emerald-600 " : " text-emerald-600 ") + (full ? " grid place-items-center w-full " : " ")}>
            <p className={"px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 " + fugazOne.className}>{text}</p>
        </button>
    )
}
