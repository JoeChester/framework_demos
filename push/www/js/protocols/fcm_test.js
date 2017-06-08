function registerFcmCallbacks() {
    FCMPlugin.onNotification(function (data) {
        if (data.wasTapped) {
            console.pushmsg(data.content);
        } else {
            console.pushmsg(data.content);
        }
    });

    FCMPlugin.subscribeToTopic("broadcast");
}

var fcm = {

    start: function (ip, ping) {
        console.pushlog("Registering FCM Token Callbacks");
        FCMPlugin.onTokenRefresh(function (token) {
            console.pushmsg("FCM Token Refreshed: " + token);
        });
        FCMPlugin.getToken(function (token) {
            console.pushlog("FCM Token: " + token);
        });
    },

    stop: function () {
        console.pusherror("Unregistering FCM Token Callbacks");
        FCMPlugin.onTokenRefresh(function (token) {
            return;
        });
        FCMPlugin.getToken(function (token) {
            return;
        });
    }
};