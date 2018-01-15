const mongoose = require('./init')
const Schema = mongoose.Schema

const templateSchema = new Schema({
  name: { type: string },
  pictureUrl: { type: string },
  code: { type: string }
})

const Template = mongoose.model('Template', templateSchema)

module.exports = Template
