const { map, split, head,
        last, keys } = require('ramda')
const { unflatten } = require('flat')
const fse = require('fs-extra')

const gitHashObject = require('./githashobject').gitHashObject


exports.createTreeObj = () => {
  // read .git/index
  fse.readFile('.git/index', 'utf8')
    .then(data => {

      // Create an object mapping filePath to hash
      const filesWithHash = map(files => {
        const eachEntryInIndex = split(' ', files)
        return {
          [head(eachEntryInIndex)]: last(eachEntryInIndex)
        }
      }, split('\n', data))


      const nestedObj = map(file => unflatten(file, {
        delimiter: '/',
        object: true
      }), filesWithHash)


      // const createTree = obj =>{
      //   const key = keys(obj)[0]
      //   if(typeof obj[key] === 'string') {
      //     // console.log('blob ' + obj[key] + ' ' + key)
      //     return 'blob ' + obj[key] + ' ' + key + '\r\n'
      //   } else {
      //     console.log(obj)
      //     let children = createTree(obj[key])
      //     // console.log('dd3  ',children)
      //     // gitHashObject('', false, children)
      //     // .then(hash=>{
      //     //   // console.log(hash)
      //     //   // console.log('tree ' + last(split(' ', hash)) + ' ' + children)
      //     //   // return 'tree ' + last(split(' ', hash)) + ' ' + hash
      //     // })
      //   }
          
      // }
      // const createTree = (key, obj)=> {
      //   if(typeof obj[key] === 'string') {
      //     return `blob ${obj[key]} ${key} \r\n`
      //   } else {
      //     console.log(key,'dd')
      //     const children = createTree(keys(obj[key])[0], obj[key])
      //     // console.log('----------eee-')
      //     // console.log(children)
      //     // console.log('----------eee-')
      //     // const parent = 
      //   }
      // }

      const walkTree = tree => {
        tree.forEach(obj => {
          const key = keys(obj)[0];
            // createTree(key, obj)
        });
      }

      console.log(nestedObj)
      walkTree(nestedObj)

    })
}