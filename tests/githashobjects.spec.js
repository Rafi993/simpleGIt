const chai = require('chai')
const expect = chai.expect

const { gitHashObject } = require('../gitHashObject')

describe('sgit gitHashObject', ()=>{
  it('should return 40 character long hash value of given data of text "This is a unit test"', ()=>{

    gitHashObject('', false, 'This is a unit test')
     .then(data=>{
      expect(data.length).to.be.equal(40)
     })

  })
})

