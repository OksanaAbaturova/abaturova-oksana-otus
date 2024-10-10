import { ChakraProvider, Textarea } from '@chakra-ui/react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../../features/tasks/tasksSlice';

interface Props {
    text: string,
    minHeight?: string,
    isRequired?: boolean,    //обязательность
    isReadonly?: boolean,
    variant?: "outline" | "flushed" | "filled" | "unstyled",  //тип обрамления поля
    idTask?: number
}

const DescriptionTextarea = (props: Props) => {
    const idValueTask: number | undefined = props.idTask;
    const [currentVal, SetCurrentVal] = useState<string>(props.text);
    const dispatch = useDispatch();
    
    const handlerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        SetCurrentVal(e.target.value);
        if (idValueTask) {
            dispatch(updateTask({id: idValueTask, changes: {description: e.target.value}}));
        }
    }

    return (
        <ChakraProvider >
            <Textarea 
                value={currentVal}
                onChange={handlerChange}
                w= {"100%"}
                minH={props.minHeight ?? "100%"}
                m= {2}
                p= {2}                
                placeholder='введите описание'
                variant= {props.variant ?? 'outline'}
                isReadOnly= {props.isReadonly ?? false}
                size='md'
                resize="none"
                isRequired={props.isRequired ?? false}
            />
        </ChakraProvider>
    );
};

export default DescriptionTextarea;