const chai = require('chai')
const expect = chai.expect;

const { commandLine } = require('../commandLine')

describe('CommandLine parser sgit with no args', ()=>{
  it('Should fail with message asking for argument list', ()=>{
    const parsedArgs = commandLine()
    expect(parsedArgs.type).to.be.equal('error')
    expect(parsedArgs.val).to.be.equal('Lets try with an argument again')
  })

  // Init without repo name
  it('sgit init', ()=>{
    const parsedArgs = commandLine(['node', 'index.js', 'init'])
    expect(parsedArgs.type).to.be.equal('init')
    expect(parsedArgs.val).to.be.equal('')
  })

  // Init with repo name
  it('sgit init test', ()=>{
    const parsedArgs = commandLine(['node', 'index.js', 'init', 'test'])
    expect(parsedArgs.type).to.be.equal('init')
    expect(parsedArgs.val).to.be.equal('test/')
  })

  // Init with more argument
  it('sgit init test test2 test3', ()=>{
    const parsedArgs = commandLine(['node', 'index.js', 'init', 'test'])
    expect(parsedArgs.type).to.be.equal('init')
    expect(parsedArgs.val).to.be.equal('test/')
  })

  // add with no args
  it('sgit add ', ()=>{
    const parsedArgs = commandLine(['node', 'index.js', 'add'])
    expect(parsedArgs.type).to.be.equal('error')
    expect(parsedArgs.val).to.be.equal('Check if your arguments are correct')
  })

  // add with no args
  it('sgit add 1.txt', ()=>{
    const parsedArgs = commandLine(['node', 'index.js', 'add', '1.txt'])
    expect(parsedArgs.type).to.be.equal('add')
    expect(parsedArgs.val).to.be.equal('1.txt')
  })

  it('sgit hash-object', ()=>{
    const parsedArgs = commandLine(['node', 'index.js', 'hash-object'])
    expect(parsedArgs.type).to.be.equal('error')
    expect(parsedArgs.val).to.be.equal('Check if your arguments are correct')
  })

  it('sgit hash-object 1.txt', ()=>{
    const parsedArgs = commandLine(['node', 'index.js', 'hash-object', '1.txt'])
    expect(parsedArgs.type).to.be.equal('hash-object')
    expect(parsedArgs.val).to.be.equal('1.txt')
  })

  it('sgit commit', ()=>{
    const parsedArgs = commandLine(['node', 'index.js', 'commit'])
    expect(parsedArgs.type).to.be.equal('error')
    expect(parsedArgs.val).to.be.equal('Check if your arguments are correct')
  })

  it('sgit commit -m', ()=>{
    const parsedArgs = commandLine(['node', 'index.js', 'commit', '-m'])
    expect(parsedArgs.type).to.be.equal('error')
    expect(parsedArgs.val).to.be.equal('Check if your arguments are correct')
  })

  it('sgit commit -m 1.txt', ()=>{
    const parsedArgs = commandLine(['node', 'index.js', 'commit', '-m', 'first commit'])
    expect(parsedArgs.type).to.be.equal('commit')
    expect(parsedArgs.val).to.be.eql(['-m', 'first commit'])
  })

})