export const numerical = {
  SMALLINT: { key: 'SMALLINT' },
  INTEGER: { key: 'INTEGER' },
  BIGINT: { key: 'BIGINT' },
  // DECIMAL: { key: 'DECIMAL' },
  NUMERIC: {
    key: 'NUMERIC',
    params: {
      precision: { key: 'precision', min: 1 },
      scale: { key: 'scale', min: 0 }
    }
  },
  REAL: { key: 'REAL' },
  DOUBLE_PRECISION: { key: 'DOUBLE_PRECISION' },
  SMALLSERIAL: { key: 'SMALLSERIAL', real: 'SMALLINT' },
  SERIAL: { key: 'SERIAL', real: 'INTEGER' },
  BIGSERIAL: { key: 'BIGSERIAL', real: 'BIGINT' }
}
