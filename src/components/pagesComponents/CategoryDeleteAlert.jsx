import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { getCategories, getProducts } from '../../hooks/getDataAxios';
import MainContext from '../../store/context';
import axios from 'axios';
const CategoryDeleteAlert = ({ isOpen, onOpen, onClose, deletedItemId }) => {
    const toast = useToast()
    const { state, dispatch } = useContext(MainContext)
    const categoryURL = 'https://onlineshop-database.onrender.com/categories'
    const productsURL = 'https://onlineshop-database.onrender.com/products'

    async function checkProduct() {
        await axios.get(productsURL)
            .then((res) => {
                for (const product of res.data) {
                    if (!product.categoryId) {
                        axios.delete(`${productsURL}/${product.id}`)
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }



    async function deleteCategory(id) {
        await axios.delete(categoryURL + '/' + id)
            .then((res) => {
                toast({ title: 'Category success deleted', status: 'success', duration: 1000, isClosable: true, position: 'bottom-right' })
                checkProduct()
            })
            .catch((err) => {
                toast({ title: 'ERROR', status: 'error', duration: 1000, isClosable: true, position: 'bottom-right' })
            })
        getCategories(categoryURL, dispatch)
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
                            <Button colorScheme='red' onClick={() => deleteCategory(deletedItemId)} ml={3}>Delete</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default CategoryDeleteAlert