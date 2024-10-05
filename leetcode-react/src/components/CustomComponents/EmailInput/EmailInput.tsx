import { ChakraProvider, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useState } from "react";

interface Props {
    valueEmail?: string
}

const EmailInput = (props: Props) => {
    const [email, setEmail] = useState<string>(props.valueEmail ?? '');
    
    const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    return <ChakraProvider>
        <FormControl colorScheme={"teal"} isRequired w={"500px;"}>
              <FormLabel>Email</FormLabel>
              <Input type="email"  value={email} placeholder="test@test.com" onChange={changeHandle}/>
        </FormControl>
    </ChakraProvider>;
}

export default EmailInput;