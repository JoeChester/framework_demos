let express = require('express')
let chalk = require('chalk')
let cors = require('cors')
let moment = require('moment')

let app = express()
app.use(cors())

let broadcast = []

let nextClientId = 0

function rawBody(req, res, next) {
    req.setEncoding('utf8');
    req.rawBody = '';
    req.on('data', function (chunk) {
        req.rawBody += chunk;
    });
    req.on('end', function () {
        next();
    });
}
app.use(rawBody)

app.get("/poll/:clientId", (req, res) => {
    console.log(
        chalk.grey("[" + moment().format('HH:mm:ss') + "] ") +
        "poll: ", req.params.clientId
    )
    let msgs = broadcast[req.params.clientId]
    broadcast[req.params.clientId] = []
    res.json(msgs)
})

app.post("/reg", (req, res) => {
    let clientId = nextClientId
    console.log(
        chalk.grey("[" + moment().format('HH:mm:ss') + "] ") +
        "reg: ", clientId
    )
    broadcast[clientId] = [];
    nextClientId++
    res.json({ id: clientId })
})

app.post("/broadcast", (req, res) => {
    console.log(
        chalk.grey("[" + moment().format('HH:mm:ss') + "] ") +
        "broadcast: ", req.rawBody
    )
    for (let i in broadcast) {
        broadcast[i].push(req.rawBody)
    }
    res.sendStatus(200)
})

app.listen(4751, function () {
    console.log("");
    console.log(chalk.bold.green("B.Braun OnlineSuite Push Technology Evaluation - HTTP Polling"));
    console.log(
        chalk.grey("[" + moment().format('HH:mm:ss') + "] ")
        + 'Express HTTP Polling server is up and running'
    )
})