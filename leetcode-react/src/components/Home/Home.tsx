import { 
    Box, 
    Text as ChakraText, 
    ChakraProvider 
} from "@chakra-ui/react";

export default function Home () {
return <ChakraProvider>
    <Box>
        <ChakraText color={"teal"} fontSize='xl'>Выберите интересующее меню </ChakraText>
    </Box> 
</ChakraProvider>;
}