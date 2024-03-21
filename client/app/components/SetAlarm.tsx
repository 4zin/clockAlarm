'use client'

import { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-node'
import { AlarmContext } from '@/components/context/AlarmContext'
import { AlarmModal } from '@/components/AlarmModal'
import { AlarmTime } from '@/types'
import useAuth from '@/hooks/useAuth'


export const SetAlarm = ({ code }: { code: string }) => {

  const accessToken = useAuth(code)
  console.log(accessToken);
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    accessToken: accessToken,
  })


  const alarmContext = useContext(AlarmContext)

  if (alarmContext === undefined) {
    throw new Error('alarmContext must be used within AlarmProvider')
  }

  const { hour,
    minutes,
    amPmOptions,
    alarmTime,
    setAlarmTime,
    hourNumber,
    minuteNumber,
    hourHandler,
    minuteHandler,
    amPmHandler,
    alarmConfig
  } = alarmContext

  const [alarmActive, setAlarmActive] = useState<boolean>(false)

  // const playAlarm = async () => {
  // try {

  // const response = await axios.get('https://api.spotify.com/v1/me/player', {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //     'Content-Type': 'application/json',
  //   },
  //   data: {
  //     uris: ['spotify:track:1YqVJ2YSgwxWpfuENocF2t'],
  //   }
  // })


  // console.log(response.data.actions.disallows);
  // spotifyApi.play({
  //   uris: ['spotify:track:1YqVJ2YSgwxWpfuENocF2t'],
  // })

  // } catch (error) {
  //   console.error('Error al reproducir la canción:', error);
  // }
  // }

  useEffect(() => {
    if (alarmConfig === true) {
      setAlarmActive(true)
    } else {
      setAlarmActive(false)
    }
  }, [alarmConfig])

  useEffect(() => {

    if (alarmActive === true) {
      try {
        spotifyApi.play({
          uris: ['spotify:track:12usPU2WnqgCHAW1EK2dfd'],
        })
      } catch (error) {
        console.error('Error al reproducir la cancion:', error);

      }
    }

  }, [alarmActive])

  const setAlarmHandler = () => {

    if (hour !== 'Hour' && minutes !== 'Minutes' && amPmOptions !== 'AM-PM') {
      const newAlarmTime: AlarmTime = {
        hour: hour,
        minute: minutes,
        amPm: amPmOptions
      }

      // setAlarmActive(true)
      setAlarmTime(newAlarmTime)
    }
  }

  useEffect(() => {
    console.log('Alarma seteada a las', alarmTime);
  }, [alarmTime])



  return (
    <div className='flex flex-col'>
      <div className='flex gap-4 mt-4 mb-4 justify-center'>
        <select
          className={`bg-accents-400 py-1 px-[1rem] rounded-md shadow-black shadow-inner text-accents-100 font-medium`}
          value={hour}
          onChange={hourHandler}
        >
          <option disabled value="Hour">Hour</option>
          {
            hourNumber.map((hour, index) => <option key={index} value={hour}>{hour}</option>)
          }
        </select>

        <select
          className={`bg-accents-400 py-1 px-[1rem] rounded-md shadow-black shadow-inner text-accents-100 font-medium`}
          value={minutes}
          onChange={minuteHandler}
        >
          <option disabled value="Minutes">Minutes</option>
          {
            minuteNumber.map((minute, index) => <option key={index} value={minute}>{minute}</option>)
          }
        </select>

        <select
          className={`bg-accents-400 py-1 px-[1rem] rounded-md shadow-black shadow-inner text-accents-100 font-medium`}
          value={amPmOptions}
          onChange={amPmHandler}
        >
          <option disabled value="AM-PM">AM-PM</option>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>

      <div className='flex justify-center'>
        <button
          className='bg-accents-400 hover:bg-[#bbbbea] p-2 rounded-md shadow-accents-100 shadow-sm text-accents-100 font-semibold active:translate-y-1 transition-all duration-75'
          onClick={setAlarmHandler}
        >
          Set Alarm
        </button>
      </div>
      <AlarmModal />
    </div>
  )
}