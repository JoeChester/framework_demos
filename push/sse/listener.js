let EventSource = require('eventsource')

let es = new EventSource("http://localhost:4748/sse")

es.onmessage = function(msg){
    console.log("msg")
    console.log(msg)
}

es.onerror = function(){
    console.error("error")
}

es.onopen = function(){
    console.log("open")
}

es.addEventListener('broadcast', function (msg) {
    console.log("broadcast", msg.data)
})