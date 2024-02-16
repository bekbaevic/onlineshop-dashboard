import { Box, HStack, useColorModeValue } from '@chakra-ui/react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import LayoutContent from './components/LayoutContent'
import { Route, Routes } from 'react-router-dom'
import AllProducts from './pages/AllProducts'
import AddCategory from './pages/AddCategory'
import AddProducts from './pages/addProducts'
import AllCategories from './pages/AllCategories'
import MainContext from './store/context'
import { useReducer, useState } from 'react'
import { initialState, reducer } from './store/reducer'
function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  const [showSidebar, setShowSidebar] = useState(false)
  const borderColor = useColorModeValue("#636363", '#B4B4B4')

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <Box> 
        <Box width={'full'}>
          <Header setShowSidebar={setShowSidebar} showSidebar={showSidebar}/>
        </Box>
        <HStack gap={"0"} alignItems={"start"}>
          <Box w={"100%"} onClick={() => setShowSidebar(!showSidebar)}  cursor={'pointer'} height={'calc(100vh - 65px)'} overflowY={'hidden'} opacity={'0.5'} bg={'#000'} position={'absolute'} display={{base: showSidebar?'block':'none', md: 'none'}} zIndex={'500'}></Box>
          <Box id="sidebar" zIndex={"9999"} position={{ base: 'absolute', md: 'relative' }} transition={'ease 0.3s'} left={{ base: showSidebar?'0px':"-250px", md: '0' }} width={'250px'} height={'calc(100vh - 65px)'} borderColor={borderColor} >
            <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar}/>
          </Box>
          <Box width={{ base: '100%', md: 'calc(100% - 250px)' }} height={'calc(100vh - 65px)'} overflowY={'auto'}>
            <Routes>
              <Route path='/' element={<LayoutContent />}>
                <Route path='/allproducts' element={<AllProducts />} />
                <Route path='/' element={<AllCategories />} />
                <Route path='/createcategory' element={<AddCategory />} />
                <Route path='/createproduct' element={<AddProducts />} />
              </Route>
            </Routes>
          </Box>
        </HStack>
      </Box>
    </MainContext.Provider>
  )
}

export default App
