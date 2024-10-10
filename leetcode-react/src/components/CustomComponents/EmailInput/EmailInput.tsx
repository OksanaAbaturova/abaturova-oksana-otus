import { ChakraProvider, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../features/users/usersSlice";

interface Props {
    valueEmail?: string,
    idUser?: number
}

const EmailInput = (props: Props) => {
    const idValueUser: number | undefined = props.idUser;
    const [email, setEmail] = useState<string>(props.valueEmail ?? '');
    const dispatch = useDispatch();
    
    const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (idValueUser) {
            dispatch(updateUser({id: idValueUser, changes: {email: e.target.value}}));
        }
    }

    return <ChakraProvider>
        <FormControl colorScheme={"teal"} isRequired w={"500px;"}>
              <FormLabel>Email</FormLabel>
              <Input type="email"  value={email} placeholder="test@test.com" onChange={changeHandle}/>
        </FormControl>
    </ChakraProvider>;
}

export default EmailInput;