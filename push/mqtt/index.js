var mosca = require('mosca')
const moment = require('moment')
const chalk = require('chalk')

var ascoltatore = {
  type: 'redis',
  redis: require('redis'),
  db: 12,
  port: 6379,
  return_buffers: true, // to handle binary payloads
  host: "localhost"
};

var moscaSettings = {
  port: 1883,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Redis
  }
};

var server = new mosca.Server(moscaSettings);
server.on('ready', setup)

server.on('clientConnected', function(client) {
  console.log(
    chalk.grey("[" + moment().format('HH:mm:ss') + "] ") +
    "clientConnected: ", client.id
  )
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log(
    chalk.grey("[" + moment().format('HH:mm:ss') + "] ") +
    "published: ", packet.topic, packet.payload.toString("ascii")
  )
});

server.on('clientDisconnecting', function(client) {
  console.log(
    chalk.grey("[" + moment().format('HH:mm:ss') + "] ") +
    "clientDisconnecting: ", client.id
  )
});

server.on('clientDisconnected', function(client) {
  console.log(
    chalk.grey("[" + moment().format('HH:mm:ss') + "] ") +
    "clientDisconnected: ", client.id
  )
});

server.on('clientError', function(client) {
  console.log(
    chalk.grey("[" + moment().format('HH:mm:ss') + "] ") +
    "clientError: ", client.id
  )
});

server.on('subscribed', function(topic, client) {
  console.log(
    chalk.grey("[" + moment().format('HH:mm:ss') + "] ") +
    "subscribed: ", topic, client.id
  )
});

server.on('unsubscribed', function(topic, client) {
  console.log(
    chalk.grey("[" + moment().format('HH:mm:ss') + "] ") +
    "unsubscribed: ", topic, client.id
  )
});

// fired when the mqtt server is ready
function setup() {
  console.log("");
  console.log(chalk.bold.green("B.Braun OnlineSuite Push Technology Evaluation - Mosca MQTT"));
  console.log(
    chalk.grey("[" + moment().format('HH:mm:ss') + "] ")
    + 'Mosca MQTT server is up and running'
    )
}