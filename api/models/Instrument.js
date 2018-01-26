const mongoose = require('./init')
const Schema = mongoose.Schema

const instrumentSchema = new Schema({
  name: { type: String },
  brand: { type: String },
  model: { type: String },
  partNo: { type: String },
  text: { type: String },
  pictureURL: { type: String },
  price: { type: Number },
  size: { type: String },
  horizontalMultiplier: { type: Number },
  verticalMultiplier:{ type: Number },
  sizeMultiplier: { type: Number },
  instrumentClass_id: { type: Schema.ObjectId, ref: 'InstrumentClass' },
})

instrumentSchema.index({instrumentClass_id: 1, brand: 1, model: 1, partNo: 1}, {unique: true});

const Instrument = mongoose.model('Instrument', instrumentSchema)

module.exports = Instrument