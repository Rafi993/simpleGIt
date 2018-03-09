#!/usr/bin/env node

// Lib imports
const commandLine = require('./commandLine').commandLine;
const chalk = require('chalk')

// Local imports
const gitinit = require('./gitinit').init;

// Parsing command line args
const parsedArgs = commandLine(process.argv);

// Executing handlers for respective sub-commands
switch (parsedArgs.type) {
  case 'init':
    gitinit(parsedArgs.val); break;
  case 'error':
    console.log(chalk.yellow(parsedArgs.val)) ;break;
}
