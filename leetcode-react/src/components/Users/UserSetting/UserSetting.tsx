import {ChakraProvider, VStack } from "@chakra-ui/react";
import { User } from "../../../models/User/User";
import EmailInput from "../../CustomComponents/EmailInput/EmailInput";
import RaitingInput from "../RaitingInput/RaitingInput";
import FirstLastnameControl from "../../CustomComponents/FirstLastnameControl/FirstLastnameControl";
import UserTasksTableControl from "../UserTasksTableControl/UserTasksTableControl";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hook";

const UserSetting = () => {
    const {userId} = useParams();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const oneUser: User | undefined = userId ? useAppSelector((state) =>  state.users.entities[parseInt(userId)]) : undefined;

    return <ChakraProvider>
        <VStack w={"100%"} align={"center"} spacing={4}>
            <FirstLastnameControl firstName={oneUser?.firstname ?? ""} lastName={oneUser?.lastname ?? ""} idUser={oneUser?.id}/> 
            <br/>
            <EmailInput valueEmail={oneUser?.email} idUser={oneUser?.id}/>            
            <br/>
            <UserTasksTableControl tasks={oneUser?.tasks} />
            <br/>
            <RaitingInput value={oneUser?.raiting ?? 0} idUser={oneUser?.id}/ >
        </VStack>
    </ChakraProvider>
}

export default UserSetting;