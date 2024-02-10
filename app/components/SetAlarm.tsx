'use client'

import { useState } from 'react'

export const SetAlarm = () => {

    const [hour, setHour] = useState<number[]>(Array(24).fill(0))
    const [minute, setMinute] = useState<number[]>(Array(60).fill(0))

    return (
        <div className='flex gap-4'>
            <select name="" id="">
                <option value="" disabled>Hour</option>
                {
                    hour.map((_, index) => <option key={index} value={index}>{index}</option>)
                }
            </select>
            {/* <select name="" id="">
                <option value="">Minute</option>
                {
                    minute.map((_, index) => <option key={index} value={index}>{index}</option>)
                }
            </select> */}
        </div>
    )
}