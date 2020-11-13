

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};


const {
  SENDGRID_API_KEY,
  SENDGRID_SENDER_EMAIL,
  SENDGRID_SENDER_NAME
} = process.env

const json = [{
  "key": SENDGRID_API_KEY,
  "email": SENDGRID_SENDER_EMAIL,
  "name": SENDGRID_SENDER_NAME
}];

exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(json)
  });
};

