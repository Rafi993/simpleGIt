const fse = require('fs-extra')
const chalk = require('chalk')
const path = require('path')
const winattr = require('winattr')
// Copy files from GITFILES_INITIAL to .git folder

/**
 * It initializes current folder as repo or creates folder of user given name and it makes it a repo
 * @param {String} repo Repo name if user specifies one else the current folder is taken
 */
exports.init = repo => {

  // If repo name is given then a folder with that name is created
  if (repo.length > 0) {
    // The reason for the two sync functions is to initialize the repo only
    // if the directory is created
    // @shame: Try to remove sync functions later
    if (fse.existsSync(repo)) {
      console.log(chalk.yellow(`\n The ${repo} Directory already exist please try a new name`))
    } else {

      console.log('creating directory', chalk.blue(repo))
      try {
        // Creating user given name as directory
        fse.mkdirSync(repo)
      } catch (err) {
        if (err) {
          console.log('Unable to create directory ', repo)
          console.error(err);
        }
      }
    }

  }

  // Check if folder is a git repo
  // @shame remove sync methods
  if (fse.existsSync(repo + '/.git')) {
    console.log(chalk.yellow('It is already a git repo'))
  } else {

    // If it is not a git repo move files from GITFILES_INITIAL to .git directory
    fse.copy(path.join(__dirname, '/GITFILES_INITIAL'), repo + '/.git', err => {
      if (err) {
        console.log(err)
      } else {
        winattr.set(repo + '/.git', {
          hidden: true
        }, err => {
          if (err == null) {
            console.log(chalk.green(`Repo ${repo} has been initialized`))
          }
        });
      }
    })

  }

}