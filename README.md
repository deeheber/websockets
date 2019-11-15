# Websocket Example

## Why Websockets???
- Websockets are helpful when you need to have two way direction between an application and client
- Use case in this example: receiving a web notification when an item is removed or put into an s3 bucket
- Very useful when making an http call that takes a while to process for example using AWS Polly or AWS translate

## Directions to Run
1. Deploy the app. It's recommended to use [Stackery](https://www.stackery.io/)
2. Add the following to `src/frontend/src/config.js`
  ```
  export default {
    connection: < WEBSOCKET URL HERE STARTING WITH wss: >
  };
  ```
3. `cd src/frontend/src` && `npm install` && `npm start`
4. Open browser console
5. Add and remove items from the s3 bucket via the AWS console and see the messages in your browser console

## Additional resources
- [AWS example app](https://github.com/aws-samples/simple-websockets-chat-app)
- [Building a serverless Websocket server with Stackery](https://aws.amazon.com/blogs/apn/building-a-simple-serverless-websocket-with-stackery-and-aws/)
- [React and websocket example](https://blog.bitlabstudio.com/a-simple-chat-app-with-react-node-and-websocket-35d3c9835807)
