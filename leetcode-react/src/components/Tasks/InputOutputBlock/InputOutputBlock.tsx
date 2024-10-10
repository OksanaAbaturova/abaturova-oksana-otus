import { Box, Button, ChakraProvider, HStack, IconButton, VStack } from "@chakra-ui/react";
import { InputOutputParams } from "../../../models/Task/InputOutputParams";
import InputOutputDatasStack from "../InputOutputDatasStack/InputOtputDatasStack";
import { PropsWithChildren, useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { updateTask } from "../../../features/tasks/tasksSlice";

interface Props {
    innerBlocks?: InputOutputParams[],
    isReadOnly?: boolean,
    idTask?: number
}

const defaultBlockIO: InputOutputParams = {
    inputData: "Тут пример входных данных для одной задачи",
    outputData: "Тут пример результатов выполнения задачи"
};

const InputOutputBlock = (props: PropsWithChildren<Props>) => {
    let idValueTask: number | undefined = props.idTask;
    let firstValueParams: InputOutputParams[] = props.innerBlocks ?? [defaultBlockIO];
    const [valueProps, setValueProps] = useState<InputOutputParams[]>(firstValueParams);
    const dispatch = useDispatch();

    const setCurrentProps = () :  void => {
        setValueProps(firstValueParams);
    };

    const AddBlockHandler = () => {
        firstValueParams = [...firstValueParams, defaultBlockIO];
        if (idValueTask) {
            dispatch(updateTask({id: idValueTask, changes: {ioParams: firstValueParams}}));
        }
        setCurrentProps();
    }

    const DeleteBlockHandler = () => {
        firstValueParams = firstValueParams.filter((e, ind) => ind !== (firstValueParams.length - 1));
        if (idValueTask) {
            dispatch(updateTask({id: idValueTask, changes: {ioParams: firstValueParams}}));
        } 
        setCurrentProps();
    }

    const DeleteCurrentBlockHandler = (i: number) => {
        firstValueParams = firstValueParams.filter((e, ind) => ind !== i);
        if (idValueTask) {
            dispatch(updateTask({id: idValueTask, changes: {ioParams: firstValueParams}}));
        } 
        setCurrentProps();
    }

    /**Возврат блоков входящих параметров и их результатов*/
    const innerBlock = (paramsArrayIO: PropsWithChildren<InputOutputParams[] | undefined>) : JSX.Element | JSX.Element[] => {

        if (paramsArrayIO !== undefined && paramsArrayIO.length > 0) {
            return <> {(paramsArrayIO as InputOutputParams[]).map((oneIO, i) =>         
                <HStack bgColor="#42e1ba17" border='10px' borderColor='gray.200' borderRadius="10" justifyContent="stretch" w="100%" key={i} >
                    <Box w="95%">
                        <InputOutputDatasStack   
                            descrInput={oneIO.inputData ?? defaultBlockIO.inputData}
                            descrOutput={oneIO.outputData ?? defaultBlockIO.outputData}
                        />
                    </Box>
                    <Box w="40px">
                        <IconButton 
                            variant='solid'
                            colorScheme='teal'
                            aria-label='Удалить блок'
                            icon={<CloseIcon />} 
                            onClick={() => DeleteCurrentBlockHandler(i)}
                        /> 
                    </Box>
                </HStack>
                )
            } </>
        }
        else {
            return <>
            <HStack bgColor="#42e1ba17" border='10px' borderColor='gray.200' borderRadius="10" justifyContent="stretch" w="100%">
                <Box w="95%">
                    <InputOutputDatasStack
                        descrInput={defaultBlockIO.inputData}
                        descrOutput={defaultBlockIO.outputData}
                    />
                </Box>
                <Box w="40px">
                    <IconButton
                        variant='solid'
                        colorScheme='teal'
                        aria-label='Удалить блок'
                        icon={<CloseIcon />}   
                        onClick={() => DeleteCurrentBlockHandler(0)}                     
                    />    
                </Box>        
            </HStack>
            </>
        }
    };

    /**Возврат блоков входящих параметров и их результатов*/
    const innerBlockReadonly = (paramsArrayIO: PropsWithChildren<InputOutputParams[] | undefined>) : JSX.Element | JSX.Element[] => {
        if (paramsArrayIO !== undefined && paramsArrayIO.length > 0) {
            return <> {
                 (paramsArrayIO as InputOutputParams[]).map((oneIO, i) => {
                    return <Box w="100%" justifyContent="stretch" key={i}>
                        <InputOutputDatasStack   
                            descrInput={oneIO.inputData ?? defaultBlockIO.inputData}
                            descrOutput={oneIO.outputData ?? defaultBlockIO.outputData}
                            isReadonly={true}
                        />
                    </Box>
                }
            )
        } </>
        }
        else {
            return <Box w="100%" justifyContent="stretch">
                    <InputOutputDatasStack
                        descrInput={defaultBlockIO.inputData}
                        descrOutput={defaultBlockIO.outputData}
                        isReadonly= {true}
                    />
                </Box>;               
        }
    }

    const BlockEdit = () => {
        return <ChakraProvider>
        <VStack >
            {innerBlock(valueProps)}
            <HStack spacing={5}>
                <Button colorScheme={"teal"} onClick={AddBlockHandler}>Добавить блок параметров</Button>
                <Button colorScheme={"teal"} onClick={DeleteBlockHandler}>Удалить последний блок</Button>
            </HStack>
        </VStack>
    </ChakraProvider>;
    };

    const BlockReadOnly = () => {
        return <ChakraProvider>
            <VStack >
                {innerBlockReadonly(valueProps)}
            </VStack>
        </ChakraProvider>;
    };

    return (props.isReadOnly ?? false) ? BlockReadOnly() : BlockEdit();
}

export default InputOutputBlock;
