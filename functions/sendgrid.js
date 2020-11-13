const client = require("@sendgrid/mail")

function sendEmail(client, message, senderEmail, senderName) {
  return new Promise((fulfill, reject) => {
    const data = {
      from: {
        email: senderEmail,
        name: senderName
      },
      subject: 'Netlify Function - Sendgrid Email',
      to: 'your.email@here.com',
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

  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };

  console.log(event)
  console.log(event.body)

  const {
    SENDGRID_API_KEY,
    SENDGRID_SENDER_EMAIL,
    SENDGRID_SENDER_NAME
  } = process.env

  const message = "Hello"

  const returnData = {
    "message": "Hi!"
  };

  callback(null, {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(returnData)
  });

  client.setApiKey(SENDGRID_API_KEY)

  sendEmail(
    client,
    message,
    SENDGRID_SENDER_EMAIL,
    SENDGRID_SENDER_NAME
  )
  .then(response => callback(null, { statusCode: response.statusCode }))
  .catch(err => callback(err, null))
}