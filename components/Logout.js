"use client"

import React from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'
import { usePathname } from 'next/navigation'

export default function Logout() {

    const { logout, currentUser } = useAuth()

    const pathName = usePathname()

    console.log(pathName)

    if (!currentUser) {
        return null
    }

    if (pathName === "dashboard") {
        return (
            <Link href={"/dashboard"}>
                <Button text="Go to dashboard" />
            </Link>
        )
    }

    return (
        <Button text="Logout" clickHandler={logout}/>
    )
}
