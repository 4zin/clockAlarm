'use client'
import { useContext } from "react";
import { AlarmContext } from "./context/ClockContext";
import { Kanit } from 'next/font/google'

const kanit = Kanit({ weight: ['100', '300', '400', '500'], subsets: ['latin'] })

export const Clock = () => {

    const clockContext = useContext(AlarmContext)

    if (clockContext === undefined) {
        throw new Error('clockContext must be used within AlarmProvider')
    }

    const { digitalHour, digitalMinute, digitalSeconds, ampm } = clockContext

    return (
        <div className="flex flex-col gap-3 items-center">
            <h1 className={`bg-gradient-to-r from-[#2e002b] via-[#480043] to-[#6e0067] text-transparent bg-clip-text text-9xl ${kanit.className} antialiased drop-shadow-[3px_3px_1px_rgba(0,0,0,1.0)]`}>Music Clock Alarm</h1>
            {digitalHour && <p className="text-3xl text-accents-100">{digitalHour}:{digitalMinute}:{digitalSeconds} {ampm}</p>}
        </div>
    )
}