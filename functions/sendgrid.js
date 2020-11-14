const client = require('@sendgrid/mail')
//let parse = require( 'body-parser')

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

  console.log(event)

  const body = JSON.parse(event.body)
  const message = body.message

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };

  sendEmail(
    client,
    message,
    'clive@theportman.co',
    'Clive Portman'
  )
  .then(response => callback(null, { 
    statusCode: response.statusCode,  
    headers: headers,
    body: JSON.stringify({"Success": true})
   }))
  .catch(err => callback(err, null))
}