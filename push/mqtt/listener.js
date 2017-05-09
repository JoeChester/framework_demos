var mqtt = require('mqtt')
var client  = mqtt.connect('tcp://localhost:1883')
 
client.on('connect', function () {
  client.subscribe('broadcast')
})
 
client.on('message', function (topic, message) {
  // message is Buffer 
  console.log(message.toString())
})