import { Box, Button, Card, CardBody, Image, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../../store/context'

const ProductItem = ({ item, deleteFunc, updateFunc }) => {
    const [descriptionActive, setDescriptionActive] = useState(false)
    const { state } = useContext(MainContext)
    console.log()

    return (
        <Card rounded={"sm"} boxShadow={'lg'}>
            <CardBody padding={'10px'}>
                <Box position={'relative'}>
                    <Image cursor={'pointer'} maxH={'200px'} width={'100%'} minH={'200px'} objectFit={'cover'} src={item.image} />
                    <Text position={'absolute'} left={'10px'} top={'10px'} bgColor={'#00000040'} padding={'5px'} fontSize={'12px'} fontWeight={'600'} rounded={'sm'}>
                        {state.categories.find(catItem => catItem.id == item.categoryId)?.title}
                    </Text>
                </Box>
                <Text marginY={'10px'} fontSize={'24px'} fontWeight={'700'} >
                    {item.title}
                </Text>
                <Text>price: {item.price}$</Text>
                <Box onClick={() => setDescriptionActive(!descriptionActive)} cursor={'pointer'} paddingRight={'10px'} marginTop={'10px'} overflowY={'auto'} height={'150px'}>
                    <Text fontSize={'14px'}>{descriptionActive ? item.description : item.description.slice(0, 160) + '...'}</Text>
                </Box>
                <Box marginTop={'10px'} display={'flex'} gap={'10px'} justifyContent={'stretch'}>
                    <Button w={'50%'} colorScheme={'blue'} onClick={() => updateFunc(item.id)}>Update</Button>
                    <Button w={'50%'} colorScheme={"red"} onClick={() => deleteFunc(item.id)}>Delete</Button>
                </Box>
            </CardBody>
        </Card>
    )
}

export default ProductItem