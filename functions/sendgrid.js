const client = require('@sendgrid/mail')

client.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmail(client, message, senderEmail, senderName) {
  return new Promise((fulfill, reject) => {
    const data = {
      from: {
        email: senderEmail,
        name: senderName
      },
      subject: 'Netlify Function - Sendgrid Email',
      to: 'clive@theportman.co',
      html: `Hey, you\'ve sent an email from Netlify Functions<br/>Message: ${message}`
    }

    client
      .send(data)
      .then(([response, body]) => {
        fulfill(response)
      })
      .catch(error => reject(error))
  })
}

exports.handler = function(event, context, callback) {

  const body = JSON.parse(event.body)
  const message = body.message

  sendEmail(
    client,
    'This is a message',
    'clive@theportman.co',
    'Clive Portman'
  )
  .then(response => callback(null, { statusCode: response.statusCode }))
  .catch(err => callback(err, null))
}