import styled from 'styled-components'
import { space, color, boxShadow, borderRadius, maxWidth } from 'styled-system'
import { Flex } from './Flex'

const Card = styled(Flex)`
  ${color}
  ${space}
  ${maxWidth}
  ${borderRadius}
  ${boxShadow}
  box-shadow: 0 0 4px rgba(0,0,0,0.5);
`

Card.displayName = 'Card'

Card.defaultProps = {
  color: 'base',
  p: 3,
  bg: 'white'
}

export { Card }
