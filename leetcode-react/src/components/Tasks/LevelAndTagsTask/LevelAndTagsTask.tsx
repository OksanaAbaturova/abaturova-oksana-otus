import { Box, ChakraProvider, HStack } from "@chakra-ui/react";
import ComplexityLevelSelect from "../ComplexityLevelSelect/ComplexityLevelSelect";
import TagsStack from "../TagsStack/TagsStack";
import { ComplexityLevelTask } from "../../../models/Task/ComplexityLevelTask";

interface Props {
    actualLevel?: ComplexityLevelTask,
    levelReadOnly?: boolean,     /**допустимость выбора уровня сложности */
    actualTags?: string
    hideBlockAddTags?: boolean,  /** скрыть блок добавления тегов */
    taskId?: number | undefined
}

/**Уровеньт сложности + массив тегов */
const LevelAndTagsTask = (props: Props) =>  {
    //const [level, setLevel] = useState<ComplexityLevelTask | undefined>(props.actualLevel);
    return (
        <ChakraProvider>
            <HStack p={2} justifyContent="space-between">
                <Box w={220} >
                    <ComplexityLevelSelect currentLevel={props.actualLevel} isReadonly={props.levelReadOnly ?? false} idTask={props.taskId}/> 
                </Box>
                <TagsStack text={props.actualTags ?? ""}  hideAdd={props.hideBlockAddTags ?? false} idTask={props.taskId}/>
            </HStack>
        </ChakraProvider>
    );
};

export default LevelAndTagsTask;