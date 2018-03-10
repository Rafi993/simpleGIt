const fse = require('fs-extra')
const chalk = require('chalk')

exports.updateIndex = newIndexData => {

  fse.appendFile('.git/index',
    newIndexData.fileName + '  ' +
    newIndexData.mode + ' ' +
    newIndexData.hash + '\n', err => {
      if (err) {
        console.log(chalk.red('Error in staging ' + newIndexData.fileName))
      } else {
        console.log(chalk.green(newIndexData.fileName + ' added to staging area'))
      }
    })

}