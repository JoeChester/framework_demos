var sse = {

    isActive: false,
    es: null,

    heartbeatPayload : '.',

    onOpen: function(){
        setConnectedIndicator(true);
        sse.isActive = true;
        console.pushlog("Connected to the EventSource");
    },

    onMessage: function(msg){
        notify(msg.data, "Server Sent Events");
    },

    onPing: function(msg){
        if(msg.data == sse.heartbeatPayload){
            registerPing("Ping", "Server Sent Events");
        }
    },

    onError: function(){
        connectionLost("An Error Occurred while connecting to the EventSource!", "Server Sent Events");
        sse.stop();
    },    

    start: function(ip, ping){

        ip = ip || "192.168.100.50:4748";
        ping = ping || 10;

        console.pushlog('Starting Server Sent Events Listener...');
        var url = "http://" + ip + "/sse";
        this.es = new EventSource(url);
        this.es.onopen = this.onOpen;
        this.es.onmessage = this.onMessage;
        this.es.onerror = this.onError;
        this.es.addEventListener('broadcast', this.onMessage);
        this.es.addEventListener('ping', this.onPing);
    },

    stop: function(){
        this.es.close();
        this.isActive = false;
        setConnectedIndicator(false);
        console.pusherror("Stopping Server Sent Events Listener...");
    }
}