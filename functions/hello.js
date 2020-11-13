

// const headers = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'Content-Type',
//   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
// };




// exports.handler = function(event, context, callback) {

//   const {
//     SENDGRID_API_KEY,
//     SENDGRID_SENDER_EMAIL,
//     SENDGRID_SENDER_NAME
//   } = process.env

//   const data = event.queryStringParameters.data;
//   const jsonData = JSON.parse(data)


  
//   const json = {
//     "key": SENDGRID_API_KEY,
//     "email": SENDGRID_SENDER_EMAIL,
//     "name": SENDGRID_SENDER_NAME,
//     "firstname": jsonData.firstName
//   };


//   callback(null, {
//     statusCode: 200,
//     headers: headers,
//     body: JSON.stringify(json)
//   });

// };

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

import querystring from "querystring";

exports.handler = async (event, context, callback) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
    // const params = querystring.parse(event.body);
    const returnData = {
      "message": "Hi!"
    };
  callback(null, {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(returnData)
  });
};
