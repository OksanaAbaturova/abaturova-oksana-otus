import { Box, ChakraProvider, HStack } from "@chakra-ui/react";
import ComplexityLevelSelect from "../ComplexityLevelSelect/ComplexityLevelSelect";
import TagsStack from "../TagsStack/TagsStack";
import { ComplexityLevelTask } from "../../../models/Task/ComplexityLevelTask";

interface Props {
    actualLevel?: ComplexityLevelTask,
    levelReadOnly?: boolean,     /**допустимость выбора уровня сложности */
    actualTags?: string
    hideBlockAddTags?: boolean  /** скрыть блок добавления тегов */
}

/**Уровеньт сложности + массив тегов */
const LevelAndTagsTask = (props: Props) =>  {
    return (
        <ChakraProvider>
            <HStack p={2} justifyContent="space-between"/* align={"stretch"} h={40}*/>
                <Box w={220} >
                    <ComplexityLevelSelect currentLevel={props.actualLevel} isReadonly={props.levelReadOnly ?? false}/> 
                </Box>
                <TagsStack text={props.actualTags ?? ""}  hideAdd={props.hideBlockAddTags ?? false}/>
            </HStack>
        </ChakraProvider>
    );
};

export default LevelAndTagsTask;