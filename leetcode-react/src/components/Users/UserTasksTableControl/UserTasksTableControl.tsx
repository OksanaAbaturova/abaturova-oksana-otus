import { ChakraProvider, FormControl, FormLabel } from "@chakra-ui/react"
import { TasksUsers } from "../../../models/TasksUsers";
import UserTasksTable from "../UserTasksTable/UserTasksTable";

interface Props {
    tasks?: TasksUsers[]
}

const UserTasksTableControl = (props: Props) => {
    return <ChakraProvider>
        <FormControl colorScheme={"teal"} isRequired w={"500px;"}>
              <FormLabel>Статистика выполнения заданий</FormLabel>
              <UserTasksTable tasksUsers={props.tasks} />
        </FormControl>
    </ChakraProvider>;
}

export default UserTasksTableControl;