// lib imports
const hash = require('crypto').createHash('sha1')
const chalk = require('chalk')
const fse = require('fs-extra')
const {
  slice,
  drop,
  join
} = require('ramda')

/**
 * Creates object in .git/objects directory
 * @param {String} path Location in which object is to be created
 * @param {String} data Data to be written to the object
 */
const createObject = (path, data)=>{
    fse.writeFile(path, data, err => {
      if(err){
        console.error('Unable to commit your file')
    } else {
      console.log(chalk.green('Your file has been commited '+ join('', drop(2, path.split('/')))))
    }
})

}

/**
 * It generates hash of given data and if write is true it writes it to file
 * @param {Object} data Content to be hashed
 * @param {Boolean} write Should it write hash to file
 */
exports.gitHashObject = (file, write = false) => {
  return new Promise((resolve, reject) => {

    // creating read stream
    stream = fse.createReadStream(file);
    let cleanData = '';

    stream.on('data', data => {
      cleanData += data
      hash.update(data, 'utf8')
    })

    stream.on('end', () => {
      if (!write) {
        // writing to console if write mode is false
        console.log(file + ' ' + hash.digest('hex'))
      } else {
        const hashVal = hash.digest('hex');
        const firstTwoChar = slice(0, 2, hashVal)

        fse.exists('.git/objects/' + firstTwoChar)
        .then(fileExist=>{
          if(!fileExist){
            fse.mkdir('.git/objects/' + firstTwoChar)
            .then(()=>{
              createObject('.git/objects/' + firstTwoChar + '/' + drop(2, hashVal), cleanData)
            }) 
          } else {
            createObject('.git/objects/' + firstTwoChar + '/' + drop(2, hashVal), cleanData)
          }
        })

        // returning hash value
        resolve(hashVal)
      }
    })

  })
}