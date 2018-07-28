import { push } from 'react-router-redux'

import { defaultData } from 'defaults'
import { toInner } from 'connectors'

export const database = {
  state: { data: { key: 'unnamedDatabase', mainSchema: 'main' } },
  reducers: {
    editName(state, name) {
      return { data: { ...state.data, key: name } }
    },
    changeRoleForLogin(state, role) {
      return { data: { ...state.data, roleForLogin: role } }
    },
    editDefaultAdminLogin(state, login) {
      return { data: { ...state.data, defaultAdminLogin: login } }
    },
    editDefaultAdminPassword(state, password) {
      return { data: { ...state.data, defaultAdminPassword: password } }
    },
    load(state, loadingData) {
      return { ...loadingData }
    },
    clean(state) {
      return {}
    }
  },
  selectors: {
    getName: state => (state.data ? state.data.key : ''),
    getRoleForLogin: state => (state.data ? state.data.roleForLogin : ''),
    getDefaultAdminLogin: state =>
      state.data ? state.data.defaultAdminLogin : '',
    getDefaultAdminPassword: state =>
      state.data ? state.data.defaultAdminPassword : ''
  },
  effects: dispatch => ({
    cleanAll: () => {
      dispatch.database.clean()
      dispatch.schema.clean()
      dispatch.extension.clean()
      dispatch.role.clean()
      dispatch.grantRoles.clean()
      dispatch.grants.clean()
      dispatch.policy.clean()
      dispatch.table.clean()
      dispatch.column.clean()
      dispatch.composite.clean()
      dispatch.compositeColumn.clean()
      dispatch(push('/'))
    },
    createNewProject: () => {
      loadData(dispatch, defaultData())
    },
    loadProject: fileData => {
      loadData(dispatch, toInner(fileData))
    }
  })
}

const loadData = (dispatch, data) => {
  const {
    database,
    schema,
    extension,
    role,
    grantRoles,
    grants,
    policy,
    composite,
    compositeColumn,
    table,
    column
  } = data
  dispatch.database.load(database)
  dispatch.schema.load(schema)
  dispatch.extension.load(extension)
  dispatch.role.load(role)
  dispatch.grantRoles.load(grantRoles)
  dispatch.grants.load(grants)
  dispatch.policy.load(policy)
  dispatch.table.load(table)
  dispatch.column.load(column)
  dispatch.composite.load(composite)
  dispatch.compositeColumn.load(compositeColumn)
}

export const branchName = 'database'
