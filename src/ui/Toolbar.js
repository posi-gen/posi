import sc from 'styled-components'
import { minHeight } from 'styled-system'
import { Flex } from './Flex'

export const Toolbar = sc(Flex)`
  ${minHeight}
  -webkit-font-smoothing: antialiased;
`

Toolbar.displayName = 'Toolbar'

Toolbar.defaultProps = {
  px: 2,
  color: 'bg',
  bg: 'base',
  align: 'center'
  // minHeight: '48px'
}

export default Toolbar

// // export const Toolbar = sc(Tb)`
// //   background: ${({ theme }) => theme.colors.toolbar.backgroundColor};
// // `
// Toolbar.defaultProps = {
//   bc: 'accent'
// }
