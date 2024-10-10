import { Center, ChakraProvider, Table, TableContainer, Tbody, Td, Thead, Tr } from "@chakra-ui/react"
import { TasksUsers } from "../../../models/TasksUsers";
import { SizeVariant } from "../../../extentions/sizeVariant";

interface Props {
    tasksUsers?: TasksUsers[]
}

const UserTasksTable = (props: Props) => {
    const tasks: TasksUsers[] | undefined = props.tasksUsers;
    const isOk = tasks && tasks.length > 0;

    const getAvg = (arr?: number[]) => {
        let avg: number = 0;
        if (arr !== undefined && arr.length > 0) {
            const sum : number = arr.reduce((a, b) => a + b, 0);
            avg = (sum / arr.length);
        }
        return avg;
    }

    return <ChakraProvider>
        <TableContainer  w={"500px"} alignContent={"center"} justifyContent={"center"}>
            <Table variant='simple' colorScheme='teal' size={SizeVariant.xs} alignContent={"center"} justifyContent={"center"}>               
                <Thead>
                <Tr verticalAlign={'middle'}>
                    <Td isNumeric><Center>Всего задач</Center></Td>
                    <Td isNumeric><Center>Решено</Center></Td>
                    <Td isNumeric><Center>Принято</Center></Td>
                    <Td isNumeric><Center>% принятых</Center></Td>
                    <Td isNumeric><Center>Ср. оценка</Center></Td>
                </Tr>
                </Thead>              
                <Tbody>
                <Tr verticalAlign={'middle'} >
                    <Td isNumeric><Center>{isOk ? tasks.length : 0}</Center></Td>
                    <Td isNumeric><Center>{isOk ? tasks.filter(x => x.isFinished)?.length ?? 0 : 0}</Center></Td>
                    <Td isNumeric><Center>{isOk ? tasks.filter(x => x.isAccepted)?.length ?? 0 : 0}</Center></Td>
                    <Td isNumeric><Center>{isOk ? Math.round(((tasks.filter(x => x.isAccepted)?.length ?? 0) / tasks.length) * 100) : 0}</Center></Td>
                    <Td isNumeric><Center>{isOk ? getAvg(tasks.filter(x => x.finalScore !== undefined)?.map(x => x.finalScore ?? 0) ?? undefined) : 0}</Center></Td>
                </Tr>                
                </Tbody>                
            </Table>
            </TableContainer>
    </ChakraProvider>;
}

export default UserTasksTable;