'use client';

import { useState, useEffect } from "react";

export const Clock = () => {


    const [digitalHour, setDigitalHour] = useState<string>('');
    const [digitalMinute, setDigitalMinute] = useState<string>('');
    const [digitalSeconds, setDigitalSeconds] = useState<string>('');
    const [ampm, setAmpm] = useState<string>('');

    useEffect(() => {
        const updateClock = () => {
            let date = new Date()

            let HH: number | string = date.getHours()
            let MM: number | string = date.getMinutes()
            let SS: number | string = date.getSeconds()
            let ampm;

            if (HH >= 12) {
                HH -= 12
                ampm = "PM"
            } else {
                ampm = "AM"
            }

            if (HH === 0) HH = 12
            if (HH < 10) HH = `0${HH}`;
            if (MM < 10) MM = `0${MM}`;
            if (SS < 10) SS = `0${SS}`

            setDigitalHour(HH.toString())
            setDigitalMinute(MM.toString())
            setDigitalSeconds(SS.toString())
            setAmpm(ampm)
        }

        setInterval(updateClock, 1000)

    }, [])



    return (
        <div className="flex flex-col gap-3 items-center">
            <h1 className="text-accents-100 text-2xl">Music Clock Alarm</h1>
            {digitalHour && <p className="text-3xl text-accents-100">{digitalHour}:{digitalMinute}:{digitalSeconds} {ampm}</p>}
        </div>
    )
}