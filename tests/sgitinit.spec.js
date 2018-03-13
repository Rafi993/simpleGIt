const { promisify } = require('util')
const chai = require('chai')
const expect = chai.expect;
const fse = require('fs-extra')

const { init } = require('../gitinit')

describe('sgit init', ()=>{
  it('should create .git directory in the present directory', ()=>{
    promisify(init)(__dirname + '/test-repo') 
     .then(()=>{
      expect(fse.existsSync('test-repo/.git')).to.be.equal(true)
     })
  })
})

