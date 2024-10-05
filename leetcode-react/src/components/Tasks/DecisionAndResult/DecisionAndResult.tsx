import {
    Box,
    ChakraProvider,
    VStack
} from '@chakra-ui/react';
import CodeMirrorComp from '../CodeMirrorComp/CodeMirrorComp';
import CodeExecutor from '../CodeExecuter/CodeExecuter';


const DecisionAndResult = () => {
    return (
        <ChakraProvider>            
            <VStack
                alignItems={"stretch"} 
                justifyContent={"space-between"}
                w={"webkit-fill-available"} 
                h={"100%"}  
                boxShadow={'md'} p={1} 
                borderStyle={"solid"} 
                borderWidth={1}
                rounded={"lg"}
            >
                <Box w={"100%"} h={"75%"}> 
                    <CodeMirrorComp/>
                </Box>
                
                <Box w={"100%"} h={"30%"} alignItems={"stretch"} >    
                    <CodeExecutor srcDoc={""} runCode={()=>{}}/>
                </Box>

            </VStack>
        </ChakraProvider>
    );
};

export default DecisionAndResult;