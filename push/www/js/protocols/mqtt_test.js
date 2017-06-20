var mqtt = {
    isActive: false,

    subscribe: function () {
        cordova.plugins.CordovaMqTTPlugin.subscribe({
            topic: "broadcast",
            qos: 2,
            success: function (s) {
                console.pushlog("Subscribed to the broadcast topic!");
                mqtt.isActive = true;
                setConnectedIndicator(true);
                cordova.plugins.CordovaMqTTPlugin.listen("broadcast", function (payload, params, topic, topic_pattern) {
                    console.pushlog("received event!");
                    console.log(topic);
                });
            },
            error: function (e) {
                console.pusherror("Error while subscribing to the broadcast topic!");
                mqtt.stop();
            }
        });
    },

    start: function (ip, ping) {

        ip = ip || "192.168.100.50:1883";
        ping = ping || 10;

        var address = ip.split(':');
        console.pushlog("Starting MQTT Client to port " + address[1]);

        var deviceId = "pushEval_" + getRandomInt(0, 10000);

        cordova.plugins.CordovaMqTTPlugin.connect({
            url: "tcp://" + address[0],
            port: address[1],
            connectionTimeout: 3000,
            keepAlive: ping,
            clientId: deviceId,
            success: function (s) {
                console.pushlog("MQTT Connection established!");
                mqtt.subscribe();
            },
            error: function (e) {
                connectionLost("Error while connecting to the MQTT Broker!", "MQTT");
                mqtt.stop();
            },
            onConnectionLost: function () {
                connectionLost("The connection to the MQTT Broker was lost!", "MQTT");
                mqtt.stop();
            },

            onPublish: function(destination, payload){
                notify(payload, "MQTT");
            },

            routerConfig: {
                useDefaultRouter: true
            }
        })
    },
    stop: function () {
        cordova.plugins.CordovaMqTTPlugin.disconnect({
            success: function (s) {
                console.pusherror("Disconnected from the MQTT Broker.");
                
            },
            error: function (e) {
                console.pusherror("Ungraceful Disconnect..");
            }
        });
        mqtt.isActive = false;
        setConnectedIndicator(false);
    }
}

