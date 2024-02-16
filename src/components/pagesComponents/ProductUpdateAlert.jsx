import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../../store/context'
import axios from 'axios'
import { getProducts } from '../../hooks/getDataAxios'

const ProductUpdateAlert = ({ isOpen, onOpen, onClose, updateItemId }) => {
    const { state, dispatch } = useContext(MainContext)
    const toast = useToast()
    const URL = 'https://onlineshop-database.onrender.com/products'
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState()

    useEffect(() => {
        setImage(`${state.products?.find(item => item.id == updateItemId)?.image}`)
        setTitle(`${state.products?.find(item => item.id == updateItemId)?.title}`)
        setPrice(`${state.products?.find(item => item.id == updateItemId)?.price}`)
        setDescription(`${state.products?.find(item => item.id == updateItemId)?.description}`)
        setCategoryId(`${state.products?.find(item => item.id == updateItemId)?.categoryId}`)
    }, [updateItemId])

    async function updateProduct(e, id) {
        e.preventDefault()
        await axios.patch(`${URL}/${id}`, {
            id: isOpen,
            title: title,
            image: image,
        })
            .then((res) => {
                toast({ title: 'Category success updated', status: 'success', duration: 1000, isClosable: true, position: 'bottom-right' })
            })
            .catch((err) => {
                toast({ title: 'ERROR', status: 'error', duration: 1000, isClosable: true, position: 'bottom-right' })
            })
        onClose()
        getProducts(URL, dispatch)
    }


    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Updating</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={(e) => updateProduct(e, updateItemId)}>
                        <ModalBody pb={6}>
                            <FormControl mt={4}>
                                <FormLabel>Title</FormLabel>
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='product name...' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Price</FormLabel>
                                <Input value={price} onChange={(e) => setTitle(e.target.value)} placeholder='product price...' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Image URL</FormLabel>
                                <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder='image url...' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Decription</FormLabel>
                                <Textarea value={description} onChange={(e) => setImage(e.target.value)} placeholder='description...' />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type='submit'>
                                Save
                            </Button>
                            <Button onClick={() => onClose()}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ProductUpdateAlert