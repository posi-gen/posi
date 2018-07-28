import React from 'react'
import { Flex } from 'ui'

export const Page = ({ title, children }) => (
  <Flex px={[0, 3]} flexDirection="column">
    {children}
  </Flex>
)

export default Page
