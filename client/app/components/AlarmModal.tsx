import { useContext } from "react"
import { AlarmContext } from "./context/ClockContext"
import { MuteIcon, PalaIcon } from "@/icons"

export function AlarmModal() {

  const alarmContext = useContext(AlarmContext)

  if (alarmContext === undefined) {
    throw new Error('alarmContext must be used within AlarmProvider')
  }

  const { alarmConfig, alarmTime, silenceAlarm } = alarmContext

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