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

module.exports = {
  sendWelcomeEmail
}