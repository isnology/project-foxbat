const mongoose = require('./init')
const Schema = mongoose.Schema

const templateSchema = new Schema({
  name: { type: String },
  pictureUrl: { type: String },
  code: { type: String }
})

const Template = mongoose.model('Template', templateSchema)

module.exports = Template
