const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4750', {});

ws.on('open', function open() {
  ws.send("I AM GROOT")
  ws.close()
});