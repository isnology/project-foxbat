if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authMiddleware = require('./middleware/auth')

const server = express()

server.use(bodyParser.json())
server.use(cors())  // allow access from other origins i.e. cross origin stuff (react front tend)
server.use(authMiddleware.initialize)


// routes
server.use([
  require('./routes/auth'),
  require('./routes/panel'),
  require('./routes/template'),
  require('./routes/instrument'),
  require('./routes/instrumentClass')
])

// error handler
server.use((error, req, res, next) => {
  const statusCode = error.statusCode || error.status || error.code || 500
  res.status(statusCode).json({
    error: {
      message: error.message
    }
  })
})

server.listen(7000, (error) => {
  if (error) {
    console.error('Error starting', error)
  }
  else {
    console.log('Server started at http://localhost:7000')
  }
})