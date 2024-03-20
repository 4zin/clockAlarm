'use client'

import { ContextClockProps } from '../../types'
import { createContext, useState, useEffect, useContext } from "react";
import { AlarmContext } from './AlarmContext';

export const ClockContext = createContext<ContextClockProps | undefined>(undefined)

export function ClockProvider({ children }: { children: React.ReactNode }) {
  const alarmContext = useContext(AlarmContext)

  if (alarmContext === undefined) {
    throw new Error('alarmContext must be used within AlarmProvider')
  }

  const { alarmTimeString, setAlarmConfig } = alarmContext

  //Clock
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

    const currentTime = `${digitalHour}: ${digitalMinute} ${ampm}`

    if (currentTime === alarmTimeString) {

      setAlarmConfig(true)

    }

    setInterval(updateClock, 1000)

  }, [digitalHour, digitalMinute, ampm])

  return (
    <ClockContext.Provider value={{
      digitalHour,
      digitalMinute,
      digitalSeconds,
      ampm
    }}>
      {children}
    </ClockContext.Provider>
  )
}