import express from 'express'
import dotenv from 'dotenv'
import SpotifyWebApi from 'spotify-web-api-node'

dotenv.config()

const app = express()
app.use(express.json())

const PORT: number = Number(process.env.PORT ?? 3002)

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
})

app.get('/login', (_req, res) => {
  const authorizeURL = spotifyApi.createAuthorizeURL(['user-read-private', 'user-read-email', 'playlist-read-private'], 'state')
  res.redirect(authorizeURL)
})

app.get('/callback', (req, res) => {
  const { code } = req.query
  spotifyApi.authorizationCodeGrant(code as string)
    .then((data) => {
      const accessToken = data.body.access_token
      const refreshToken = data.body.refresh_token
      spotifyApi.setAccessToken(accessToken)
      spotifyApi.setRefreshToken(refreshToken)
      res.send('Authentication successfully')
    })
    .catch((error) => {
      res.send(error.message)
    })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
