import { ChakraProvider, Divider, VStack } from "@chakra-ui/react";
import NameInput from "../NameInput/NameInput";
import DescriptionTextarea from "../DescriptionTextarea/DescriptionTextarea";
import LevelAndTagsTask from "../LevelAndTagsTask/LevelAndTagsTask";
import InputOutputBlock from "../InputOutputBlock/InputOutputBlock";
import { InputOutputParams } from "../../../models/Task/InputOutputParams";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hook";
import { Task } from "../../../models/Task/Task";
import { ComplexityLevelTask } from "../../../models/Task/ComplexityLevelTask";


const oneIOParams: InputOutputParams[] = [
    {
        inputData: 'Пример входных параметров 1',        
        outputData: 'Пример выходных параметров 1',
    },
    
    {
        inputData: 'Тут входные параметры для 2 примера',        
        outputData: 'Тут выходные параметры для 2 примера',
    }
];

interface Props {
    taskId?: number
}

const TaskDetail = (props: Props) => {
    const {taskId} = useParams();    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const oneTask: Task | undefined = taskId ? useAppSelector((state) => state.tasks.entities[parseInt(taskId)]) : undefined;

     return <>
       <ChakraProvider>
            <VStack spacing={1} align='stretch'>
                <LevelAndTagsTask 
                    actualLevel={oneTask ? oneTask.complexityLevel : ComplexityLevelTask.Easy} 
                    actualTags={oneTask ? oneTask.tags : "программирование; алгоритмы; структуры данных"}
                    taskId={oneTask?.id}
                />
                <NameInput text={oneTask ? oneTask.title : "Это первая задача (для примера)"} isRequired={true} idTask={oneTask?.id}/>
                <DescriptionTextarea text={oneTask ? oneTask.description : "Описание первой задачи"} isRequired={true} minHeight="200px" idTask={oneTask?.id}/>
                <InputOutputBlock innerBlocks={oneTask ? oneTask.ioParams : oneIOParams} isReadOnly={false} idTask={oneTask?.id}/>
                <br/>
                <Divider/>
                <br/>
            </VStack>
        </ChakraProvider>
     </>;
};

export default TaskDetail;


