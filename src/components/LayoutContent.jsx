import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutContent = () => {
  return (
    <Box height={'100%'}>
      <Outlet/>
    </Box>
  )
}

export default LayoutContent