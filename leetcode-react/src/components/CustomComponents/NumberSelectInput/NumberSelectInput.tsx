import { ChakraProvider, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"
import { SizeVariant } from "../../../extentions/sizeVariant";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../features/users/usersSlice";

interface Props {
    minValue?: number,
    maxValue?: number,
    step?: number,
    defaultValue?: number,
    precision?: number,
    sizeInput?: SizeVariant,
    width?: string
    idU?: number
}

const NumberSelectInput = (props: Props) => {
    let idUser: number | undefined = props.idU;
    const [value, setValue] = useState<number>(props.defaultValue ?? 1);
    
    const dispatch = useDispatch();

    const handleChange = (e:string, en: number) => {        
        setValue(en); 
        if (idUser) {
            dispatch(updateUser({ id: idUser as number, changes: { raiting: en} }));
        }
    }

    return <ChakraProvider>
        <NumberInput 
            step={props.step ?? 1} 
            defaultValue={value} 
            min={props.minValue ?? 0} 
            max={props.maxValue ?? 10}
            precision={props.precision ?? 0}
            size={props.sizeInput ?? SizeVariant.sm}
            w={props.width ?? "100%"}
            colorScheme={"teal"}
            onChange={ handleChange}
        >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    </ChakraProvider>;
}

export default NumberSelectInput;