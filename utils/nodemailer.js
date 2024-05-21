const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'f200204@cfd.nu.edu.pk',
    pass: 'Abdullah.309',
  },
});
const sendEmail = (userData, otp, res) => {
  const mailOptions = {
    from: '"SHIPEASE" <f200204@cfd.nu.edu.pk>',
    to: userData.email,
    subject: 'OTP for Registration',
    text: `Your OTP for registration is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
    console.log('Email sent: ' + info.response);
  });
};

module.exports = { sendEmail };