import { useContext } from "react"
import { AlarmContext } from "./context/AlarmContext"

export default function Options() {

  const alarmContext = useContext(AlarmContext)

  if (alarmContext === undefined) {
    throw new Error('alarmContext must be used within AlarmProvider')
  }

  const {
    hour,
    hourHandler,
    hourNumber,
    minutes,
    minuteHandler,
    minuteNumber,
    amPmOptions,
    amPmHandler,
  } = alarmContext

  return (
    <div className='flex mt-4 mb-4 justify-center options'>
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
  )
}
