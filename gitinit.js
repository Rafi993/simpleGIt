const fse = require("fs");
const chalk = require("chalk");
const path = require("path");
const winattr = require("winattr");

const { createDir, isItDir, copy } = require("./utils");

// Copy files from GITFILES_INITIAL to .git folder

/**
 * It initializes current folder as repo or creates folder of user given name and it makes it a repo
 * @param {String} repo Repo name if user specifies one else the current folder is taken
 */
exports.init = async repo => {
  // If repo name is given then a folder with that name is created
  const name = (repo || "").length > 0 ? repo : ".";
  try {
    if (name !== ".") {
      const created = await createDir(repo);
    }
    await copy(path.join(__dirname, "/GITFILES_INITIAL"), `${name}/.git`);
    await winattr.set(`${name}/.git`, { hidden: true });
    console.log(chalk.green(`Repo ${name} has been initialized`));
  } catch (e) {
    console.log(chalk.red(`Error in creating repo ${e}`));
  }
};
