import React from 'react'
import { MainTable } from 'components'
import { branchName } from 'redux/models/role'
import { InputWithLabel } from 'ui'
import { Checkbox } from 'components'
import { GrantRoles } from './GrantRoles'
import { Grants } from './grants'
import { Policy } from './policy'

const fields = {
  key: {
    key: 'key',
    default: '',
    Component: InputWithLabel,
    label: 'Name'
  },
  login: {
    key: 'login',
    default: false,
    Component: Checkbox,
    label: 'Can login'
  },
  password: {
    key: 'password',
    default: 'JLPl5dd43l2234HHHFld',
    Component: InputWithLabel,
    label: 'Password'
  },
  comment: {
    key: 'comment',
    default: '',
    Component: InputWithLabel,
    label: 'Comment'
  }
}

const tables = {
  grants: {
    key: 'grants',
    url: 'grants',
    display: 'Grants',
    Component: Grants
  },
  policy: {
    key: 'policy',
    url: 'policy',
    display: 'Policy',
    Component: Policy
  },
  grantRoles: {
    key: 'grantRoles',
    url: 'grantRoles',
    display: 'Grant roles',
    Component: GrantRoles
  }
}

const additionActions = {
  save: {
    saveGrants: {
      key: 'saveGrants',
      branch: 'grants',
      action: 'save'
    },
    savePolicy: {
      key: 'savePolicy',
      branch: 'policy',
      action: 'save'
    }
  }
}

export const Role = ({ parent, match }) => (
  <MainTable
    branch={branchName}
    fields={fields}
    tables={tables}
    match={match}
    additionActions={additionActions}
  />
)
