import { Clock } from "@/components/Clock"
import { SetAlarm } from "@/components/SetAlarm"
import { LogIn } from "@/components/LogIn"

export default function Page() {
  return (
    <main>
      <Clock />
      {/* <SetAlarm /> */}
      <LogIn />
    </main>
  )
}