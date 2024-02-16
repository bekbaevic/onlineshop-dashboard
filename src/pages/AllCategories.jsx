import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import React, { useContext, useEffect, useState } from 'react'
import { getCategories, postCategory } from '../hooks/getDataAxios'
import MainContext from '../store/context'
import { Box, Button, Grid, GridItem, Image, Skeleton, Stack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import CategoryDeleteAlert from "../components/pagesComponents/CategoryDeleteAlert";
import CategoryUpdateAlert from "../components/pagesComponents/CategoryUpdateAlert";

const AllCategories = () => {
  const { state, dispatch } = useContext(MainContext)
  const URL = 'https://onlineshop-database.onrender.com/categories'
  const cardColor = useColorModeValue('#ffffff77', '#0501E9')
  const cardHoverColor = useColorModeValue('#ffffff77', '#0501A9')
  const itemForSkeleton = [1, 2, 3, 4, 5]
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure()
  const [deletedItemId, setDeletedItemId] = useState()
  const [updateItemId, setUpdateItemId] = useState()
  useEffect(() => { getCategories(URL, dispatch) }, [])
  useEffect(() => { postCategory(URL) }, [])

  function deleteFunc(id) {
    onDeleteOpen()
    setDeletedItemId(id)
  }

  function updateFunc(id) {
    setUpdateItemId(id)
    onUpdateOpen()  
  }

  return (
    <Box padding={'20px'}>
      <Box>
        {state.isCategoriesLoading && state.categories.length === 0 ?
          <Grid gap={'10px'} rowGap={"30px"} gridTemplateColumns={{ sm: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}>
            {itemForSkeleton.map(item =>
            (<Stack display={'flex'} flexDir={'row'} key={item}>
              <Box width={'20%'}>
                <Skeleton height='full' />
              </Box>
              <Box display={'flex'} flexDir={'column'} gap={'10px'} width={'50%'}>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
              </Box>
            </Stack>
            ))}
          </Grid> :
          <>
            <CategoryUpdateAlert isOpen={isUpdateOpen} onOpen={onUpdateOpen} onClose={onUpdateClose} updateItemId={updateItemId} />
            <CategoryDeleteAlert isOpen={isDeleteOpen} onOpen={onDeleteOpen} onClose={onDeleteClose} deletedItemId={deletedItemId} />
            <Grid gap={'10px'} gridTemplateColumns={{ sm: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}>
              {state.categories?.map(item => (
                <GridItem key={item.id} cursor={'pointer'} _active={{ backgroundColor: cardHoverColor }} alignItems={'center'} backgroundColor={cardColor} padding={'10px'} rounded={'lg'} display={'flex'} justifyContent={'space-between'}>
                  <Box display={'flex'} alignItems={'center'} gap={'1rem'}>
                    <Image width={'50px'} height={'50px'} rounded={'lg'} objectFit={'cover'} src={item.image} />
                    <Text fontSize={'20px'} fontWeight={'600'}>{item.title.length>8?`${item.title.slice(0,8)}...`:item.title}</Text>
                  </Box>
                  <Box display={'flex'} gap={2}>
                    <Button colorScheme="blue" onClick={() => updateFunc(item.id)}><BiEditAlt /></Button>
                    <Button colorScheme="red" onClick={() => deleteFunc(item.id)}><AiOutlineDelete /></Button>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </>
        }
      </Box>

    </Box>
  )
}

export default AllCategories