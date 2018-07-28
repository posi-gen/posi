import styled from 'styled-components'
import { Flex } from './Flex'
import { hidden } from 'styles/helpers'

export const Hide = styled(Flex)`
  ${hidden};
`
Hide.displayName = 'Hide'

Hide.defaultProps = {
  hidden: [false]
}
