var ws = {

    heartbeatPayload : '.',
    isActive: false,

    onmessage: function (e) {
        if (e.data == ws.heartbeatPayload) {
            registerPing("Ping", "WebSocket");
            this.send(ws.heartbeatPayload);
            return;
        }
        notify(e.data, "WebSocket");
    },

    onerror: function (e) {
        console.pusherror("An Error occurred during the WebSocket connection!");
        setConnectedIndicator(false);
    },

    onclose: function (e) {
        connectionLost("WebSocket connection closed. Code:" + e.code, "WebSocket");
        ws.isActive = false;
        setConnectedIndicator(false);
    },

    onopen: function () {
        pingCount = 0;
        console.pushlog('Connected to WebSocket');
        setConnectedIndicator(true);
    },

    start: function (ip, ping) {
        
        ip = ip || "192.168.100.50:4750";
        ping = ping || 10;
        
        console.pushlog('Starting WebSocket connection...');

        this.socket = new WebSocket('ws://' + ip);
        this.isActive = true;

        this.socket.onopen = this.onopen;
        this.socket.onmessage = this.onmessage;
        this.socket.onerror = this.onerror;
        this.socket.onclose = this.onclose;
    },

    stop: function () {
        if (this.socket) {
            if (this.socket.readyState === this.socket.CONNECTING ||
                this.socket.readyState === this.socket.OPEN) {
                this.socket.close();
                this.isActive = false;
                console.pushlog("Closing WebSocket connection...");
            }
        }
    }
}