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
  slots: [SlotSchema],
  email: { type: String },
  userId: { type: Schema.ObjectId, ref: 'User'}
})

panelSchema.index({userId: 1, name: 1}, {unique: true});

const Panel = mongoose.model('Panel', panelSchema)

module.exports = Panel
