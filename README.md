# Websocket Test

AWS example app https://github.com/aws-samples/simple-websockets-chat-app
https://blog.bitlabstudio.com/a-simple-chat-app-with-react-node-and-websocket-35d3c9835807
https://aws.amazon.com/blogs/apn/building-a-simple-serverless-websocket-with-stackery-and-aws/

Frontend
Add the following to `src/frontend/src/config.js`

```
export default {
  connection: < WEBSOCKET URL HERE STARTING WITH wss: >
};
```
