'use client'

import { AlarmContext } from '@/components/context/AlarmContext'
import { AlarmModal } from '@/components/AlarmModal'
import { AlarmTime, SearchResultsProps } from '@/types'
import useAuth from '@/hooks/useAuth'
import TrackSearchResult from '@/components/TrackSearchResult'

import { useEffect, useContext, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import Button from './Button'

import '../../styles/setAlarm.css'


export const SetAlarm = ({ code }: { code: string }) => {

  const accessToken = useAuth(code)

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
  const [uri, setUri] = useState([''])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResultsProps[]>([])

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
          uris: uri
        })
      } catch (error) {
        console.error('Error al reproducir la cancion:', error);

      }
    }

  }, [alarmActive, uri])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false

    spotifyApi.searchTracks(search).then(res => {
      const tracks = res.body.tracks?.items ?? []

      setSearchResults(
        tracks.map(track => {
          const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
            if (image.height !== undefined && smallest.height !== undefined) {
              if (image.height < smallest.height) return image
            }
            return smallest
          }, track.album.images[0])

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url
          }
        })
      )
    })

    return () => {
      cancel = true
    }
    // console.log('Alarma seteada a las', alarmTime);

  }, [alarmTime, search, accessToken])

  const setAlarmHandler = () => {

    if (hour !== 'Hour' && minutes !== 'Minutes' && amPmOptions !== 'AM-PM') {
      const newAlarmTime: AlarmTime = {
        hour: hour,
        minute: minutes,
        amPm: amPmOptions
      }

      // setAlarmActive(true)
      setAlarmTime(newAlarmTime)
      setSearch('')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center'>
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

      <div className='flex flex-col items-center w-full'>
        <input
          type="search"
          placeholder="Search for song"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='mb-4 w-60 bg-accents-400 py-1 px-2 rounded-md shadow-black shadow-inner text-lg text-accents-100 font-medium'
        />

        <div className={`${search ? 'w-auto h-52 overflow-y-auto overflow-x-hidden bg-accents-400' : 'w-auto h-0 overflow-hidden'}  rounded-md shadow-black p-[10px] mb-[20px] scrollbar`}>
          {searchResults && searchResults.map((track) => (
            <div
              key={track.uri}
              onClick={() => setUri([track.uri])}
            >
              <TrackSearchResult track={track} />
            </div>
          ))}
        </div>
      </div>

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