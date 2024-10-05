import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, ChakraProvider, Text, HStack, Textarea, Icon } from "@chakra-ui/react";
import React from "react";

interface Props {
    descrInput?: string,         //описание входные данных
    descrOutput?: string,         //описание выходных данных
    isReadonly?: boolean
}


const InputOutputDatasStack = (props: Props) => {

    function Feature({ title = '', desc = '', isReadonly = false, width = '100%', height = 'auto', minHeight = '200px' }) {
        let [valueInput, setValueInput] = React.useState<string>(desc);

        return (
          <Box p={2} shadow='md' /* borderWidth='1px' */w={width} h={height} minH={minHeight}>
            <Text mb='2px'>{title}</Text>
            <Textarea
                value={valueInput}
                isReadOnly={isReadonly}
                onChange={e => setValueInput(e.target.value) }
                size='sm'
                resize="none"
                minH={"150px"}
            />
          </Box>
        );
    };

    return (
        <ChakraProvider>           
            <HStack
                p={2}
                justifyContent="space-between"
                spacing={1}
                align='stretch'>

                <Feature
                    width = '40%'
                    title='Входные данные:'
                    desc={props.descrInput}
                    isReadonly = {props.isReadonly ?? false}
                />         

                <Icon mt="90px" as={ArrowRightIcon} boxSize={6}/>

                <Feature
                    width = '60%'
                    title='Результат:'
                    desc={props.descrOutput}
                    isReadonly = {props.isReadonly ?? false}
                />
            </HStack>
        </ChakraProvider>
   );
};

export default InputOutputDatasStack;