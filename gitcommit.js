const createTreeObj = require('./createTreeObj').createTreeObj

/**
 * Commit the current staged files
 * @param {String} message Commit Message
 */
exports.gitCommit = message=>{
  
  // Create set of tree object that represent current state of index
  let tree = createTreeObj();
}