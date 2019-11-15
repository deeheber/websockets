import React, { Component } from 'react';
import config from './config';

class App extends Component {
  state = {
    ws: new WebSocket(config.connection)
  };

  componentDidMount() {
    this.connect();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.ws !== this.state.ws) {
      console.log('new websocket initialized');
      this.connect();
    }
  }

  connect = () => {
    const { ws } = this.state;

    ws.onopen = () => {
        console.log('websocket connected');
    };

    ws.onmessage = event => {
      console.log('webSocket message received');
      console.log(event.data);
    };

    ws.onclose = event => {
      console.log('onclose event called: websocket disconnected');
      console.log(event);
      this.setState({
        ws: new WebSocket(config.connection)
      });
    };

    ws.onerror = err => {
      console.log('onerror event called: closing websocket');
      console.log(err);
      ws.close();
    };
  };

  sendMessage = () => {
    const { ws } = this.state;
    console.log('Sending message...');
    // Update the message here
    // Ideally would be dynamic from a form or something
    const message = { action: 'echomessage', data: 'Hello world' };
    ws.send(JSON.stringify(message));
  };

  render() {
    return (
      <div>
          <h1>Open up your browser console</h1>
          <button onClick={this.sendMessage}>Send message</button>
      </div>
    );
  }
}

export default App;
