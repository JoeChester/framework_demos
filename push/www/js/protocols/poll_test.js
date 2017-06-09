var poll = {
    isActive: false,
    id: null,
    interval: null,
    ip: null,

    poll: function () {
        $$.ajax({
            method: 'get',
            url: 'http://' + poll.ip + '/poll/' + poll.id,
            success: function (data, statusCode, xhr) {
                registerPing("Poll", "HTTP Polling");
                var msgs = JSON.parse(data);
                for (var i in msgs) {
                    notify(msgs[i], "HTTP Polling");
                }
            },
            error: function (xhr, status) {
                clearInterval(poll.interval);
                setConnectedIndicator(false);
                poll.isActive = false;
                connectionLost("Disconnected from HTTP Polling Server", "HTTP Polling");
            }
        });
    },

    start: function (ip, ping) {

        ip = ip || "192.168.100.50:4751";
        ping = ping || 10;

        console.pushlog('Starting HTTP Polling...');
        poll.ip = ip;
        var regUrl = 'http://' + poll.ip + '/reg/';
        pingCount = 0;

        //register
        $$.ajax({
            method: 'post',
            url: regUrl,
            success: function (data, status, xhr) {
                poll.id = JSON.parse(data).id;
                poll.interval = setInterval(poll.poll, ping * 1000);
                setConnectedIndicator(true);
                poll.isActive = true;
                console.pushlog("Registered HTTP Polling Client with ID " + poll.id);
            },
            error: function (xhr, status) {
                poll.isActive = false;
                setConnectedIndicator(false);
                if (poll.interval != null) {
                    clearInterval(poll.interval);
                }
                console.pusherror("An error occurred during the HTTP Polling registration. Code:" + status);
            }
        });
    },

    stop: function () {
        console.pusherror("Stopping HTTP Polling...");
        clearInterval(poll.interval);
        setConnectedIndicator(false);
    }
}

