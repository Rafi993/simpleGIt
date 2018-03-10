#!/usr/bin/env node

const gitHashObject = require('./githashobject').gitHashObject

// Lib imports
const commandLine = require('./commandLine').commandLine;
const chalk = require('chalk')

// Local imports
const gitinit = require('./gitinit').init;
const gitAdd = require('./gitadd').add;

// Parsing command line args
const parsedArgs = commandLine(process.argv);

// Executing handlers for respective sub-commands
switch (parsedArgs.type) {
  case 'init': gitinit(parsedArgs.val); break;
  case 'add': gitAdd(parsedArgs.val); break;
  case 'hash-object': gitHashObject(parsedArgs.val); break
  case 'error':
    console.log(chalk.yellow(parsedArgs.val)) ;break;
}
