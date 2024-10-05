import { ChakraProvider, Textarea } from '@chakra-ui/react'
import { useState } from 'react';

interface Props {
    text: string,
    minHeight?: string,
    isRequired?: boolean,    //обязательность
    isReadonly?: boolean,
    variant?: "outline" | "flushed" | "filled" | "unstyled"  //тип обрамления поля
}

const DescriptionTextarea = (props: Props) => {
    const [currentVal, SetCurrentVal] = useState<string>(props.text);

    return (
        <ChakraProvider >
            <Textarea 
                value={currentVal}
                onChange={e => SetCurrentVal(e.target.value) }
                w= {"100%"}
                minH={props.minHeight ?? "100%"}
                m= {2}
                p= {2}                
                placeholder='введите описание'
                variant= {props.variant ?? 'outline'}
                isReadOnly= {props.isReadonly ?? false}
                size='md'
                resize="none"
                isRequired={props.isRequired ?? false}
            />
        </ChakraProvider>
    );
};

export default DescriptionTextarea;