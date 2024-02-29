'use client'

import { useEffect, useContext } from 'react'
import { AlarmContext } from './context/ClockContext'
import { AlarmModal } from './AlarmModal'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

export const SetAlarm = () => {


    const alarmContext = useContext(AlarmContext)

    if (alarmContext === undefined) {
        throw new Error('alarmContext must be used within AlarmProvider')
    }

    const { hour,
        minutes,
        amPmOptions,
        alarmTime,
        setAlarmHandler,
        hourNumber,
        minuteNumber,
        hourHandler,
        minuteHandler,
        amPmHandler,
    } = alarmContext



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