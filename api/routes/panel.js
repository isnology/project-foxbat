const express = require('express')
const Panel = require('../models/Panel')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

// get ALL panels - only for admins
router.get('/admin/panels', requireJWT, (req, res) => {
  if (req.user.admin){
    Panel.find()
    .then((panels) => {
      res.json(panels)
    })
    .catch((error) => {
      res.json({ error })
    })
  } else {
    res.status(401).json({
      error: "only administrators can view all panels"
    })
  }
})

// read
router.get('/panels', requireJWT, (req, res) => {
  Panel.find({ user_id: req.user })
  .then((panels) => {
    res.json(panels)
  })
  .catch((error) => {
    res.json({ error })
  })
})

// create
router.post('/panels', requireJWT, (req, res) => {
  Panel.create(req.body.data)
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

  Panel.findByIdAndUpdate(id, req.body.data, { new: true, runValidators: true })
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
  Panel.findByIdAndRemove(id, { runValidators: true })
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