'use client'

import { AlarmContextProps, AlarmTime } from "@/types"
import { createContext, useState } from "react"

export const AlarmContext = createContext<AlarmContextProps | undefined>(undefined)

export function AlarmProvider({ children }: { children: React.ReactNode }) {
  const [hour, setHour] = useState<string>('Hour')
  const [minutes, setMinutes] = useState<string>('Minutes')
  const [amPmOptions, setAmPmOptions] = useState<string>('AM-PM')
  const [alarmTime, setAlarmTime] = useState<AlarmTime>({
    hour: 'Hour',
    minute: 'Minutes',
    amPm: 'AM-PM'
  })
  const [alarmConfig, setAlarmConfig] = useState<boolean>(false)

  const alarmTimeString = `${alarmTime.hour}: ${alarmTime.minute} ${alarmTime.amPm}`

  const fixNumber = (value: number[]): (string | number)[] => {
    return value.map(hour => (hour < 10 ? '0' + hour : hour));
  };

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
      hour,
      minutes,
      amPmOptions,
      alarmTime,
      setAlarmTime,
      setAlarmConfig,
      hourNumber,
      minuteNumber,
      hourHandler,
      minuteHandler,
      amPmHandler,
      alarmConfig,
      alarmTimeString
    }}
    >
      {children}
    </AlarmContext.Provider>
  )
}