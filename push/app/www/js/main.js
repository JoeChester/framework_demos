var app = new Framework7({
    pushState: true,
    allowDuplicateUrls: true
});
var $$ = Dom7;
var mainView = app.addView('.view-main', {
    domCache: true,
    allowDuplicateUrls: true
});

console.pushlog = function(obj){
    console.log(obj);
    $$('#pushlog').prepend(obj + "<br>")
}

function start(){
    var ip = $$('#ipinput')[0].value;
    var type = $$('input[name=protocol]:checked')[0].value;
    console.log("start - " + type + " on " + ip);
    app.closeModal('.popup-settings');
}

function stop(){
    console.log("stopping");
    app.closeModal('.popup-settings');
}