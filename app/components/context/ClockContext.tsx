'use client'

import { AlarmTime } from '../../types'
import { ContextAlarmProps } from '../../types'
import { createContext, useState, useEffect } from "react";

export const AlarmContext = createContext<ContextAlarmProps | undefined>(undefined)

export function AlarmProvider({ children }: { children: React.ReactNode }) {

    //Clock
    const [digitalHour, setDigitalHour] = useState<string>('');
    const [digitalMinute, setDigitalMinute] = useState<string>('');
    const [digitalSeconds, setDigitalSeconds] = useState<string>('');
    const [ampm, setAmpm] = useState<string>('');

    //Alarm
    const [hour, setHour] = useState<string>('Hour')
    const [minutes, setMinutes] = useState<string>('Minutes')
    const [amPmOptions, setAmPmOptions] = useState<string>('AM-PM')
    const [alarmTime, setAlarmTime] = useState<AlarmTime>({
        hour: 'Hour',
        minute: 'Minutes',
        amPm: 'AM-PM'
    })
    const [alarmConfig, setAlarmConfig] = useState<boolean>(false)


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

        const currentTime = `${digitalHour}: ${digitalMinute} ${ampm}`
        const alarmTimeString = `${alarmTime.hour}: ${alarmTime.minute} ${alarmTime.amPm}`

        if (currentTime === alarmTimeString) {

            setAlarmConfig(true)

        }

        setInterval(updateClock, 1000)

    }, [digitalHour, digitalMinute, ampm, hour, minutes, amPmOptions, alarmTime])

    const fixNumber = (value: number[]): (string | number)[] => {
        return value.map(hour => (hour < 10 ? '0' + hour : hour));
    };

    const setAlarmHandler = () => {

        if (hour !== 'Hour' && minutes !== 'Minutes' && amPmOptions !== 'AM-PM') {
            setAlarmTime((prevAlarmTime) => ({
                ...prevAlarmTime,
                hour: hour,
                minute: minutes,
                amPm: amPmOptions
            }))
        }
    }

    const silenceAlarm = () => {
        setAlarmConfig(false)
        setAlarmTime({
            hour: 'Hour',
            minute: 'Minutes',
            amPm: 'AM-PM'
        })
    }


    const hourNumber = fixNumber(Array.from(Array(13).keys()))
    const minuteNumber = fixNumber(Array.from(Array(60).keys()))

    const hourHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setHour(event.target.value)
    }
    const minuteHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMinutes(event.target.value)
    }
    const amPmHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAmPmOptions(event.target.value)
    }

    return (
        <AlarmContext.Provider value={{
            digitalHour,
            digitalMinute,
            digitalSeconds,
            ampm,
            hour,
            minutes,
            amPmOptions,
            alarmTime,
            setAlarmHandler,
            silenceAlarm,
            hourNumber,
            minuteNumber,
            hourHandler,
            minuteHandler,
            amPmHandler,
            alarmConfig
        }}>
            {children}
        </AlarmContext.Provider>
    )
}