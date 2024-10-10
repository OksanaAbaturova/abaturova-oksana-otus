import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";

 const SpinnerChakra = () => {
    return <ChakraProvider>
        <Center>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='teal.500'
                size='xl'
            />
        </Center>
    </ChakraProvider>
}

export default SpinnerChakra;