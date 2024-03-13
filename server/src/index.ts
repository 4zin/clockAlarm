import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import SpotifyWebApi from 'spotify-web-api-node'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control_Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

const PORT: number = Number(process.env.PORT ?? 3002)

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
})

app.get('/login', (_req, res) => {
  const url = spotifyApi.createAuthorizeURL([
    'user-read-private',
    'user-read-email'
  ], 'state')
  res.redirect(url)
})

// app.get('/login', (req, res) => {
//   const code = req.query?.code as string | undefined

//   if (code == null) {
//     res.sendStatus(400)
//     return
//   }

//   const spotifyApi = new SpotifyWebApi({
//     redirectUri: process.env.SPOTIFY_REDIRECT_URI,
//     clientId: process.env.SPOTIFY_CLIENT_ID,
//     clientSecret: process.env.SPOTIFY_CLIENT_SECRET
//   })

//   spotifyApi.authorizationCodeGrant(code).then(
//     (data) => {
//       res.json({
//         accessToken: data.body.access_token,
//         refreshToken: data.body.refresh_token,
//         expiresIn: data.body.expires_in
//       })
//     }
//   ).catch((error) => {
//     res.send(error.message)
//   })
// })

// app.get('/callback', (req, res) => {
//   const { code } = req.query
//   spotifyApi.authorizationCodeGrant(code as string)
//     .then((data) => {
//       const accessToken = data.body.access_token
//       const refreshToken = data.body.refresh_token
//       spotifyApi.setAccessToken(accessToken)
//       spotifyApi.setRefreshToken(refreshToken)
//       res.send('Authentication successfully')
//     })
//     .catch((error) => {
//       res.send(error.message)
//     })
// })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
