import styled from 'styled-components'

import { selectColor } from 'styles/helpers'

export const Select = styled.select([], props => ({
  borderRadius: '4px',
  flexGrow: 2,
  border: `1px solid ${selectColor('bg1')(props)}`,
  padding: '8px',
  margin: '4px',
  overflow: 'auto',
  maxHeight: '300px',
  color: 'inherit'
}))

export const Option = styled.option``
