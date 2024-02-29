'use client'
import { useContext, useState, useEffect } from "react";
import { AlarmContext } from "./context/ClockContext";

export const Clock = () => {

    // const [alarmConfig, setAlarmConfig] = useState<boolean>(false)

    const clockContext = useContext(AlarmContext)

    if (clockContext === undefined) {
        throw new Error('clockContext must be used within AlarmProvider')
    }

    const { digitalHour, digitalMinute, digitalSeconds, ampm, alarmTime, alarmConfig } = clockContext

    // const currentTime = `${digitalHour}: ${digitalMinute} ${ampm}`
    // const alarmTimeString = `${alarmTime.hour}: ${alarmTime.minute} ${alarmTime.amPm}`

    // useEffect(() => {
    //     setInterval(() => {
    //         if (currentTime === alarmTimeString) {
    //             setAlarmConfig(true)
    //         }
    //     }, 1000)

    // }, [currentTime, alarmTimeString])



    return (
        <div className="flex flex-col gap-3 items-center">
            <h1 className="text-accents-100 text-2xl">Music Clock Alarm</h1>
            {digitalHour && <p className="text-3xl text-accents-100">{digitalHour}:{digitalMinute}:{digitalSeconds} {ampm}</p>}
        </div>
    )
}