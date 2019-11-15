# Websocket Example

## Why Websockets???
- Websockets are helpful when you need to have two way direction between an application and client
- Use case in this example: receiving a web notification when an item is removed or put into an s3 bucket
- Very useful when making an http call that takes a while to process for example using AWS Polly or AWS translate
- Very common use case is for chat applications

## Architecture
![Image](https://user-images.githubusercontent.com/12616554/68907730-b1efd980-06fd-11ea-9fee-bf2e49ba59a5.png)

## Directions to Run
1. Deploy the app. It's recommended to use [Stackery](https://www.stackery.io/)
2. Find your [websocket URL](https://docs.stackery.io/docs/api/nodes/WebSocketApi/#environment-variables), create a file called `config.js` at `src/frontend/src/config.js`, and add the following:
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
