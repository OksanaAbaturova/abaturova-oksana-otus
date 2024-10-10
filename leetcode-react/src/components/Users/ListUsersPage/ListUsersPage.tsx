import { ChakraProvider, FormControl, FormLabel } from "@chakra-ui/react";
import ListUsers from "../ListUsers/ListUsers";
import { User } from "../../../models/User/User";

interface Props {
    users: User[]
}

const ListUsersPage = (props: Props) => {
    return <ChakraProvider>
        <FormControl colorScheme={"teal"} w={"100%"} m={"20px"}>
              <FormLabel>Пользователи</FormLabel>
              <ListUsers users={props.users} />
        </FormControl>
    </ChakraProvider>;
}

export default ListUsersPage;