import styled from 'styled-components'
import { Heading as Base } from 'rebass'

import { selectColor } from 'styles/helpers'

export const Heading = styled(Base)`
  padding: 8px;
  color: ${props => selectColor('base')(props)};
  background-color: ${props => selectColor('bg')(props)};
`
