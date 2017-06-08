const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4750', {});

const heartbeatPayload = '.';

ws.on('open', function open() {
  console.log('connected');
});

ws.on('close', function close() {
  console.log('disconnected');
});

ws.on('message', function incoming(data, flags) {
    if(data == heartbeatPayload){
      console.log("received ping");
      ws.send(heartbeatPayload);
      return;
    }
    console.log(data)
});