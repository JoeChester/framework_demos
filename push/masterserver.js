const spawn = require( 'child_process' ).spawn;
const chalk = require('chalk');

const sse = spawn( 'node', ['sse/index.js'] );

const servers = {
    "ws": {
        color: chalk.yellow,
        process: spawn( 'node', ['ws/index.js'] )
    },
    "sse": {
        color: chalk.green,
        process: spawn( 'node', ['sse/index.js'] )
    },

    "mqtt": {
        color: chalk.magenta,
        process: spawn( 'node', ['mqtt/index.js'] )
    },
    "poll":{
        color: chalk.blue,
        process: spawn( 'node', ['poll/index.js'] )
    }
}

for(let i in servers){
    servers[i].process.stdout.on( 'data', data => {
        console.log(i, servers[i].color(data.toString()));
    });

    servers[i].process.stderr.on( 'data', data => {
        console.log(i, servers[i].color(data.toString()));
    });

    servers[i].process.on( 'close', code => {
        console.log(i, servers[i].color("Exited with code " + code));
    });
}