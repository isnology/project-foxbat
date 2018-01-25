const mongoose = require('./init')
const Schema = mongoose.Schema

const SlotSchema = new Schema({
  slotNumber: { type: String },
  instrument: {
    type: Schema.Object, ref: "Instrument"
  },
  size: { type: String }
})

const panelSchema = new Schema({
  template: { type: String },
  name: { type: String },
  slots: [SlotSchema],
  user_id: { type: Schema.ObjectId, ref: 'User'}
})

panelSchema.index({user_id: 1, name: 1}, {unique: true});

const Panel = mongoose.model('Panel', panelSchema)

module.exports = Panel