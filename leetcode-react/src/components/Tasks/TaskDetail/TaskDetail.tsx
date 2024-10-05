import { ChakraProvider, VStack } from "@chakra-ui/react";
import NameInput from "../NameInput/NameInput";
import DescriptionTextarea from "../DescriptionTextarea/DescriptionTextarea";
import LevelAndTagsTask from "../LevelAndTagsTask/LevelAndTagsTask";
import InputOutputBlock from "../InputOutputBlock/InputOutputBlock";
import { InputOutputParams } from "../../../models/Task/InputOutputParams";


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

const TaskDetail = () => {

     return <>
       <ChakraProvider>
            <VStack spacing={1} align='stretch'>
                <LevelAndTagsTask actualTags="программирование; алгоритмы; структуры данных"/>
                <NameInput text="Это первая задача (для примера)" isRequired={true}/>
                <DescriptionTextarea text="Описание первой задачи" isRequired={true} minHeight="200px"/>
                <InputOutputBlock innerBlocks={oneIOParams} isReadOnly={false}/>
            </VStack>
        </ChakraProvider>
     </>;
};

export default TaskDetail;


