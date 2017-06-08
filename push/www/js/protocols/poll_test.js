var poll = {
    isActive: false,
    id: null,
    interval: null,
    ip: null,

    poll: function () {
        axios.get('http://' + poll.ip + '/poll/' + poll.id)
            .then(function (response) {
                registerPing("Poll", "HTTP Polling");
                let msgs = response.data
                for (let i in msgs) {
                    notify(msgs[i], "HTTP Polling");
                }
            })
            .catch(function (error) {
                clearInterval(poll.interval);
                setConnectedIndicator(false);
                poll.isActive = false;
                connectionLost("Disconnected from HTTP Polling Server", "HTTP Polling");
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
        //register
        axios({
            method: 'post',
            url: regUrl
        }).then((response) => {
            poll.id = response.data.id
            poll.interval = setInterval(poll.poll, 3000)
            setConnectedIndicator(true);
            poll.isActive = true;
            console.pushlog("Registered HTTP Polling Client with ID " + poll.id);
        }).catch((error) => {
            poll.isActive = false;
            setConnectedIndicator(false);
            if(poll.interval != null){
                clearInterval(poll.interval);
            }
            console.pusherror(error)
        });
    },

    stop: function () {
        console.pusherror("Stopping HTTP Polling...");
        clearInterval(poll.interval);
        setConnectedIndicator(false);
    }
}

