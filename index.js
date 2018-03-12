#!/usr/bin/env node

// Lib imports
const chalk = require('chalk')

// Local imports
const gitinit = require('./gitinit').init;
const gitAdd = require('./gitadd').add;
const commandLine = require('./commandLine').commandLine;
const gitHashObject = require('./githashobject').gitHashObject
const gitCommit = require('./gitcommit').gitCommit

// Parsing command line args
const parsedArgs = commandLine(process.argv);

// Executing handlers for respective sub-commands
const subCommands = {
  'init': gitinit,
  'add': gitAdd,
  'hash-object': gitHashObject,
  'commit': gitCommit,
  'warn': warn=> console.log(chalk.yellow(warn)),
  'error': err=> console.error(chalk.red(err))
}

// Executing sub-command
subCommands[parsedArgs.type](parsedArgs.val)
