import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import SpotifyWebApi from 'spotify-web-api-node'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({
  origin: 'https://pomodorify.up.railway.app',
  // origin: 'http://localhost:3000',
  credentials: true
}))
app.use(bodyParser.json())
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://pomodorify.up.railway.app')
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control_Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

const PORT: number = Number(process.env.PORT ?? 3002)

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
})

app.post('/login', (req, res) => {
  const { code } = req.body
  spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      const { access_token: accessToken, refresh_token: refreshToken, expires_in: expiresIn } = data.body

      res.json({ accessToken, refreshToken, expiresIn })
    })
    .catch(() => {
      res.sendStatus(400)
    })
})

app.post('/refresh', (_req, res) => {
  spotifyApi.refreshAccessToken()
    .then(data => {
      const { access_token: accessToken, expires_in: expiresIn } = data.body

      res.json({ accessToken, expiresIn })
    })
    .catch(() => {
      res.sendStatus(400)
    })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
