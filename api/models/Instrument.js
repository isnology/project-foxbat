const mongoose = require('./init')
const Schema = mongoose.Schema

const instrumentSchema = new Schema({
  name: { type: string },
  brand: { type: string },
  model: { type: string },
  partNo: { type: string },
  pictureUrl: { type: string },
  price: { type: integer },
  size: { type: integer }
})

const Instrument = mongoose.model('Instrument', instrumentSchema)

module.exports = Instrument
