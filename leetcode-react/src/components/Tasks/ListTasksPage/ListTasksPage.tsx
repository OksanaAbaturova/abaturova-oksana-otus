import { ChakraProvider, FormControl, FormLabel } from "@chakra-ui/react";
import { Task } from "../../../models/Task/Task";
import ListTasks from "../ListTasks/ListTasks";


interface Props {
    tasks: Task[]
}

const ListUsersPage = (props: Props) => {
    return <ChakraProvider>
        <FormControl colorScheme={"teal"} w={"100%"} m={"20px"}>
              <FormLabel>Задачи</FormLabel>
              <ListTasks tasks={props.tasks} />
        </FormControl>
    </ChakraProvider>;
}

export default ListUsersPage;