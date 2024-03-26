import { useContext } from "react"
import { AlarmContext } from "./context/AlarmContext"
import { MuteIcon } from "@/icons"
import SpotifyWebApi from "spotify-web-api-node"

export function AlarmModal({ accessToken }: { accessToken: string }) {

  const alarmContext = useContext(AlarmContext)

  if (alarmContext === undefined) {
    throw new Error('alarmContext must be used within AlarmProvider')
  }

  const { alarmConfig, alarmTime, setAlarmConfig, setAlarmTime } = alarmContext

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    accessToken: accessToken
  })

  const silenceAlarm = () => {

    if (!alarmConfig) return
    try {
      spotifyApi.pause();
    } catch (error) {
      console.error('Error al pausar la canción:', error);
    }

    setAlarmConfig(false)
    setAlarmTime({
      hour: 'Hour',
      minute: 'Minutes',
      amPm: 'AM-PM'
    })
  }

  return (
    <section className={`grid ${alarmConfig ? 'absolute' : 'hidden'}  w-screen h-screen top-0 left-0 place-items-center bg-[rgba(0,0,0,0.25)]`}>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center h-[400px] w-[420px] bg-amber-300 rounded-md">
          <p className="text-accents-100 text-4xl font-semibold">Alarm</p>
          {
            alarmConfig && (
              <p className="text-accents-100 text-4xl font-semibold">{alarmTime.hour}:{alarmTime.minute} {alarmTime.amPm}</p>
            )
          }
        </div>
        <div className="sticky bottom-[7rem]">
          <button onClick={silenceAlarm} className="flex bg-accents-100 text-base font-medium py-2 px-4 rounded-md active:translate-y-1">Silence &nbsp; <MuteIcon /></button>
        </div>
      </div>
    </section>
  )
}