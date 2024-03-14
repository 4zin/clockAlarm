import useAuth from "@/hooks/useAuth"


export default function Dashboard({ code }: { code: string }) {

  const accessToken = useAuth(code)

  return (
    <div>
      {code}
    </div>
  )
}
