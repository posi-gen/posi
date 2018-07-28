import { numerical } from './numerical'
import { symbolic } from './symbolic'
import { dateAndTime } from './dataAndTime'
import { geometric } from './geometric'
import { net } from './net'
import { bit } from './bit'

export const pgBaseTypes = {
  ...numerical,
  MONEY: { key: 'MONEY' },
  ...symbolic,
  BYTEA: { key: 'BYTEA' },
  ...dateAndTime,
  BOOLEAN: { key: 'BOOLEAN' },
  ...geometric,
  ...net,
  UUID: { key: 'UUID' },
  XML: { key: 'XML' },
  JSON: { key: 'JSON' },
  JSONB: { key: 'JSONB' },
  ...bit
}
