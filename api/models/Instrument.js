const mongoose = require('./init')
const Schema = mongoose.Schema

const instrumentSchema = new Schema({
  name: { type: String },
  brand: { type: String },
  model: { type: String },
  partNo: { type: String },
  pictureUrl: { type: String },
  price: { type: Number },
  size: { type: Number }
})

const Instrument = mongoose.model('Instrument', instrumentSchema)

module.exports = Instrument
