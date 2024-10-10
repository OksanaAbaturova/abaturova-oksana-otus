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
import { SizeVariant } from "../../../extentions/sizeVariant";
import { NavLink } from "react-router-dom";
import PropsTR from "../../../extentions/interfacesForTables/PropsTR";
import CustomProps from "../../../extentions/interfacesForTables/CustomProps";
import { Task } from "../../../models/Task/Task";
import TH from "../../ComponentsTable/TH/TH";
import ComplexityLevelSelect from "../ComplexityLevelSelect/ComplexityLevelSelect";
import TagsStack from "../TagsStack/TagsStack";

interface DatasProps {
    tasks: Task[];
}

interface PropsDataTR {
    task: Task
}

const TR = (props: PropsDataTR & PropsTR & CustomProps) => {
    return <Tr verticalAlign={'middle'} key={props.task.id}>
        <Td isNumeric><Center>{props.cnt}</Center></Td>
        <Td><Center>{props.task.title}</Center></Td>       
        <Td>
            <Center>
                <ComplexityLevelSelect currentLevel={props.task.complexityLevel} isReadonly={true} idTask={props.task.id}/>
            </Center>
        </Td>
        <Td>
            <Center>
                <TagsStack text={props.task.tags ?? ""} hideAdd={false} maxW={"40%"} idTask={props.task.id}/>
            </Center>
        </Td>
        <Td>
            <Center>
                <ChakraLink as={NavLink} 
                    to={`/task/${props.task.id}`} 
                    color='teal.500'
                >
                    {'перейти'}
                </ChakraLink>                
            </Center>
        </Td> 
    </Tr>
}


const ListTasks = (props: DatasProps) => {
    let countTaskInList: number = 0;

    return <ChakraProvider>
        <TableContainer  w={"100%"} alignContent={"center"} justifyContent={"center"}>
            <Table variant='simple' colorScheme='teal' size={SizeVariant.md} alignContent={"center"} justifyContent={"center"}>               
                <Thead>
                <Tr verticalAlign={'middle'}>
                    <TH header={"№ п/п"} isNumeric={true} width={"10%"}/>
                    <TH header={"Название"} width={"30%"}/>
                    <TH header={"Уровень сложности"} width={"10%"}/>
                    <TH header={"Теги"} width={"40%"} maxWidth={"40%"}/>
                    <TH header={"Ссылка"} width={"10%"}/>
                </Tr>
                </Thead>              
                <Tbody>
                    {props.tasks.map((t) => { 
                        countTaskInList += 1;
                        return <TR key={t.id} task={t} cnt={countTaskInList}/>
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    </ChakraProvider>;
}

export default ListTasks;