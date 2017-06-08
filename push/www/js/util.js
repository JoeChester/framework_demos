var pingCount = 0;
var currentProtocol = null;

function hasCordova() {
    if (typeof cordova !== 'undefined') {
        return true;
    }
    return false;
}

function getConsoleTimestamp() {
    var timestamp = "[" + moment().format("HH:mm:ss") + "] ";
    return timestamp;
}

console.pushlog = function (obj) {
    var timestamp = getConsoleTimestamp();
    console.log(timestamp);
    console.log(obj);
    $$('#pushlog').prepend('<span class="console-timestamp">' + timestamp + '</span>' + obj + "<br>");
}

console.pusherror = function (obj) {
    var timestamp = getConsoleTimestamp();
    console.error(timestamp);
    console.error(obj);
    $$('#pushlog').prepend('<span class="console-timestamp">' + timestamp + '</span><span class="console-error">' + obj + "</span><br>");
}

console.pushmsg = function (obj) {
    var timestamp = getConsoleTimestamp();
    console.warn(timestamp);
    console.warn(obj);
    $$('#pushlog').prepend('<span class="console-timestamp">' + timestamp + '</span><span class="console-message">' + obj + "</span><br>");
}

function setConnectedIndicator(connected) {
    if (connected) {
        $$('#active-indicator').addClass("active");
        $$('#active-indicator').removeClass("inactive");

        var type = $$('input[name=protocol]:checked')[0].value;
        if(type != null){
            $$('#type-indicator').html(type);
        }
        
    } else {
        $$('#active-indicator').addClass("inactive");
        $$('#active-indicator').removeClass("active");
        $$('#type-indicator').html("");
    }
}

function initializeBackgroundMode() {
    if (hasCordova()) {
        console.pushmsg("App is running on Cordova. Native Device Functionalities are enabled!");
        cordova.plugins.backgroundMode.setDefaults({
            title: "Running in Background Mode",
            text: "Initializing",
            icon: 'fcm_push_icon',
            color: "00B482",
            silent: false
        });
        cordova.plugins.backgroundMode.overrideBackButton();
        cordova.plugins.backgroundMode.disableWebViewOptimizations();
        cordova.plugins.backgroundMode.excludeFromTaskList();
    }
}

function startBackgroundMode() {
    if (hasCordova()) {
        pingCount = 0;
        console.log("starting background mode");
        cordova.plugins.backgroundMode.enable();
        cordova.plugins.notification.badge.registerPermission();
    }
}

function stopBackgroundMode() {
    if (hasCordova()) {
        console.log("stopping background mode");
        cordova.plugins.backgroundMode.disable();
        cordova.plugins.notification.badge.clear();
    }
}

function registerPing(term, type) {
    pingCount++;
    console.pushlog(term + " " + pingCount);
    if (hasCordova()) {
        cordova.plugins.backgroundMode.configure({ text: getConsoleTimestamp() + type + " " + term + " " + "Count: " + pingCount });
    }
}

function notify(msg, type) {
    console.pushmsg(msg);
    if (hasCordova()) {
        cordova.plugins.notification.local.schedule({
            id: pingCount,
            title: msg,
            text: "Push Notification from " + type,
            led: "00FFFF",
            icon: 'fcm_push_icon',
            color: '00B482'
        });
    }
}

function connectionLost(msg, type) {
    console.pusherror(msg);
    if (hasCordova()) {
        cordova.plugins.notification.local.schedule({
            id: pingCount,
            title: "Error! (" + type + ")",
            text: msg,
            led: "FF0000",
            icon: 'fcm_push_icon',
            color: 'C5004B'
        });
    }
}