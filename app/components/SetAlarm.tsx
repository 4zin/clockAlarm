'use client'

import { useState } from 'react'

export const SetAlarm = () => {

    const [hour, setHour] = useState<string>('Hour')
    const [minutes, setMinutes] = useState<string>('Minutes')
    const [amPmOptions, setAmPmOptions] = useState<string>('AM-PM')


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
        <div className='flex flex-col'>
            <div className='flex gap-4'>
                <select value={hour} onChange={hourHandler}>
                    <option disabled value="Hour">Hour</option>
                    {
                        hourNumber.map((hour, index) => <option key={index} value={hour}>{hour}</option>)
                    }
                </select>

                <select value={minutes} onChange={minuteHandler}>
                    <option disabled value="Minutes">Minutes</option>
                    {
                        minuteNumber.map((minute, index) => <option key={index} value={minute}>{minute}</option>)
                    }
                </select>

                <select value={amPmOptions} onChange={amPmHandler}>
                    <option disabled value="AM-PM">AM-PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>

            <div className='flex justify-center'>
                <button>Set Alarm</button>
            </div>
        </div>
    )
}