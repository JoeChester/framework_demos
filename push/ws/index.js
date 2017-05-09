const WebSocket = require('ws')
const moment = require('moment')
const chalk = require('chalk')

const wss = new WebSocket.Server({ port: 4750 });

let nextClientId = 0

function heartbeat() {
  this.isAlive = true;
}

// Broadcast to all.
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', function connection(ws) {
    ws.clientId = nextClientId
    console.log(
        chalk.grey("[" + moment().format('HH:mm:ss') + "] ") +
        "connected: ", ws.clientId
    )
    nextClientId++

    ws.isAlive = true;
    ws.on('pong', heartbeat);


    ws.on('message', function incoming(data) {
        // Broadcast to everyone else.
        console.log(
            chalk.grey("[" + moment().format('HH:mm:ss') + "] ") +
            "broadcasting: ", data
        )
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

    ws.on('close', function close() {
    console.log(
            chalk.grey("[" + moment().format('HH:mm:ss') + "] ") +
            "disconnected: ", ws.clientId
        )
    });
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping('', false, true);
  });
}, 30000);

console.log("");
console.log(chalk.bold.green("B.Braun OnlineSuite Push Technology Evaluation - WebSockets"));
console.log(
    chalk.grey("[" + moment().format('HH:mm:ss') + "] ")
    + 'WebSocket server is up and running'
)