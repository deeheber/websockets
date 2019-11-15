const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

const { TABLE_NAME } = process.env;

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));
  let connectionData;

  try {
    connectionData = await ddb.scan({ TableName: TABLE_NAME, ProjectionExpression: 'id' }).promise();
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }

  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: process.env.API_CONNECTIONS_ENDPOINT
  });

  const eventType = event.Records[0].eventName;
  let message = '';

  if (eventType === 'ObjectRemoved:Delete') {
    message = 'Translation removed from s3 bucket';
  } else if (eventType === 'ObjectCreated:Put') {
    message = 'Translation complete and put in s3 buckt';
  }

  const postData = {
    bucketName: event.Records[0].s3.bucket.name,
    bucketKey: event.Records[0].s3.object.key,
    message
  };

  console.log('Post data is: ', JSON.stringify(postData));

  const postCalls = connectionData.Items.map(async ({ id }) => {
    try {
      console.log(`Sending to connection: ${id}`);
      await apigwManagementApi.postToConnection({ ConnectionId: id, Data: JSON.stringify(postData) }).promise();
    } catch (e) {
      if (e.statusCode === 410) {
        console.log(`Found stale connection, deleting ${id}`);
        await ddb.delete({ TableName: TABLE_NAME, Key: { id } }).promise();
      } else {
        throw e;
      }
    }
  });

  try {
    await Promise.all(postCalls);
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }

  return { statusCode: 200, body: 'Data sent.' };
};
