import React from 'react'
import { MainTables } from 'components'

const additionDelete = {
  deleteColumns: { key: 'deleteColumns', branch: 'column', action: 'deleteAll' }
}

export const Tables = ({ match }) => (
  <MainTables branch="table" match={match} additionDelete={additionDelete} />
)
