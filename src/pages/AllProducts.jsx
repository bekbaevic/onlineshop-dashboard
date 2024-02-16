import { Box, Card, CardBody, Grid, GridItem, Image, Skeleton, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { getCategories, getProducts } from '../hooks/getDataAxios'
import MainContext from '../store/context'
import ProductItem from '../components/pagesComponents/ProductItem'
import ProductDeleteAlert from '../components/pagesComponents/ProductDeleteAlert'
import ProductUpdateAlert from '../components/pagesComponents/ProductUpdateAlert'

const AllProducts = () => {
  const { state, dispatch } = useContext(MainContext)
  const URL1 = 'https://onlineshop-database.onrender.com/products'
  const URL2 = 'https://onlineshop-database.onrender.com/categories'
  const itemsForSkeleton = [1, 2, 3, 4, 5]
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure()
  const [updateItemId, setUpdateItemId] = useState()
  const [deletedItemId, setDeletedItemID] = useState()
  useEffect(() => { getProducts(URL1, dispatch) }, [])
  useEffect(() => { getCategories(URL2, dispatch) }, [])

  function deleteFunc(id) {
    onDeleteOpen()
    setDeletedItemID(id)
  }

  function updateFunc(id) {
    setUpdateItemId(id)
    onUpdateOpen()  
  }

  return (
    <Box padding={'20px'}>
      {state.isProductsLoading && state.products.length === 0 ?
        <Grid gap={'10px'} rowGap={"30px"} gridTemplateColumns={{ sm: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}>
          {itemsForSkeleton.map(item =>
          (<Card key={item}>
            <CardBody>
              <Stack display={'flex'} flexDir={'column'} key={item}>
                <Box width={'100%'}>
                  <Skeleton height={'100px'} width={'full'} />
                </Box>
                <Box display={'flex'} flexDir={'column'} gap={'10px'} width={'100%'}>
                  <Skeleton height='20px' />
                  <Skeleton height='20px' />
                  <Box display={'flex'} width={'full'} gap={'10px'}>
                    <Skeleton height='20px' width={'50%'} />
                    <Skeleton height='20px' width={'50%'} />
                  </Box>
                </Box>
              </Stack>
            </CardBody>
          </Card>
          ))}
        </Grid> :
        <>
          <ProductDeleteAlert onOpen={onDeleteOpen} onClose={onDeleteClose} isOpen={isDeleteOpen} deletedItemId={deletedItemId} />
          <ProductUpdateAlert onOpen={onUpdateOpen} onClose={onUpdateClose} isOpen={isUpdateOpen} updateItemId={updateItemId}/>
          <Grid gap={'10px'} rowGap={"30px"} gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}>
            {state.products.map(item => (
              <GridItem key={item.id}>
                <ProductItem item={item} deleteFunc={deleteFunc} updateFunc={updateFunc} />
              </GridItem>
            ))}
          </Grid>
        </>
      }
    </Box>
  )
}

export default AllProducts