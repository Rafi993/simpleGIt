const fse = require('fs-extra')
const chalk = require('chalk')

const updateIndex = require('./updateIndex').updateIndex;
const gitHashObject = require('./githashobject').gitHashObject;

exports.add = (file_path) => {

  // Check if given file_path exist
  if (fse.existsSync(file_path)) {

    gitHashObject(file_path, true).then(hash =>{
      updateIndex({'fileName': file_path, mode: 0, hash: hash, })
    })
    
  } else {
    console.log(chalk.red(file_path + ' file/folder does not exist'))
  }

}