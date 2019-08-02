const sgMail = require('@sendgrid/mail')

const sendgridAPIkey = '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'

sgMail.setApiKey(sendgridAPIkey)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'thalesbrunom@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the task manager app, ${name}. Let me know how you get along with the app.`
  })
}

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'thalesbrunom@gmail.com',
    subject: 'We will miss you',
    text: `We will miss you a lot, ${name}. Tell us why you are leaving out and we can do the things better! We hope you
    come back very soon!`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}