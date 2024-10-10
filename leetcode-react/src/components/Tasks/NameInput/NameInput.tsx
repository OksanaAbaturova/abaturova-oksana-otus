import { ChakraProvider, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../../features/tasks/tasksSlice';


interface Props {
    text: string,
    isRequired?: boolean,    //обязательность
    isReadOnly?: boolean,
    variant?: "outline" | "flushed" | "filled" | "unstyled",  //тип обрамления поля
    idTask?: number
}

const NameInput = (props: Props) => {
    const idValueTask: number | undefined = props.idTask;
    const [currentVal, SetCurrentVal] = useState<string>(props.text);
    const dispatch = useDispatch();

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetCurrentVal(e.target.value);
        if (idValueTask) {
            dispatch(updateTask({id: idValueTask, changes: {title: e.target.value}}));
        }
    }

    return (
        <ChakraProvider>
            <InputGroup size='md' p={2}>
                <InputLeftAddon>Наименование:</InputLeftAddon>
                <Input 
                    variant = {props.variant ?? 'outline'}
                    isRequired = {props.isRequired ?? false}
                    placeholder = 'введите наименование'
                    value = {currentVal}
                    isReadOnly = {props.isReadOnly ?? false}
                    onChange={handlerChange}
                />
            </InputGroup>
        </ChakraProvider>
    );
};

export default NameInput;