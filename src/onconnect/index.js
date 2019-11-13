const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  let statusCode;
  let response;

  try {
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: event.requestContext.connectionId,
        timestamp: Date.now()
      }
    };

    console.log(`Adding ID ${event.requestContext.connectionId} to table ${process.env.TABLE_NAME}`);
    await dynamodb.put(params).promise();
    console.log('SUCCESS ADDING TO TABLE');

    statusCode = 200;
    response = `${params} connected`;
  } catch (err) {
    statusCode = err.statusCode || 500;
    response = err.message;
  }

  return {
    statusCode,
    body: JSON.stringify(response)
  };
};
