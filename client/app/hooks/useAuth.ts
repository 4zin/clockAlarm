import { useState, useEffect } from "react";
import axios from 'axios'
import Cookies from 'js-cookie'

export default function useAuth(code: string) {
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState<number | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://tough-design-production.up.railway.app/login', { code })
        const { accessToken: responseAccessToken, refreshToken, expiresIn } = response.data


        setAccessToken(responseAccessToken)

        setRefreshToken(refreshToken)
        setExpiresIn(expiresIn)
        window.history.pushState({}, '', '/')


        window.history.pushState({}, '', '/')
      } catch (error) {
        window.location.href = '/'
      }
    }

    fetchData()

  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return

    const interval = setInterval(() => {

      axios.post('https://tough-design-production.up.railway.app/refresh', {
        refreshToken
      }).then(res => {
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
      }).catch(() => {
        window.location.href = '/'
      })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return accessToken
}