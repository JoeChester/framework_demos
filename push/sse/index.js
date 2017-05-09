let express = require('express')
let SSE = require('sse-nodejs')
let chalk = require('chalk')
let cors = require('cors')
let moment = require('moment')

let app = express()
app.use(cors())

let nextClientId = 0

let clients = []

function rawBody(req, res, next) {
  req.setEncoding('utf8');
  req.rawBody = '';
  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function(){
    next();
  });
}
app.use(rawBody)

app.get("/sse", (req, res) =>{
    let serverSent = SSE(res)
    serverSent.clientId = nextClientId
    serverSent.disconnect(function () {
        for(let i in clients){
            if(clients[i].clientId == serverSent.clientId){
                console.log(
                chalk.grey("[" + moment().format('HH:mm:ss') + "] ") +
                    "disconnected: ", i
                )
                clients.splice(i,1)
            }
        }
    })
    nextClientId++
    req.connection.setTimeout(0)
    res.connection.setTimeout(0)
    clients.push(serverSent)
    console.log(
    chalk.grey("[" + moment().format('HH:mm:ss') + "] ") +
        "clientConnected: ", res.clientId
    )
})

//send broadcast
app.post("/sse", (req,res) =>{
    for(var i in clients){
        if(clients[i].sendEvent){
            console.log(
            chalk.grey("[" + moment().format('HH:mm:ss') + "] ") +
                "broadcast: ", req.rawBody, i
            )
            clients[i].sendEvent("broadcast", req.rawBody)
        }
    }
    res.sendStatus(200)
})

app.listen(4748, function(){
  console.log("");
  console.log(chalk.bold.green("B.Braun OnlineSuite Push Technology Evaluation - Express SSE"));
  console.log(
    chalk.grey("[" + moment().format('HH:mm:ss') + "] ")
    + 'Express SSE server is up and running'
    )
})