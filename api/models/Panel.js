const mongoose = require('./init')
const Schema = mongoose.Schema

const SlotSchema = new Schema({
  position: { type: string },
  instrumentId: { type: Schema.ObjectId, ref: 'Instrument' },
  size: { type: string }
})

const panelSchema = new Schema({
  template: { type: Schema.ObjectId, ref: 'Template'},
  name: { type: string },
  secretUrl: { type: string },
  slots: [SlotSchema],
  email: { type: string }
})

const Panel = mongoose.model('Panel', panelSchema)

module.exports = Panel
