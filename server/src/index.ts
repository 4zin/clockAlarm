import express from 'express'
import diaryRouter from './routes/diares'

const app = express()
app.use(express.json())

const PORT = 3001

app.get('/ping', (_req, res) => {
  console.log('Someone pinged here and it was me')

  res.send('pong')
})

app.use('/api/diaries', diaryRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
