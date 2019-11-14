exports.handler = async (event) => {
  console.log(JSON.stringify(event, 2));

  let echo = '';
  let connectionId = '';
  try {
    const message = JSON.parse(event.body);
    console.log(message);
    echo = message.echo || '';

    connectionId = event.requestContext.connectionId;
    console.log(connectionId);
  } catch (e) {
    console.log(e);
  }
  return {
    body: 'Echoing your message: ' + echo
  };
};
