import bodyParser from 'body-parser'
import express from 'express'
import fs from 'fs'
import https from 'https'
import path from 'path'

import auth from './routes/auth'
import protectedRoute from './routes/protected'

const credentials = {
  cert: fs.readFileSync(path.resolve(process.env.SSL_ROOT, process.env.SSL_CERT_NAME), 'utf8'),
  key: fs.readFileSync(path.resolve(process.env.SSL_ROOT, process.env.SSL_KEY_NAME), 'utf8')
}

/* Setup */
const app = express()
const server = https.createServer(credentials, app)

/* Middleware */
app.use(bodyParser.json())

/* Routes */
app.use('/auth', auth)
app.use('/protected', protectedRoute)

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})
