const {
  slice,
  toLower,
  map,
  drop
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

  // Remove node path and file path from args and convert all args to lower case
  const slicedArgs = map(toLower, drop(2, args))

  // Check if user has passed any params since first arg is node path, second one is file path
  if (slicedArgs.length > 0) {


    // Assign first user passed args which is sub-command to type
    res.type = slicedArgs[0]

    // @shame comeup with better way to parse args without or switch
    // Depending on sub-command pass it value
    switch (res.type) {
      case 'init':
        res.val = slicedArgs[1] || ''
        if (res.val.length > 0) {
          res.val += '/'
        }
        break;
      case 'add': res.val = slicedArgs[1] || ''; break;
      case 'hash-object': res.val = slicedArgs[1] || ''; break;
      case 'commit':
        if(slicedArgs.length >= 3) {
          if(slicedArgs[1] === '-m') {
            res.val = [ slicedArgs[1] || '', slicedArgs[2]]
          }
        } else {
          res.type = 'error'
          res.val = 'Not enough arguments'
        }; break;
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