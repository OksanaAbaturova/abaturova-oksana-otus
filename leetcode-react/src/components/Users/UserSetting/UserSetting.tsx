import {ChakraProvider, VStack } from "@chakra-ui/react";
import { User } from "../../../models/User/User";
import EmailInput from "../../CustomComponents/EmailInput/EmailInput";
import RaitingInput from "../RaitingInput/RaitingInput";
import FirstLastnameControl from "../../CustomComponents/FirstLastnameControl/FirstLastnameControl"
import { TasksUsers } from "../../../models/TasksUsers";

import UserTasksTableControl from "../UserTasksTableControl/UserTasksTableControl";

/*let tasksDatas : Task[] = [
    {
        id: 1,
        title: 'Задача 1',
        description: 'Описание задачи 1',
        complexityLevel: ComplexityLevelTask.Easy
    }, 
    {
        id: 2,
        title: 'Задача 2',
        description: 'Описание задачи 2',
        complexityLevel: ComplexityLevelTask.Hard
    },
    {
        id: 3,
        title: 'Задача 3',
        description: 'Описание задачи 3',
        complexityLevel: ComplexityLevelTask.Easy
    }, 
    {
        id: 4,
        title: 'Задача 4',
        description: 'Описание задачи 4',
        complexityLevel: ComplexityLevelTask.Hard
    }
];*/


let alTasksAndUsers: TasksUsers[] = [
    {
        idUser: 1,
        idTask: 1,
        isFinished: true,
        isAccepted: true,
        finalScore: 5
    },
    {
        idUser: 1,
        idTask: 3,
        isFinished: true,
        isAccepted: false,
    },
    {
        idUser: 1,
        idTask: 4,
        isFinished: true,
        isAccepted: true,
        finalScore: 3
    },
    {
        idUser: 1,
        idTask: 2,
        isFinished: true,
        isAccepted: false,
    },
    {
        idUser: 2,
        idTask: 1,
        isFinished: true,
        isAccepted: true,
        finalScore: 5
    },
];

let usersDatas : User[] = [
    {
        id: 1,
        raiting: 2,
        email: 'ivan_ivanov@gmail.com',
        firstname: 'Иванов',
        lastname: 'Иван',
        tasks: alTasksAndUsers.filter(x => x.idUser === 1)
    },
    {
        id:2,
        raiting: 8,
        email: 'max_maximov@gmail.com',
        firstname: 'Максимов',
        lastname: 'Максим',
        tasks: alTasksAndUsers.filter(x => x.idUser === 2)
    } 
];

let currentUser : User = usersDatas[0];

const UserSetting = () => {
    return <ChakraProvider>
        <VStack w={"100%"} align={"center"} spacing={4}>
            <FirstLastnameControl firstName={currentUser.firstname ?? ""} lastName={currentUser.lastname ?? ""} /> 
            <br/>
            <EmailInput valueEmail={currentUser.email} />            
            <br/>
            <UserTasksTableControl tasks={currentUser.tasks} />
            <br/>
            <RaitingInput value={currentUser.raiting ?? 0} / >
        </VStack>
    </ChakraProvider>
}

export default UserSetting;