import { 
        Box, 
        Text as ChakraText, 
        ChakraProvider 
} from "@chakra-ui/react";

export default function NotFound () {
    return <ChakraProvider>
        <Box>
            <ChakraText color={"teal"} fontSize='xl'>Tакой страницы не существует </ChakraText>
        </Box> 
    </ChakraProvider>;
}