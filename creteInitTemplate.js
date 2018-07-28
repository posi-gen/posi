const fs = require('fs')
const util = require('util')

const readdir = util.promisify(fs.readdir)
const lstat = util.promisify(fs.lstat)
const writeFile = util.promisify(fs.writeFile)

const addIndent = (source, indent = '') => {
  const arr = source.split('\n')
  return arr.reduce(
    (acc, el, i) => acc + (i !== 0 ? '\n' + indent : '') + el,
    ''
  )
}

const createStruct = async (dir, indent = '') => {
  const files = await readdir('./src/codeGeneration/' + dir)
  let result = '{'
  let isFirs = true
  for (let fileName of files) {
    const path = dir + '/' + fileName
    const nodePath = './src/codeGeneration/' + path
    const stat = await lstat(nodePath)
    result = result + (isFirs ? '\n' : ',\n')
    if (stat.isFile()) {
      result = result + `'${fileName}': require('!raw-loader!./${path}')`
    } else {
      result = result + `'${fileName}': ${await createStruct(path)}\n}`
    }
    isFirs = false
  }
  return addIndent(result, indent + '  ')
}

const createInitFrontObject = async dir => {
  return (
    '/* eslint import/no-webpack-loader-syntax: off */' +
    '\nexport const initTemplate = ' +
    (await createStruct(dir)) +
    '\n}'
  )
}

const creteInitFrontTemplate = async () => {
  writeFile(
    './src/codeGeneration/initTemplate.js',
    await createInitFrontObject('initTemplate')
  )
}

creteInitFrontTemplate()
