const mongoose = require('./init')
const Schema = mongoose.Schema

const SlotSchema = new Schema({
  position: { type: String },
  instrumentId: { type: Schema.ObjectId, ref: 'Instrument' },
  size: { type: String }
})

const panelSchema = new Schema({
  template: { type: Schema.ObjectId, ref: 'Template'},
  name: { type: String },
  secretUrl: { type: String },
  slots: [SlotSchema],
  email: { type: String }
})

const Panel = mongoose.model('Panel', panelSchema)

module.exports = Panel
