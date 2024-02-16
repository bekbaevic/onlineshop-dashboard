import { Box, Input, Text, FormControl, useColorModeValue, Button, FormLabel, useToast, Textarea, Select } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../store/context'
import { getCategories } from '../hooks/getDataAxios'
import axios from 'axios'

const AddProducts = () => {
  const URL1 = 'https://onlineshop-database.onrender.com/products'
  const URL2 = "https://onlineshop-database.onrender.com/categories"
  const {state, dispatch} = useContext(MainContext)
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const toast = useToast()
  useEffect(() => { getCategories(URL2, dispatch) }, [])

  function setProduct(e) {
    e.preventDefault()
    const data = { title, price, image, description, categoryId}
    axios.post(URL1, data)
      .then((res) => {
        toast({ title: 'Product created', status: 'success', duration: 1000, isClosable: true, position: 'bottom-right' })
      })
      .catch((err) => {
        toast({ title: 'ERROR', status: 'error', duration: 1000, isClosable: true, position: 'bottom-right' })
      })

    setTitle('')
    setImage('')
    setDescription('')
    setPrice('')
  }

  return (
    <Box padding={'20px'}>
      <form onSubmit={(e) => setProduct(e)}>
        <FormControl marginTop={'20px'}>
          <FormLabel>Image URL</FormLabel>
          <Input value={image} onChange={(e) => setImage(e.target.value)} size={'sm'} rounded={'sm'} required type='url' placeholder='Enter image url...' />
        </FormControl>
        <FormControl marginTop={'20px'}>
          <FormLabel>Name</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} size={'sm'} rounded={'sm'} required type='text' placeholder='Enter product name...' />
        </FormControl>
        <FormControl marginTop={'20px'}>
          <FormLabel>Price</FormLabel>
          <Input value={price} onChange={(e) => setPrice(e.target.value)} size={'sm'} rounded={'sm'} required type='number' placeholder='Enter product price...' />
        </FormControl>
        <FormControl marginTop={'20px'}>
          <FormLabel>Description</FormLabel>
          <Textarea resize={'none'} value={description} onChange={(e) => setDescription(e.target.value)} size={'sm'} rounded={'sm'} required type='text' placeholder='Enter description...' ></Textarea>
        </FormControl>
        <FormControl marginTop={'20px'}>
          <FormLabel>Category name</FormLabel>
          <Select rounded={'sm'} value={categoryId} placeholder='Select category' required onChange={(e) => setCategoryId(e.target.value)}>
            {state.categories?.map(item => (
              <option key={item.id} value={item.id}>{item.title}</option>
            ))}
          </Select>
        </FormControl>
        <Button type='submit' marginTop={'10px'} float={'right'} colorScheme={'blue'} rounded={'sm'} size={'sm'}>Submit</Button>
      </form>
    </Box>
  )
}

export default AddProducts