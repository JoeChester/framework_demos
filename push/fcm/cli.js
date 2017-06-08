var request = require("request");
var api_key = require("./secrets.json").api_key;

var options = { method: 'POST',
  url: 'https://fcm.googleapis.com/fcm/send',
  'proxy':'http://165.225.72.41:10127',
  headers: 
   {
     'content-type': 'application/json',
     'authorization': 'key=' + api_key },
  body: 
   { notification: 
      { title: 'I AM GROOT 🍁',
        body: 'Push Notification from FCM',
        click_action: 'FCM_PLUGIN_ACTIVITY',
        icon: 'fcm_push_icon',
        color: '#00B482' 
    },
     data: { content: 'I AM GROOT 🍁' },
     to: '/topics/broadcast',
     priority: 'high' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
