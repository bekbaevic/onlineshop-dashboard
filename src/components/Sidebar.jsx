import { Box, Button, Icon, Text, border, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import "./sidebar.css"
import categoriesBtnsData from "../config/categories";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ setShowSidebar, showSidebar }) => {
  const borderColor = useColorModeValue("#888", '#123666')
  const activeBtnColor = useColorModeValue('#ffffff77', '#0501E9')
  const SidebarBgColor = useColorModeValue("#A5C1E9", "#030424")
  const {pathname} = useLocation()
  return (
    <Box borderRight={'1px'} borderColor={borderColor} height={'100%'} width={'full'} backgroundColor={SidebarBgColor}>
      <Text display={'flex'} justifyContent={'center'} py={'20px'} fontSize={'24px'} fontWeight={'600'}>Dashboard</Text>
      <Box flexDir={"column"} gap={'6px'} display={'flex'} >
        {categoriesBtnsData.map(item => (
          <Link to={item.path} key={item.id}>
            <Button variant={'outline'} onClick={() => setShowSidebar(!showSidebar)} isActive={item.path === pathname} _active={{backgroundColor: activeBtnColor}} borderColor={borderColor} width={'95%'} marginX={'auto'} display={'flex'} alignItems={'center'} rounded={'sm'} justifyContent={'flex-start'} gap={'6px'}>
              <Icon fontSize={'22px'} as={item.icon} />
              <Text fontSize={'16px'}>{item.title}</Text>
            </Button>
          </Link>
        ))}
      </Box>
    </Box>
  )
}

export default Sidebar