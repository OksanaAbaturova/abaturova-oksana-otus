import { ChakraProvider, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useState } from 'react';


interface Props {
    text: string,
    isRequired?: boolean,    //обязательность
    isReadOnly?: boolean,
    variant?: "outline" | "flushed" | "filled" | "unstyled"  //тип обрамления поля
}

const NameInput = (props: Props) => {
    const [currentVal, SetCurrentVal] = useState<string>(props.text);

    return (
        <ChakraProvider>
            <InputGroup size='md' p={2}>
                <InputLeftAddon>Наименование:</InputLeftAddon>
                <Input 
                    variant = {props.variant ?? 'outline'}
                    isRequired = {props.isRequired ?? false}
                    placeholder = 'введите наименование'
                    value = {currentVal}
                    isReadOnly = {props.isReadOnly ?? false}
                    onChange={e => SetCurrentVal(e.target.value)}
                />
            </InputGroup>
        </ChakraProvider>
    );
};

export default NameInput;