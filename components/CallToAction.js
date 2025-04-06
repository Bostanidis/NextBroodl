"use client"

import React from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function CallToAction() {

    const { currentUser, isRegister, setIsRegister } = useAuth()

    if (currentUser) {
        return (
            <div className='mx-auto max-w-[600px] w-full'>
                <Link href={"./dashboard"}>
                    <Button full dark text="Go to dashboard" />
                </Link>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
            <Link href="/dashboard">
                <Button text="Sign Up"/>
            </Link>

            <Link href="/dashboard">
                <Button text="Login" dark />
            </Link>
        </div>
    )
}
