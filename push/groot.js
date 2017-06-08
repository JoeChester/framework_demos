const spawn = require( 'child_process' ).spawn;
const chalk = require('chalk');

spawn( 'node', ['ws/cli.js'] )
spawn( 'node', ['sse/cli.js'] )
spawn( 'node', ['mqtt/cli.js'] )
spawn( 'node', ['poll/cli.js'] )

console.log(chalk.yellow("I AM GROOT"), chalk.red("#"));