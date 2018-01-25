const express = require('express')
const InstrumentClass = require('../models/InstrumentClass')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

// read
router.get('/instrumentclasses', requireJWT, (req, res) => {
  InstrumentClass.find()
  .then((instrumentsClass) => {
    res.json(instrumentsClass)
  })
  .catch((error) => {
    res.json({ error })
  })
})

// create
router.post('/instrumentclasses', requireJWT, (req, res) => {
  if (req.user.admin){
    InstrumentClass.create(req.body)
    .then((instrumentClass) => {
      res.status(201).json(instrumentClass)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
  } else {
    res.status(401).json({
      error: "only administrators can create new instrument classes"
    })
  }
})

// Update
router.put('/instrumentclasses/:id', requireJWT, (req, res) => {
  const { id } = req.params
  if (req.user.admin){
    InstrumentClass.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((instrumentClass) => {
      if (instrumentClass) {
        res.json(instrumentClass)
      }
      else {
        res.status(404).json({
          error: new Error(`InstrumentClass with id '${id}' not found`)
        })
      }
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
  } else {
    res.status(401).json({
      error: "only administrators can update new instrument classes"
    })
  }
})

module.exports = router