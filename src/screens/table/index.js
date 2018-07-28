import React from 'react'
import { MainTable } from 'components'
import { branchName } from 'redux/models/table'
import { InputWithLabel } from 'ui'
import { Columns } from './Columns'

const fields = {
  key: {
    key: 'key',
    default: '',
    Component: InputWithLabel,
    label: 'Name'
  },
  comment: {
    key: 'comment',
    default: '',
    Component: InputWithLabel,
    label: 'Comment'
  }
}

const tables = {
  columns: {
    key: 'columns',
    url: 'columns',
    display: 'Columns',
    Component: Columns
  }
}

const additionActions = {
  editCancel: {
    editColumnsCancel: {
      key: 'editColumnsCancel',
      branch: 'column',
      action: 'cancel'
    }
  },
  save: {
    saveColumns: {
      key: 'saveColumns',
      branch: 'column',
      action: 'save'
    }
  }
}

export const Table = ({ parent, match }) => (
  <MainTable
    branch={branchName}
    fields={fields}
    tables={tables}
    match={match}
    additionActions={additionActions}
  />
)
