let chalk = require('chalk');
let schema = require('./models');

console.log("Migrating Database Models...");
schema.automigrate(function(){
    console.log(chalk.blue("Done! :)"));
    process.exit(0);
})