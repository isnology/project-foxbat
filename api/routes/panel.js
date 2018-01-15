const express = require('express')
const Panel = require('../models/Panel')
//const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

// read
router.get('/panels', (req, res) => {
  Panel.find()
  .then((panels) => {
    res.json(panels)
  })
  .catch((error) => {
    res.json({ error })
  })
})

// create
router.post('/panels', (req, res) => {
  Product.create(req.body)
  .then((panel) => {
    res.status(201).json(panel)
  })
  .catch((error) => {
    res.status(400).json({ error })
  })
})

// Update
router.put('/panels/:id', (req, res) => {
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
router.delete('/panels/:id', (req, res) => {
  const { id } = req.params
  Panel.findByIdUpdate(id,
      // find the wishlist for the signed in user
      { user: req.user },
      // make changes (add new entry only once) https://docs.mongodb.com/manual/reference/operator/
      { $pull: { panels: id } },
      // options when updating
      { upsert: true , runValidators: true }
  )
  .populate('panels')
  .then((wishlist) => {
    res.json({ panels: wishlist.products })
  })
  .catch((error) => {
    res.status(400).json({ error })
  })
})


module.exports = router