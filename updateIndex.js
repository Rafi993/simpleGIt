const fse = require('fs-extra')
const chalk = require('chalk')
const {
  reject,
  isEmpty,
  split,
  map,
  join  
} = require('ramda')

exports.updateIndex = newIndexData => {

  // Read existing index
  fse.readFile('.git/index', 'utf8')
    .then(data => {

      // Add present given file at bottom
      let index = data.split('\n')

      // Removing empty record and duplicated
      const withoutDuplicates = reject(x=> x[0] === newIndexData.fileName, map(split(' '), reject(isEmpty, index)))

      // Adding new entry
      index = map(join(' '), withoutDuplicates)
      index.push(newIndexData.fileName + '  ' +
      newIndexData.mode + ' ' +
      newIndexData.hash)

      fse.writeFile('.git/index', index, err => {
        if (err) {
          console.log(chalk.red('Error in staging ' + newIndexData.fileName))
        } else {
          console.log(chalk.green(newIndexData.fileName + ' added to staging area'))
        }
      })

    })
}