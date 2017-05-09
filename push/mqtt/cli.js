var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')
 
client.on('connect', function () {
  client.publish('broadcast', 'I AM GROOT')
  client.end()
})