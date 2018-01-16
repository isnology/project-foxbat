const mongoose = require('./init')
const Schema = mongoose.Schema

const templateSchema = new Schema({
  code: { type: String },
  name: { type: String },
  pictureUrl: { type: String }
})

const Template = mongoose.model('Template', templateSchema)

module.exports = Template
