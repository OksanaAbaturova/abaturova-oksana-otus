import { ChakraProvider, Select } from "@chakra-ui/react";
import { useState } from "react";
import { ComplexityLevelTask } from "../../../models/Task/ComplexityLevelTask";
import getEnumKeys from "../../../extentions/Helpers/EnumHelpers";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { updateTask } from "../../../features/tasks/tasksSlice";
import { Task } from "../../../models/Task/Task";

interface Props {
    currentLevel?: ComplexityLevelTask,
    isReadonly?: boolean,
    idTask?: number | undefined
}

/**Выбор уровня сложности */
const ComplexityLevelSelect = (props: Props) =>  {
    const [selectedLevel, setSelectedLevelOption] = useState<ComplexityLevelTask>(props.currentLevel ?? ComplexityLevelTask.Easy);
    const dispatch = useAppDispatch();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    let task: Task | undefined = props.idTask ? useAppSelector((st) => st.tasks.entities[props.idTask as number]) : undefined;

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = ComplexityLevelTask[event.target.value as keyof typeof ComplexityLevelTask];
        setSelectedLevelOption(selectedValue);
        if (task) {
            dispatch(updateTask({id: task.id, changes: {complexityLevel: selectedValue}}));
        }
    };

    return(
        <ChakraProvider>
            <Select 
                isDisabled={props.isReadonly ?? true ? true : false}
                colorScheme={"teal"}
                w={200}
                placeholder="Выберите уровень сложности"
                onChange={handleSelectChange}
                value={selectedLevel} >
                {
                    getEnumKeys(ComplexityLevelTask).map((key, index) => (
                        <option key={index} value={ComplexityLevelTask[key]}>
                            {key}
                        </option>
                    ))            
                }
            </Select>
        </ChakraProvider>
    );
};


export default ComplexityLevelSelect;