const express = require('express')
const nodemailer = require('nodemailer');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const router = new express.Router()

router.post('/submitpanel', (req, res) => {
  const { email = '', slotData = [], templateID = '', templateSlots = []} = req.body

  let slotDataAsString = ''

  function convertObjectToStr(obj) {
  }

  templateSlots.forEach(function(tSlot) {
    let slot = _find(slotData, { slotNumber: tSlot })
    if (!!slot) {
      slotDataAsString = slotDataAsString + "\n\xA0" + slot.slotNumber + ": " + slot.instrument.brand + " - " + slot.instrument.name + " (" + slot.instrument.partNo + ")"
    }
    else {
      slotDataAsString = slotDataAsString + "\n\xA0" + tSlot + ": empty"
    }
  })

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTHENTICATE_EMAIL,
      pass: process.env.AUTHENTICATE_PASSWORD
    }
  });

  mailOptions = {
    from: process.env.AUTHENTICATE_EMAIL,
    to: process.env.CLIENT_EMAIL,
    subject: `New ${templateID} instrument panel design sumbmitted`,
    text: `New panel design from ${email} for an ${templateID} dashboard has been submitted
    ${slotDataAsString},`,
    attachments: ''
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.json(email)
})

module.exports = router

