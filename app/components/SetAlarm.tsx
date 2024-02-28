'use client'


import { useState, useEffect, useContext } from 'react'
import { AlarmContext } from './context/ClockContext'

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
        amPmHandler, } = alarmContext



    useEffect(() => {
        console.log('Alarma seteada a las', alarmTime);
    }, [alarmTime])



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
                <button
                    onClick={setAlarmHandler}
                >
                    Set Alarm
                </button>
            </div>
        </div>
    )
}