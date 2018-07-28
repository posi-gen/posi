const { createQueries } = require('./queries')
const {
  createForm,
  createList,
  createPage,
  getPageComponentName,
  getFormFileName,
  getListComponentName
} = require('./tables')
const { createMain } = require('./main')
const { createSidebar } = require('./sidebar')
const { createSelect } = require('./select.js')
const { createFkeys } = require('./createFkeys.js')

module.exports = {
  createQueries,
  createForm,
  createList,
  createPage,
  createMain,
  createSidebar,
  getPageComponentName,
  getFormFileName,
  getListComponentName,
  createSelect,
  createFkeys
}
