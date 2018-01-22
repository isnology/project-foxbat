const express = require('express')
const Panel = require('../models/Panel')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

// read
router.get('/panels', requireJWT, (req, res) => {
  Panel.find({ User: req.user })
  .then((panels) => {
    res.json(panels)
  })
  .catch((error) => {
    res.json({ error })
  })
})

// create
router.post('/panels', requireJWT, (req, res) => {
  console.log("I just got a request to save a panel:", req.body)
  Panel.create(req.body)
  .then((panel) => {
    res.status(201).json(panel)
  })
  .catch((error) => {
    res.status(400).json({ error })
  })
})

// Update
router.put('/panels/:id', requireJWT, (req, res) => {
  const { id } = req.params
  Panel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
  .then((panel) => {
    if (panel) {
      res.json(panel)
    }
    else {
      res.status(404).json({
        error: new Error(`Panel with id '${id}' not found`)
      })
    }
  })
  .catch((error) => {
    res.status(400).json({ error })
  })
})

// delete
router.delete('/panels/:id', requireJWT, (req, res) => {
  const { id } = req.params
  Panel.findByIdAndRemove(id, { upsert: true , runValidators: true })
  .then((panel) => {
    if (panel) {
      res.json(panel)
    }
    else {
      res.status(404).json({
        error: new Error(`Panel with id '${id}' not found`)
      })
    }
  })
  .catch((error) => {
    res.status(400).json({ error })
  })
})


module.exports = router