#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const { Spinner } = require('clui');
const figlet = require('figlet');

const config = require('./config');
const inquire = require('./inquire')(config);
const commands = require('./commands')(config);

clear();
console.log(`
  ${chalk.greenBright(
      figlet.textSync('gpsg', { horizontalLayout: 'full' })
  )}\n    global project \n\tscaffold generator ${config.version}
  \nType "help" for more information.
`);

async function run() {
  let command = await inquire.commandPrompt(); 
  let args = command.cmdline.split(' ');
  if (args.length > 0 && args[0].length > 0) {
    if (Object.keys(commands).includes(args[0])) {
      commands[args[0]](args);
    } else {
      console.log(`-${config.name}: ${args[0]}: command not found`);
    }
  }
  run();
}

const argv = require('minimist')(process.argv.slice(2));
console.log(argv);
run();