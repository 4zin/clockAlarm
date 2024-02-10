'use client';

import { useState } from "react";

export const Clock = () => {

    const [clock, setClock] = useState(new Date().toLocaleTimeString());

    console.log(clock);


    return (
        <div>
            <h1 className="text-accents-100 text-2xl">Music Clock Alarm</h1>
        </div>
    )
}