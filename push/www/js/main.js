var app = new Framework7({
    pushState: true,
    allowDuplicateUrls: true
});
var $$ = Dom7;
var mainView = app.addView('.view-main', {
    domCache: true,
    allowDuplicateUrls: true
});

var protocols = {
    "fcm": fcm,
    "ws" : ws,
    "sse": sse,
    "mqtt": mqtt,
    "poll": poll
}

function start(){
    var ip = $$('#ipinput')[0].value;
    var ping = $$('#pinginput')[0].value;
    var type = $$('input[name=protocol]:checked')[0].value;
    console.pushlog("Selected " + type + " on " + (ip || "default") + " (with Ping " + (ping || "10") + ")");
    app.closeModal('.popup-settings');

    if(currentProtocol){
        if(currentProtocol.isActive){
            currentProtocol.stop();
        }
    }

    currentProtocol = protocols[type];

    if(currentProtocol){
        currentProtocol.start(ip, ping);
    }
    
    //if(type != "fcm"){
    startBackgroundMode();
    //}
}

function stop(){
    console.log("stopping");
    app.closeModal('.popup-settings');
    if(currentProtocol){
        currentProtocol.stop();
    }
    stopBackgroundMode();
}

function qr(){
    if(!hasCordova()){
        console.pusherror("QR Code Scanning is only available in Cordova mode!");
        return;
    }
    cordova.plugins.barcodeScanner.scan(
      function (result) {
          if(result.cancelled){
              console.pusherror("The Scan was cancelled!");
              return;
          }
          console.pushlog("Code Format: " + result.format);
          console.pushmsg(result.text)
      },
      function (error) {
          console.pusherror("Scanning failed: " + error);
      },
      {
          preferFrontCamera : false, 
          showFlipCameraButton : true, 
          showTorchButton : true, 
          torchOn: false, 
          prompt : "", 
          resultDisplayDuration: 0, 
          orientation : "portrait",
          disableAnimations : true, 
          disableSuccessBeep: false
      }
   );
}

function init(){
    initializeBackgroundMode();
    registerBatteryCallbacks();
    registerFcmCallbacks();
}

console.pushlog("Created with ❤ by Jonas Kleinkauf @ B.Braun Melsungen AG");
console.pushmsg("Welcome to the OnlineSuite Push Eval Debug App!");
document.addEventListener("deviceready", init, false);