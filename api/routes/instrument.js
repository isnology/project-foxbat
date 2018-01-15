const express = require('express')
const Instrument = require('../models/Instrument')
//const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

// read
router.get('/instruments', (req, res) => {
  Instrument.find()
  .then((instruments) => {
    res.json(instruments)
  })
  .catch((error) => {
    res.json({ error })
  })
})

// create
router.post('/instruments', (req, res) => {
  Product.create(req.body)
  .then((instrument) => {
    res.status(201).json(instrument)
  })
  .catch((error) => {
    res.status(400).json({ error })
  })
})

// Update
router.put('/instruments/:id', (req, res) => {
  const { id } = req.params
  Instrument.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
  .then((instrument) => {
    if (instrument) {
      res.json(instrument)
    }
    else {
      res.status(404).json({
        error: new Error(`Instrument with id '${id}' not found`)
      })
    }
  })
  .catch((error) => {
    res.status(400).json({ error })
  })
})

module.exports = router