"use client"


import React, { useState, useEffect } from 'react'
import { gradients } from '@/utils'
import { baseRating } from '@/utils'
import { demoData } from '@/utils'
import { Fugaz_One } from 'next/font/google'

const fugazOne = Fugaz_One({
    variable: "--font-fugaz-one",
    subsets: ["latin"],
    weight: ["400"],
  });


const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
    
    
const monthsArr = Object.keys(months)
const now = new Date()
const dayList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


export default function Calendar(props) {

    const { demo, completeData, handleSetMood } = props

    const now = new Date()
    const currentMonth = now.getMonth()
    const [selectedMonth, setSelectedMonth] = useState(Object.keys(months)[currentMonth])

    const [selectedYear, setSelectedYear] = useState(now.getFullYear())

    const numericMonth = Object.keys(months).indexOf(selectedMonth)
    const data = completeData?.[selectedYear]?.[numericMonth] || {}
    function handleIncrementMonth(val) {
        // value +1 -1
        // if we hit the bounds of the months, then we can just adjust the year that is displayed
        if (numericMonth + val < 0) {
            setSelectedYear(curr => curr - 1)
            setSelectedMonth(monthsArr[monthsArr.length - 1])
        } else if (numericMonth + val > 11) {
            setSelectedYear(curr => curr + 1)
            setSelectedMonth(monthsArr[0])
        } else {
            setSelectedMonth(monthsArr[numericMonth + val])
        }

    }
    
    const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1)

    let firstDayOfMonth = monthNow.getDay()

    if (firstDayOfMonth === 0) {
        firstDayOfMonth = 6
    } else {
        firstDayOfMonth -= 1
    }

    const daysInMonth = new Date(selectedYear, Object.keys(selectedMonth).indexOf(selectedMonth) + 1, 0).getDate()

    const daysToDisplay = firstDayOfMonth + daysInMonth

    const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex justify-between items-center gap-4'>
                <button onClick={() => {
                    handleIncrementMonth(-1)
                }} className='text-emerald-500 text-lg sm:text-xl duration-200 hover:opacity-60'><i className='fa-solid fa-circle-chevron-left'></i></button>
                <p className={'text-center capitalize textGradient text-lg sm:text-xl ' + fugazOne.className}>{selectedMonth}, {selectedYear}</p>
                <button onClick={() => {
                    handleIncrementMonth(+1)
                }} className='text-emerald-500 text-lg sm:text-xl duration-200 hover:opacity-60'><i className='fa-solid fa-circle-chevron-right'></i></button>
            </div>
            <div className='flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10'>
                {[...Array(numRows).keys()].map((row, rowIndex) => {
                    return (                  
                        <div key={rowIndex} className='grid grid-cols-7 gap-1'>
                            {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                                let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)
                                
                                let dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true
                                
                                let isToday = 
                                    !demo &&
                                    dayIndex === now.getDate() &&
                                    numericMonth === now.getMonth() &&
                                    selectedYear === now.getFullYear();

                                if (!dayDisplay) {
                                    return (
                                        <div className='bg-white' key={dayOfWeekIndex}>

                                        </div>
                                    )
                                }

                                let color = demo ?
                                        gradients.green[baseRating[dayIndex]] :
                                        dayIndex in data ?
                                            gradients.green[data[dayIndex]] :
                                            'white'

                                return (
                                    <div style={{background: color}}className={"text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg " + (isToday ? " border-emerald-400" : " border-emerald-200") + (color === "white" ? " text-emerald-400" : " text-white")} key={dayOfWeekIndex}>
                                        <p className='font-semibold'>{dayIndex}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}  
            </div>
        </div>
    )
}
