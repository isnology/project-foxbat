const mongoose = require('./init')
const Schema = mongoose.Schema

// slots {
//  slotNumber: { type: String },
//  instrument: { Instrument Object },
//  size: { type: String }
//})

const panelSchema = new Schema({
  template: String,
  name: String,
  slots: {},
  templateSlots: [String],
  user_id: { type: Schema.ObjectId, ref: 'User'}
})

panelSchema.index({user_id: 1, name: 1}, {unique: true});

const Panel = mongoose.model('Panel', panelSchema)

module.exports = Panel