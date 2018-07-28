import sys from 'system-components'
import { Flex } from 'grid-styled'

export const Container = sys(
  {
    is: Flex,
    px: 0,
    mx: 'auto',
    maxWidth: 1024,
    flexDirection: 'column'
  },
  'maxWidth'
)

Container.displayName = 'Container'

export default Container
