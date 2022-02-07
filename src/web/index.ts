import express from 'express'
import path from 'path'

const app = express()

const clientDir = path.join(process.cwd(), 'dist/client')

app.use(express.static(clientDir))

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next()
  }
  res.sendFile(path.join(clientDir, 'app.html'))
})

export default app
