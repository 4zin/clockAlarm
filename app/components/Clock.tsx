'use client';

import { useState, useEffect } from "react";

export const Clock = () => {


    const [clock, setClock] = useState<string>('');

    useEffect(() => {
        const updateClock = () => {
            let time = new Date().toLocaleTimeString();
            return setClock(time);
        }

        setInterval(updateClock, 1000)

    }, [])



    return (
        <div className="flex flex-col gap-3 items-center">
            <h1 className="text-accents-100 text-2xl">Music Clock Alarm</h1>
            {clock && <p className="text-3xl text-accents-100">{clock}</p>}
        </div>
    )
}