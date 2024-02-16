import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../../store/context'
import axios from 'axios'
import { getCategories } from '../../hooks/getDataAxios'

const CategoryUpdateAlert = ({ isOpen, onOpen, onClose, updateItemId }) => {
    const { state, dispatch } = useContext(MainContext)
    const toast = useToast()
    const URL = 'https://onlineshop-database.onrender.com/categories'
    const [newTitle, setNewTitle] = useState('')
    const [newImageURL, setNewImageURL] = useState('')

    useEffect(() => {
        setNewImageURL(`${state.categories?.find(item => item.id == updateItemId)?.image}`)
        setNewTitle(`${state.categories?.find(item => item.id == updateItemId)?.title}`)
    }, [updateItemId])

    async function updateCategory(e, id) {
        e.preventDefault()
        await axios.patch(`${URL}/${id}`, {
            id: isOpen,
            title: newTitle,
            image: newImageURL,
        })
            .then((res) => {
                toast({ title: 'Category success updated', status: 'success', duration: 1000, isClosable: true, position: 'bottom-right' })
            })
            .catch((err) => {
                toast({ title: 'ERROR', status: 'error', duration: 1000, isClosable: true, position: 'bottom-right' })
            })
        onClose()
        getCategories(URL, dispatch)
    }


    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Updating</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={(e)=>updateCategory(e, updateItemId)}>
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Image URL</FormLabel>
                                <Input value={newImageURL} onChange={(e) => setNewImageURL(e.target.value)} placeholder='image url...' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Title</FormLabel>
                                <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder='category name...' />
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

export default CategoryUpdateAlert