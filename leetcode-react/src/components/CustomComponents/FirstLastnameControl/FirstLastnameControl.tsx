import { ChakraProvider, FormControl, FormLabel } from "@chakra-ui/react";
import FirstLastnameInput from "../FirstLastnameInput/FirstLastnameInput";

interface Props {
    firstName?: string,
    lastName?: string,
    idUser?: number
}

export default function FirstLastnameControl(props: Props) {
    return <ChakraProvider>
            <FormControl colorScheme="teal" isRequired w={"500px;"}>
                <FormLabel>Фамилия имя</FormLabel>
                <FirstLastnameInput firstName={props.firstName} lastName={props.lastName} idU={props.idUser}/>
            </FormControl>
        </ChakraProvider>;
}