const fse = require('fs-extra')
const chalk = require('chalk')
const ignore = require('ignore')

const updateIndex = require('./updateIndex').updateIndex;
const gitHashObject = require('./githashobject').gitHashObject;

exports.add = (file_path) => {

  // Check if given file_path exist
  if (fse.existsSync(file_path)) {


    // check if .gitignore is present
    if(!fse.existsSync(__dirname+'/.gitignore')) {
      console.log(chalk.yellow('please consider adding .gitignore'))
      // check if file is in .gitignore
      ignorePattern = fse.readFileSync(__dirname + '/.gitignore', 'utf8',(err, data)=>{
        if(!err){
          const ignorePattern = data.split('\n');
          const ig = ignore().add(ignorePattern)

          // If the file path is ignored then make it empty so it is not inserted into index
          if(ig.ignores(file_path)){
            file_path = ''
          }
        }
      })
    }

    gitHashObject(file_path, true)
    .then(hash =>{
      updateIndex({'fileName': file_path, mode: 0, hash: hash, })
    })
    
  } else {
    console.log(chalk.red(file_path + ' file/folder does not exist'))
  }

}