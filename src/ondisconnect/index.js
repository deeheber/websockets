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
      Key: {
        id: event.requestContext.connectionId
      }
    };

    console.log(`Deleting ID ${event.requestContext.connectionId} from table ${process.env.TABLE_NAME}`);
    await dynamodb.delete(params).promise();
    console.log('SUCCESS DELETING FROM TABLE');

    statusCode = 200;
    response = `${params} disconnected`;
  } catch (err) {
    statusCode = err.statusCode || 500;
    response = err.message;
  }

  return {
    statusCode,
    body: JSON.stringify(response)
  };
};
