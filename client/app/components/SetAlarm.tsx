'use client'

import { useEffect, useContext } from 'react'
import { AlarmTime } from '@/types'
import useAuth from '@/hooks/useAuth'

import { AlarmContext } from '@/components/context/AlarmContext'
import { AlarmModal } from '@/components/AlarmModal'
import Button from '@/components/Button'
import Options from '@/components/Options'
import Search from '@/components/Search'



export const SetAlarm = ({ code }: { code: string }) => {

  const accessToken = useAuth(code)

  const alarmContext = useContext(AlarmContext)

  if (alarmContext === undefined) {
    throw new Error('alarmContext must be used within AlarmProvider')
  }

  const { hour,
    minutes,
    amPmOptions,
    alarmTime,
    setAlarmTime,
    alarmConfig
  } = alarmContext

  useEffect(() => {
    console.log(alarmTime)
  }, [alarmTime])

  const setAlarmHandler = () => {

    if (hour !== 'Hour' && minutes !== 'Minutes' && amPmOptions !== 'AM-PM') {
      const newAlarmTime: AlarmTime = {
        hour: hour,
        minute: minutes,
        amPm: amPmOptions
      }

      setAlarmTime(newAlarmTime)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <Options />
      <Search accessToken={accessToken} />

      <div className='flex justify-center'>
        <Button
          text='Set Alarm'
          onClick={setAlarmHandler}
        />
      </div>
      <AlarmModal accessToken={accessToken} />
    </div>
  )
}