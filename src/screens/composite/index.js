import React from 'react'
import { MainTable } from 'components'
import { branchName } from 'redux/models/composite'
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
    key: 'compositeColumn',
    url: 'compositeColumn',
    display: 'Columns',
    Component: Columns
  }
}

const additionActions = {
  editCancel: {
    editColumnsCancel: {
      key: 'editColumnsCancel',
      branch: 'compositeColumn',
      action: 'cancel'
    }
  },
  save: {
    saveColumns: {
      key: 'saveColumns',
      branch: 'compositeColumn',
      action: 'save'
    }
  }
}

export const Composite = ({ parent, match }) => (
  <MainTable
    branch={branchName}
    fields={fields}
    tables={tables}
    match={match}
    additionActions={additionActions}
  />
)
