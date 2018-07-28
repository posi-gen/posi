import styled from 'styled-components'
import { Switch as Base } from 'rebass'

import { selectColor } from 'styles/helpers'

export const Switch = styled(Base)`
  color: ${props => selectColor('base')(props)};
  background-color: ${props => selectColor('bg')(props)};
  &::after {
    background-color: ${props => selectColor('base')(props)};
  }
`
