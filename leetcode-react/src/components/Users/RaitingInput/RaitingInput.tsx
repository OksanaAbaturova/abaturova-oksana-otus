import { ChakraProvider, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import NumberSelectInput from '../../CustomComponents/NumberSelectInput/NumberSelectInput';
import { SizeVariant } from '../../../extentions/sizeVariant';


interface Props {
    value?: number,
   /* isRequired?: boolean,    //обязательность
    isReadOnly?: boolean,
    variant?: "outline" | "flushed" | "filled" | "unstyled"  //тип обрамления поля*/
}

const RaitingInput = (props: Props) => {   

    return (
        <ChakraProvider>
            <InputGroup w={"500px"} size='md' colorScheme={'teal'}>
                <InputLeftAddon>Рейтинг:</InputLeftAddon>
                <NumberSelectInput defaultValue={props.value ?? 0} sizeInput={SizeVariant.md}/>               
            </InputGroup>
        </ChakraProvider>
    );
};

export default RaitingInput;