let axios = require('axios')

let id = null

let poller

function poll() {
    axios.get('http://localhost:4751/poll/' + id)
        .then(function (response) {
            let msgs = response.data
            for (let i in msgs) {
                console.log(msgs[i]);
            }
        })
        .catch(function (error) {
            console.log("disconnected");
            clearInterval(poller)
        });
}

//register
axios({
    method: 'post',
    url: 'http://localhost:4751/reg'
}).then((response) => {
    console.log("connected")
    id = response.data.id
})
    .catch((error) => {
        console.log(error)
    });

poller = setInterval(poll, 3000)