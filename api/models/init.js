const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// Use the Promise functionality built into Node.js
mongoose.Promise = global.Promise

// Connect to our local database
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })
.then(() => {
  console.log('Successfully connected to database')
})
.catch((err) => {
  // If there was an error connecting to the database
  console.error('Error connecting to MongoDB database', err.message)
})

module.exports = mongoose