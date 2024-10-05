import React from 'react';
import {Center, ChakraProvider, Grid, GridItem} from "@chakra-ui/react";
import DecisionAndResult from '../DecisionAndResult/DecisionAndResult';
import TabTaskChakra from '../TabTaskChakra/TabTaskChakra';

function OneTask() {
  return (
    <ChakraProvider>      
      <Center h={"100vh"} w={"100vw"}>
        <Grid
            templateAreas={`"header header"
                            "task decision"`}
            gridTemplateRows={'50px 1fr'}
            gridTemplateColumns={'49.5vw 49.5vw'}
            h='100vh'
            gap='1'
            color='black.100'
            fontWeight='normal'
            bg='gray.300'
            p='1'
            borderRadius='md'
        >
          <GridItem
              pl='5'
              bg='gray.100'
              area={'header'}
              borderRadius='md'
              color='black'
              fontSize='1.2rem'
              display='flex'
              m="1"             
              alignItems='center'
          >
              Header
          </GridItem>
          <GridItem             
              pl='2'
              bg='gray.100'
              area={'task'}
              borderRadius='md'
              p='1'
              m="1"
              color='black'
              fontSize='1.2rem'
          >
            <TabTaskChakra/>
          </GridItem>
          <GridItem
              pl='2'
              bg='gray.100'
              area={'decision'}
              borderRadius='md'
              p='1'
              m="1"
              color='white'
              fontSize='1.2rem'
          >
            <DecisionAndResult/>
          </GridItem>          
        </Grid>
      </Center>
    </ChakraProvider>
  );
}

export default OneTask;
