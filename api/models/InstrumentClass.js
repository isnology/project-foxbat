const mongoose = require('./init')
const Schema = mongoose.Schema

const instrumentClassSchema = new Schema({
  name: { type: String }
})

const InstrumentClass = mongoose.model('InstrumentClass', instrumentSchema)

module.exports = InstrumentClass
