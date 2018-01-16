const express = require('express')
const Template = require('../models/Template')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

// read
router.get('/templates', requireJWT, (req, res) => {
  Template.find()
  .then((templates) => {
    res.json(templates)
  })
  .catch((error) => {
    res.json({ error })
  })
})

// create
router.post('/templates', requireJWT, (req, res) => {
  Template.create(req.body)
  .then((template) => {
    res.status(201).json(template)
  })
  .catch((error) => {
    res.status(400).json({ error })
  })
})

// Update
router.put('/templates/:id', requireJWT, (req, res) => {
  const { id } = req.params
  Template.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
  .then((template) => {
    if (template) {
      res.json(template)
    }
    else {
      res.status(404).json({
        error: new Error(`Template with id '${id}' not found`)
      })
    }
  })
  .catch((error) => {
    res.status(400).json({ error })
  })
})

module.exports = router