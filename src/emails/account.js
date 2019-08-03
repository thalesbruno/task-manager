const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'thalesbrunom@gmail.com',
    subject: 'Welcome',
    text: `Welcome, ${name}! We hope you enjoy our app.`
  })
}

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'thalesbrunom@gmail.com',
    subject: 'We will miss you',
    text: `Bye, ${name}. We hope to see you very soon.`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}