const WebSocket = require('ws')
const moment = require('moment')
const chalk = require('chalk')

const wss = new WebSocket.Server({ port: 4750 });

const heartbeatPayload = '.';

let nextClientId = 0

let pingIntervalSeconds = 2;

function heartbeat(ws) {
  ws.isAlive = true;
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

    ws.on('message', function incoming(data) {
        if(data == heartbeatPayload){
            heartbeat(this);
            return;
        }
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
    ws.send(heartbeatPayload);
  });
}, pingIntervalSeconds * 1000);

console.log("");
console.log(chalk.bold.green("B.Braun OnlineSuite Push Technology Evaluation - WebSockets"));
console.log(
    chalk.grey("[" + moment().format('HH:mm:ss') + "] ")
    + 'WebSocket server is up and running on port 4750'
)