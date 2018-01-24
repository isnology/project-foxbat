const express = require('express')
const nodemailer = require('nodemailer');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const router = new express.Router()

router.post('/submitpanel', (req) => {
  const { email = '', slotData = [], templateID = ''} = req.body

  let slotDataAsString = ''

  function convertObjectToStr(obj) {
  }

  slotData.forEach(function(obj) {
    if (obj.instrument === null) {
      slotDataAsString = slotDataAsString + "\n\xA0" + obj.slotNumber + ": empty"
    }
    else {
      slotDataAsString = slotDataAsString + "\n\xA0" + obj.slotNumber + ": " + obj.instrument.brand + " - " + obj.instrument.name + " (" + obj.instrument.partNo + ")"
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
    subject: 'New ${templateID} instrument panel design sumbmitted',
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

  console.log(slotDataAsString)
  res.json(email)
})

module.exports = router

