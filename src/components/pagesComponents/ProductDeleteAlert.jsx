import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Portal, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { getCategories, getProducts } from '../../hooks/getDataAxios';
import MainContext from '../../store/context';
import axios from 'axios';
const ProductDeleteAlert = ({ isOpen, onOpen, onClose, deletedItemId }) => {

    const { dispatch } = useContext(MainContext)
    const productsURL = 'https://onlineshop-database.onrender.com/products'
    const toast = useToast()

    async function deteteProduct(id) {
        await axios.delete(`${productsURL}/${id}`)
            .then((res) => {
                toast({ title: 'Product success deleted', status: 'success', duration: 1000, isClosable: true, position: 'bottom-right' })
            })
            .catch((err) => {
                toast({ title: 'ERROR', status: 'error', duration: 1000, isClosable: true, position: 'bottom-right' })
            })
        getProducts(productsURL, dispatch)
        onClose()
    }


    return (
        <>
            <AlertDialog isOpen={isOpen} onClose={onClose} >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>Delete Customer</AlertDialogHeader>
                        <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button colorScheme='red' onClick={() => deteteProduct(deletedItemId)} ml={3}>Delete</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default ProductDeleteAlert