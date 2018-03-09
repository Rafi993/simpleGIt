const {
  slice,
  toLower,
  map
} = require('ramda')

/**
 * This function takes the command line params and parses it and returns the object 
 * with type and val if error type is returned as 'error'
 * @param {Array} args This is list of arguments passed as command line parameter
 */
exports.commandLine = args => {

  let res = {
    type: '',
    val: '',
  }

  // Check if user has passed any params since first arg is node path, second one is file path
  if (args.length > 2) {

    // Remove node path and file path from args and convert all args to lower case
    const slicedArgs = map(toLower, slice(2, 4, args))
    // Assign first user passed args which is sub-command to type
    res.type = slicedArgs[0]

    // Depending on sub-command pass it value
    switch (res.type) {
      case 'init':
        res.val = slicedArgs[1] || ''
        if (res.val.length > 0) {
          res.val += '/'
        }
        break;
      default:
        res.val = 'Unknown option';
        res.type = 'error'
    }

  } else {
    // If user didnt pass any sub-command
    res.type = 'error'
    res.val = 'Lets try with an argument again'
  }
  return res

}