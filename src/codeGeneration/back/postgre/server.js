const fs = require('fs')
const util = require('util')
// const types = require('./pgTypes')
const JSON2SQL = require('./generation').JSON2SQL

const newFileName = './new.sql'
const settingsFileName = './test.json'

// creation of new file
const unlink = util.promisify(fs.unlink)
const readFile = util.promisify(fs.readFile)
const appendFile = util.promisify(fs.appendFile)

const assembleFile = async (newFileName, settingsFileName) => {
  try {
    // deleting an old file
    try {
      await unlink(newFileName)
    } catch (err) {}

    // read settings file
    const json_settings = await readFile(settingsFileName, 'utf8')
    const settings = JSON.parse(json_settings)

    const data = await JSON2SQL(settings)

    // creating and filling a new file
    await appendFile(newFileName, data)
    console.log('CREATION: ', 'SUCCESS!')
  } catch (err) {
    console.log('CREATION ERROR: ', err)
  }
}

assembleFile(newFileName, settingsFileName)
