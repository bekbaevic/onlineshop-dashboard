import { BiSearchAlt, BiSun } from "react-icons/bi";
import { BiCategoryAlt } from "react-icons/bi";
import { BiMoon } from "react-icons/bi";
import { Box, Button, Icon, IconButton, Input, InputGroup, InputRightElement, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import categoriesBtnsData from "../config/categories";
import { useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({ setShowSidebar, showSidebar }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const headerBgColor = useColorModeValue("#A5C1E9", "#030424")
  const borderColor = useColorModeValue("#888", '#123666')
  const { pathname } = useLocation()



  return (
    <Box borderBottom={'1px'} borderColor={borderColor} pos={"sticky"} left={'0'} height={'65px'} px={"20px"} top={"0"} display={"flex"} justifyContent={"space-between"} alignItems={'center'} width={'full'} backgroundColor={headerBgColor}>
      <Box display={"flex"} alignItems={"center"} minWidth={'240px'} >
        <IconButton icon={GiHamburgerMenu()} display={{ base: 'flex', md: 'none' }} rounded={"full"} fontSize={'16px'} minWidth={"36px"} height={'36px'} onClick={() => setShowSidebar(!showSidebar)} />
        <Box marginLeft={'20px'} display={'flex'} justifyContent={"center "} alignItems={'center'}>
          <Icon as={categoriesBtnsData.find(item => item.path === pathname).icon} fontSize={'28px'} />
        </Box>
        <Text fontSize={"24px"} fontWeight={'600'} >{categoriesBtnsData.find(item => item.path === pathname).title}</Text>
      </Box>
      <Box width={'40%'}>
        <InputGroup display={'flex'} alignItems={'center'}>
          <Input size={'md'} rounded={'full'} placeholder="Search..." color={"white"} />
          <InputRightElement><IconButton rounded={'full'} size={'sm'} icon={<BiSearchAlt />} /></InputRightElement>
        </InputGroup>
      </Box>
      <Box>
        <IconButton icon={colorMode === 'light' ? <BiMoon /> : <BiSun />} rounded={"full"} fontSize={'16px'} minWidth={"36px"} height={'36px'} onClick={() => toggleColorMode()} />
      </Box>
    </Box>
  )
}

export default Header