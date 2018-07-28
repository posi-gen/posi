import { database } from './database'
import { schemas } from './schemas'
import { extensions } from './extensions'
import { composites } from './composites'
import { roles } from './roles'
import { tables } from './tables'
import { toInner } from 'connectors'

export const defaultData = () =>
  toInner({
    database,
    schemas,
    extensions,
    composites,
    roles,
    tables
  })
