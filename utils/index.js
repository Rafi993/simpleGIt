const fse = require("fs-extra");
const chalk = require("chalk");

// Function will check if a directory exists
const isItDir = directory =>
  new Promise((res, rej) => {
    fse.stat(directory, (err, stats) => {
      //Check if error defined and the error code is "not exists"
      if (err && err.errno === -2) {
        //Create the directory, call the callback.
        res(false);
      } else {
        //just in case there was a different error:
        rej(false);
        console.log(chalk.red(`\n Error in ${err}`));
      }
    });
  });

// Function will check if a directory exists, and create it if it doesn't
const createDir = directory =>
  new Promise(async (res, rej) => {
    const isItDirectory = await isItDir(directory);
    if (isItDirectory) {
      console.log(
        chalk.yellow(
          `\n The ${repo} Directory already exist please try a new name`
        )
      );
      res(true);
    } else {
      try {
        await fse.mkdir(directory);
        res(true);
      } catch (e) {
        console.log(chalk.yellow(`\n The error in creating ${directory}`));
        rej(false);
      }
    }
  });

const copy = (src, dest) =>
  new Promise(async (res, rej) => {
    const isItDirectory = await isItDir(dest);
    if (isItDirectory) {
      console.log(chalk.yellow(`\n The ${dest} is already there`));
      res(true);
    } else {
      try {
        await fse.copy(src, dest);
        res(true);
      } catch (e) {
        rej(false);
      }
    }
  });

// Copy contents recursively

module.exports = {
  isItDir,
  createDir,
  copy
};
