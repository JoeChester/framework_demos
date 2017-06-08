const chalk = require('chalk');

const info = chalk.cyan;
const error = chalk.bold.red;

const spawn = require( 'child_process' ).spawn;
const logcat = spawn( 'adb', ['-s', 'model:HTC_10', 'logcat', 'chromium:V','*:S'] );

logcat.stdout.on( 'data', data => {

    if(data.includes("Error")){
        console.log(error(data));
    } else {
        console.log(info(data));
    }
});

logcat.stderr.on( 'data', data => {
    console.log(error(data));
});

logcat.on( 'close', code => {
    console.log(error("Logcat exited with code " + code));
});