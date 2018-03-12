const {
  slice,
  toLower,
  map,
  drop
} = require('ramda')

const {
  noArgs
} = require('./util')

/**
 * This function takes the command line params and parses it and returns the object 
 * with type and val if error type is returned as 'error'
 * @param {Array} args This is list of arguments passed as command line parameter
 */
exports.commandLine = args => {

  const processArgs = argsArr => {
    const firstArg = argsArr[0] || '';

    const getSubCommand = {
      'init': argsArr[1].length > 0 ? argsArr[1] + '/' : argsArr[1],
      'add': argsArr[1],
      'hash-object': argsArr[1],
      'commit': argsArr.length >= 3 ?
        // Check if the third argument is -m else thro error
        (argsArr[1] === '-m' ? [argsArr[1] || '', argsArr[2]] : 'error')
        // Check if the argument list is greater than or equal to 3 else throw error
        :
        'error'
    }
    const subCommand = getSubCommand[firstArg];

    // Check if error else return Sub-command with type
    if (subCommand === 'error') {
      return {
        type: 'error',
        val: 'Check if your arguments are correct'
      }
    } else {
      return {
        type: firstArg,
        val: subCommand
      }
    }

  }

  // Remove node path and file path from args and convert all args to lower case
  const slicedArgs = map(toLower, drop(2, args))

  // Check if user has passed any params since first arg is node path, second one is file path
  return slicedArgs.length > 0 ? processArgs(slicedArgs) : noArgs()
}