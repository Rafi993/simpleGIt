// lib imports
const hash = require('crypto').createHash('sha1')
const fse = require('fs-extra')
const {
  slice,
  drop
} = require('ramda')

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

        fse.mkdir('.git/objects/' + firstTwoChar)
          .then(() => {
            console.log('sdfsd', drop(2, hashVal))
            fse.writeFile('.git/objects/' + firstTwoChar + '/' + drop(2, hashVal), cleanData, err => {
              console.log(err)
            })
          })

        // returning hash value
        resolve(hashVal)
      }
    })

  })
}