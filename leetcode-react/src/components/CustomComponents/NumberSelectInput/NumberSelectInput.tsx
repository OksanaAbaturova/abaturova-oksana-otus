import { ChakraProvider, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"
import { SizeVariant } from "../../../extentions/sizeVariant";

interface Props {
    minValue?: number,
    maxValue?: number,
    step?: number,
    defaultValue?: number,
    precision?: number,
    sizeInput?: SizeVariant,
    width?: string
}

const NumberSelectInput = (props: Props) => {
    return <ChakraProvider>
        <NumberInput 
            step={props.step ?? 1} 
            defaultValue={props.defaultValue ?? 1} 
            min={props.minValue ?? 0} 
            max={props.maxValue ?? 10}
            precision={props.precision ?? 0}
            size={props.sizeInput ?? SizeVariant.sm}
            w={props.width ?? "100%"}
            colorScheme={"teal"}
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