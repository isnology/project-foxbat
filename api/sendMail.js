const nodemailer = require('nodemailer');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTHENTICATE_EMAIL,
    pass: process.env.AUTHENTICATE_PASSWORD
  }
});

var mailOptions = {
  from: process.env.AUTHENTICATE_EMAIL,
  to: process.env.CLIENT_EMAIL,
  subject: 'New instrument panel design sumbmitted',
  text: 'That was easy!',
  attachments: ''
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});