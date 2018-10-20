#!/usr/bin/env node

// Lib imports
const chalk = require("chalk");

// Local imports
const { init } = require("./gitinit");
const { add } = require("./gitadd");
const { rm } = require("./gitrm");
const { commandLine } = require("./commandLine");
const { hashObject } = require("./githashobject");
const { commit } = require("./gitcommit");

// Parsing command line args
const parsedArgs = commandLine(process.argv);

// Executing handlers for respective sub-commands
const subCommands = {
  init,
  add,
  add,
  "hash-object": hashObject,
  commit,
  warn: warn => console.log(chalk.yellow(warn)),
  error: err => console.error(chalk.red(err))
};

// Executing sub-command
const command = subCommands[parsedArgs.type];

if (command) {
  command(parsedArgs.val);
} else {
  console.error(
    `Please use one of the following commands\n\n${Object.keys(
      subCommands
    ).join(",\n")}\n`
  );
}
