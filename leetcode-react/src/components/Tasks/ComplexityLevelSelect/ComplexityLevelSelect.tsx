import { ChakraProvider, Select } from "@chakra-ui/react";
import { useState } from "react";
import { ComplexityLevelTask } from "../../../models/Task/ComplexityLevelTask";
import getEnumKeys from "../TaskDetail/Helpers/EnumHelpers";

interface Props {
    currentLevel?: ComplexityLevelTask,
    isReadonly?: boolean
}

/**Выбор уровня сложности */
const ComplexityLevelSelect = (props: Props) =>  {
    const [selectedLevel, setSelectedLevelOption] = useState<ComplexityLevelTask>(props.currentLevel ?? ComplexityLevelTask.Easy);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = ComplexityLevelTask[event.target.value as keyof typeof ComplexityLevelTask];
        setSelectedLevelOption(selectedValue);        
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