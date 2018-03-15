// lib imports
const hash = require('crypto')
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
 * Creates Folder with first two characters of hash val and then calls createObject
 * @param {String} hashVal Hash value of the object to be created
 * @param {String} firstTwoChar First two characters of the hash
 */
const createFirstTwoCharFolder = (hashVal, cleanData)=>{
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
  .catch(err=>{
    console.log('Unable to commit your files')
  })
}

/**
 * It generates hash of given data and if write is true it writes it to file
 * @param {Object} data Content to be hashed
 * @param {Boolean} write Should it write hash to file
 */
exports.gitHashObject = (file, write = true, data = '') => {
  return new Promise((resolve, reject) => {

    const sha1 = hash.createHash('sha1')

    if(file.length !== 0){
      // creating read stream
      stream = fse.createReadStream(file);
      let cleanData = '';

      stream.on('data', data => {
        cleanData += data
        sha1.update(data, 'utf8')
      })

      stream.on('end', () => {
        if (!write) {
          // writing to console if write mode is false
          console.log(file + ' ' + sha1.digest('hex'))
        } else {
          const hashVal = sha1.digest('hex');

          createFirstTwoCharFolder(hashVal, cleanData)

          // returning hash value
          resolve(hashVal)
        }
      })
    } else {
      // If content is passed instead of fileName
      const hashVal = sha1.update(data, 'utf8').digest('hex')
      resolve(hashVal)
    }
  })
}