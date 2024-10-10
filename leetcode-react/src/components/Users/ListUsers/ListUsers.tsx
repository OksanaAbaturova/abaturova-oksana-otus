import { Center, 
         ChakraProvider, 
         Link as ChakraLink, 
         Table, 
         TableContainer, 
         Tbody, 
         Td,
         Thead, 
         Tr 
       } from "@chakra-ui/react";
import { User } from "../../../models/User/User";
import { SizeVariant } from "../../../extentions/sizeVariant";
import NumberSelectInput from "../../CustomComponents/NumberSelectInput/NumberSelectInput";
import { NavLink } from "react-router-dom";
import PropsTR from "../../../extentions/interfacesForTables/PropsTR";
import CustomProps from "../../../extentions/interfacesForTables/CustomProps";
import TH from "../../ComponentsTable/TH/TH";
import { useMemo } from "react";
import { useAppSelector } from "../../../app/hook";
import { RootState } from "../../../app/store";


interface DatasProps {
    users: User[];
}

interface PropsDataTR {
    user: User
}

const TR = (props: PropsDataTR & PropsTR & CustomProps) => {
   
    return <Tr verticalAlign={'middle'} key={props.user.id}>
        <Td isNumeric><Center>{props.cnt}</Center></Td>
        <Td><Center>{props.user.email}</Center></Td>
        <Td><Center>{`${props.user.firstname} ${props.user.lastname}`}</Center></Td>
        <Td>
            <Center>
                <NumberSelectInput defaultValue={props.user.raiting ?? 0} sizeInput={SizeVariant.sm} idU={props.user.id}/>
            </Center>
        </Td>
        <Td>
            <Center>
                <ChakraLink as={NavLink} 
                    to={`/user/${props.user.id}`} 
                    color='teal.500'
                >
                    {'перейти'}
                </ChakraLink>                
            </Center>
        </Td> 
    </Tr>
}

const ListUsers = (props: DatasProps) => {
    let countUserInList: number = 0;
    let content:  React.ReactNode;

    const users = useAppSelector((state :RootState) => {
        const initialData = Object.values(state.users.entities);
        return initialData;
    });

    const sortedUsers = useMemo(() => {
        const sortedUsers = users.slice();
        sortedUsers.sort((a: User, b: User) => (b.firstname ?? "").localeCompare(a.firstname ?? ""))
        return sortedUsers;
    }, [users]);

    content = <TableContainer  w={"100%"} alignContent={"center"} justifyContent={"center"}>
        <Table variant='simple' colorScheme='teal' size={SizeVariant.md} alignContent={"center"} justifyContent={"center"}>               
            <Thead>
            <Tr verticalAlign={'middle'}>
                <TH header={"№ п/п"} isNumeric={true} width={"10%"}/>
                <TH header={"Адрес эл. почты"} width={"30%"}/>
                <TH header={"Фамилия имя"} width={"30%"}/>
                <TH header={"Рейтинг"} width={"15%"}/>
                <TH header={"Ссылка"} width={"15%"}/>
            </Tr>
            </Thead>              
            <Tbody>
                {sortedUsers.map((u: User) => {  
                    countUserInList += 1;
                    return <TR key={u.id} user={u} cnt={countUserInList}/>
                })}
            </Tbody>
        </Table>
    </TableContainer>;
 
    return <ChakraProvider>         
        {content}
    </ChakraProvider>;
}

export default ListUsers;