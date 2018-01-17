const mongoose = require('./init')
const Schema = mongoose.Schema

const instrumentSchema = new Schema({
  name: { type: String },
  brand: { type: String },
  model: { type: String },
  partNo: { type: String },
  text: { type: String },
  pictureUrl: { type: String },
  price: { type: Number },
  size: { type: String },
  instrumentClassId: { type: Schema.ObjectId, ref: 'InstrumentClass' },
})

instrumentSchema.index({instrumentClassId: 1, brand: 1, model: 1, partNo: 1}, {unique: true});

const Instrument = mongoose.model('Instrument', instrumentSchema)

module.exports = Instrument