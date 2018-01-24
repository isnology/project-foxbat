if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const seedDb = require ('./models/seedFunctions')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authMiddleware = require('./middleware/auth')
const Instrument = require('./models/Instrument')

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


ensureDbSeeded = () =>{
  Instrument.find()
  .then((instruments) => {
    if (instruments.length > 0){ //assume database has been seeded.
      console.log("database has instruments, not seeding")
    }else{ //assume database isn't seeded yet
    console.log("database has no instruments, running seeding")
    seedYoSelf()
  }
})
.catch((error) => {
  console.log("There was an error when attempting to read the database to ascertain need for seeding", error.message)
})
}

seedYoSelf = () =>{
  seedDb()
}

console.log("Checking if database needs seeding")
ensureDbSeeded()