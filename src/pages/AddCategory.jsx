import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'

const AddCategory = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const toast = useToast()
  const URL = "https://onlineshop-database.onrender.com/categories"
  function setCategories(e) {
    e.preventDefault()
    const data = { title, image }
    axios.post(URL, data)
      .then((res) => {
        toast({ title: 'Category created', status: 'success', duration: 1000, isClosable: true, position: 'bottom-right'})
      })
      .catch((err) => {
        toast({ title: 'ERROR', status: 'error', duration: 1000, isClosable: true, position: 'bottom-right'})
      })

    setTitle('')
    setImage('')
  }

  return (
    <Box padding={'20px'}>
      <form onSubmit={(e) => setCategories(e)}>
        <FormControl marginTop={'20px'}>
          <FormLabel>Image URL</FormLabel>
          <Input value={image} onChange={(e) => setImage(e.target.value)} size={'sm'} rounded={'sm'} required type='url' placeholder='Enter image url...' />
        </FormControl>
        <FormControl marginTop={'20px'}>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} size={'sm'} rounded={'sm'} required type='text' placeholder='Enter category title...' />
        </FormControl>
        <Button type='submit' marginTop={'10px'} float={'right'} colorScheme={'blue'} rounded={'sm'} size={'sm'}>Submit</Button>
      </form>
    </Box>
  )
}

export default AddCategory