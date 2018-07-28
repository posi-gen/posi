import React from 'react'
import { Flex } from 'ui'

export const CommandContainer = ({ children, ...props }) => (
  <Flex
    flexDirection="row"
    justifyContent="space-between"
    // w={1}
    mb={3}
    {...props}
  >
    {children}
  </Flex>
)
