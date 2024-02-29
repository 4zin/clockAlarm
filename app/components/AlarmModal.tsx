import { useContext } from "react"
import { AlarmContext } from "./context/ClockContext"

export function AlarmModal() {

    const alarmContext = useContext(AlarmContext)

    if (alarmContext === undefined) {
        throw new Error('alarmContext must be used within AlarmProvider')
    }

    const { alarmConfig, alarmTime } = alarmContext

    return (
        <section className={`grid ${alarmConfig ? 'absolute' : 'hidden'}  w-screen h-screen top-0 left-0 place-items-center bg-[rgba(0,0,0,0.25)]`}>
            <div className="flex items-center justify-center h-[400px] w-[420px] bg-accents-100 rounded-md">
                {
                    alarmConfig && (
                        <p className="text-white font-semibold">Alarma activada a las {alarmTime.hour}:{alarmTime.minute} {alarmTime.amPm}</p>
                    )
                }
            </div>
        </section>
    )
}