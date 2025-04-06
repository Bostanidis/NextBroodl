"use client"
import { Fugaz_One } from 'next/font/google';
import React, { useEffect, useState } from 'react'
import Calendar from './Calendar';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Loading from './Loading';
import Login from './Login';


const fugazOne = Fugaz_One({
  variable: "--font-fugaz-one",
  subsets: ["latin"],
  weight: ["400"],
});

export default function Dashboard() {

  const now = new Date()

  const { currentUser, userDataObject, setUserDataObject, loading } = useAuth()
  const [data, setData] = useState({})

  function countValues() {
    let total_number_of_days = 0
    let sum_moods = 0
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_mood = data[year][month][day]
          total_number_of_days++
          sum_moods += days_mood
        }
      }
    }
    return {num_days: total_number_of_days, average_mood: sum_moods / total_number_of_days}
  }

  const statuses = {

    ...countValues(),
    time_remaining: `${23-now.getHours()}H ${60-now.getMinutes()}M`
  }

  async function handleSetMood(mood) {


    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

    try {
      const newData = { ...userDataObject }
      if (!newData?.[year]) {
        newData[year] = {}
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {}
      }
  
      newData[year][month][day] = mood
      // update the current state
      setData(newData)
      // update the global state
      setUserDataObject(newData)
      // update firebase
      const docRef = doc(db, "users", currentUser.uid)
      const res = await setDoc(docRef, {
        [year]: {
          [month]: {
            [day]: mood
          }
        }
      }, { merge: true })
    } catch (err) {
      console.log("Failed to set data: ", err.message)
    }

    
  }



  const moods = {
    "Awful": "😭",
    "Sad": "😢",
    "Normal": "😐",
    "Good": "😊",
    "Excellent": "😍",
  }

  useEffect(() => {
    if (!currentUser || !userDataObject) {
      return
    }

    setData(userDataObject)


  }, [currentUser, userDataObject])

    if (!currentUser) {
      return <Login />
    }

    if (loading) {
      return <Loading />
    }


  return (
    <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
        <div className='grid grid-cols-3 bg-emerald-50 textemeraldld-500 rounded-lg'>
          {Object.keys(statuses).map((status, statusIndex) => {
            return (
              <div key={statusIndex} className='p-4 flex flex-col gap-1 sm:gap-2'>

                <p className='font-medium capitalize text-xs sm:text-sm truncate '>{status.replaceAll("_", " ")}</p>

                <p className={"text-base sm:text-lg truncate " + fugazOne.className}>{statuses[status]}{status === "num_days" ? " 🔥" : ""}</p>

              </div>
            )
          })}
        </div>
        <h4 className={"text-center text-5xl sm:text-6xl md:text-7xl " + fugazOne.className}>
          How do you <span className='textGradient'>feel</span> today?
        </h4>

        <div className='grid grid-cols-2 sm:grid-cols-5 gap-4'>
          {Object.keys(moods).map((mood, moodIndex) => {
            return (
              <button onClick={() => {
                const currentMoodValue = moodIndex + 1
                handleSetMood(currentMoodValue)
              }} className={"p-4 px-5 rounded-2xl purpleShadow duration-200 bg-emerald-50 hover:bgemeraldld-100 text-center " + (moodIndex === 4 ? " col-span-2 sm:col-span-1  " : " ")} key={moodIndex}>
                <p className='text-4xl sm:text-5xl md:text-6xl'>{moods[mood]}</p>
                <p className={"text-emerald-500 text-xs sm:text-sm md:text-base pt-4 " + fugazOne.className}>{mood}</p>
              </button>
            )
          })}
        </div>
        <Calendar completeData={data} handleSetMood={handleSetMood}/>
    </div>
  )
}
