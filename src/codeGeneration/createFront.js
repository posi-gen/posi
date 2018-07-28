import cloneDeep from 'lodash/cloneDeep'
import { initTemplate } from './initTemplate'

const { transformTables } = require('./front/engine')
const {
  createQueries,
  createForm,
  createList,
  createPage,
  createMain,
  createSidebar,
  getFormFileName,
  getListComponentName,
  getPageComponentName,
  createSelect,
  createFkeys
} = require('./front/templates')
const { pluralizeName } = require('./front/templates/queries')

export const createFront = outerData => {
  const data = cloneDeep(initTemplate)
  const newTables = transformTables(outerData.tables)
  const tableNames = Object.keys(newTables)
  // TABLES
  data['client']['src']['tables'] = {}
  tableNames.forEach(tableName => {
    createTable(newTables, tableName, data)
  })
  // MAIN
  data['client']['src']['components']['Main.js'] = createMain(newTables)
  // SIDE_BAR
  data['client']['src']['components']['SideBar.js'] = createSidebar(newTables)
  // SELECT
  data['client']['src']['components']['selectionField'][
    'queries.js'
  ] = createSelect(newTables)
  data['client']['src']['utils']['fkeys.json'] = createFkeys(newTables)
  return data
}

const createTable = async (tables, tableName, data) => {
  const pluralizeTableName = pluralizeName(tableName)
  data['client']['src']['tables'][pluralizeTableName] = {}
  const tableData = data['client']['src']['tables'][pluralizeTableName]
  tableData['queries.js'] = createQueries(tables, tableName)
  tableData[getFormFileName(tableName)('file') + '.js'] = createForm(
    tables,
    tableName
  )
  tableData[getListComponentName(tableName) + '.js'] = createList(
    tables,
    tableName
  )
  tableData[getPageComponentName(tableName) + '.js'] = createPage(
    tables,
    tableName
  )
}
