import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import SpotifyWebApi from 'spotify-web-api-node'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control_Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

const PORT: number = Number(process.env.PORT ?? 3002)

// app.post('/refresh', (req, res) => {
//   const refreshToken = req.body.refreshToken
//   const spotifyApi = new SpotifyWebApi({
//     clientId: process.env.SPOTIFY_CLIENT_ID,
//     clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//     redirectUri: process.env.SPOTIFY_REDIRECT_URI,
//     refreshToken
//   })

//   spotifyApi.refreshAccessToken().then(data => {
//     res.json({
//       accessToken: data.body.access_token,
//       expiresIn: data.body.expires_in
//     })
//   }).catch((err) => {
//     console.log(err)
//     res.sendStatus(400)
//   })
// })

// app.post('/login', (req, res) => {
//   const code = req.body.code
//   const spotifyApi = new SpotifyWebApi({
//     redirectUri: process.env.SPOTIFY_REDIRECT_URI,
//     clientId: process.env.SPOTIFY_CLIENT_ID,
//     clientSecret: process.env.SPOTIFY_CLIENT_SECRET
//   })

//   spotifyApi.authorizationCodeGrant(code).then((data) => {
//     res.json({
//       accessToken: data.body.access_token,
//       refreshToken: data.body.refresh_token,
//       expiresIn: data.body.expires_in
//     })
//   }).catch((error) => {
//     console.log(error)
//     res.sendStatus(400)
//   })
// })

// const scopes = [
//   'ugc-image-upload',
//   'user-read-playback-state',
//   'user-modify-playback-state',
//   'user-read-currently-playing',
//   'streaming',
//   'app-remote-control',
//   'user-read-email',
//   'user-read-private',
//   'playlist-read-collaborative',
//   'playlist-modify-public',
//   'playlist-read-private',
//   'playlist-modify-private',
//   'user-library-modify',
//   'user-library-read',
//   'user-top-read',
//   'user-read-playback-position',
//   'user-read-recently-played',
//   'user-follow-read',
//   'user-follow-modify'
// ]

// const generateRandomString = (length: number): string => {
//   let result = ''
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length))
//   }
//   return result
// }

// const state = generateRandomString(16)

// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.SPOTIFY_CLIENT_ID,
//   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//   redirectUri: process.env.SPOTIFY_REDIRECT_URI
// })

// app.get('/login', (_req, res) => {
//   res.redirect(spotifyApi.createAuthorizeURL(scopes, state))
// })

// app.get('/callback', (req, res) => {
//   const error = req.query.error
//   const code = req.query.code

//   if (error === 'access_denied') {
//     console.log('Callback Error', error)
//     res.send(`Callback Error: ${error}`)
//   }

//   spotifyApi
//     .authorizationCodeGrant(code as string)
//     .then(data => {
//       const accessToken = data.body.access_token
//       const refreshToken = data.body.refresh_token
//       const expiresIn = data.body.expires_in

//       spotifyApi.setAccessToken(accessToken)
//       spotifyApi.setRefreshToken(refreshToken)

//       console.log(`access_token: ${accessToken}`)
//       console.log(`refresh_token: ${refreshToken}`)

//       console.log(`Successfully retrieved access token. Expires in ${expiresIn} s.`)
//       res.send('Success! You can now close the window.')

//       const refreshAccessToken = async (): Promise<void> => {
//         const data = await spotifyApi.refreshAccessToken()
//         const accessToken = data.body.access_token

//         console.log('The access token has been refreshed!')
//         console.log(`access_token: ${accessToken}`)
//         spotifyApi.setAccessToken(accessToken)
//       }

//       const refreshTokenVoid = (): void => {
//         refreshAccessToken().catch((error) => {
//           console.error('Error refreshing access token:', error)
//         })
//       }

//       setInterval(refreshTokenVoid, expiresIn / 2 * 1000)
//     })
//     .catch((error: Error) => {
//       console.error('Error getting Tokens:', error)
//       res.send(`Error getting Tokens: ${error.message}`)
//     })
// })

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
