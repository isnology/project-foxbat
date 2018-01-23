const express = require('express')
const nodemailer = require('nodemailer');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const router = new express.Router()

router.post('/submitpanel', (req, res) => {
  const { email = '', slotData = [], templateID = ''} = req.body
  console.log(email)
  console.log(slotData)
  console.log(templateID)
  res.json(email)

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
    subject: 'New instrument panel design sumbmitted',
    text: `New panel design from ${email} on ${templateID}
    ${slotData},`,
    attachments: ''
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})

module.exports = router

