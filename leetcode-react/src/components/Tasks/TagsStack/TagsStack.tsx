import { PlusSquareIcon } from "@chakra-ui/icons";
import { Button, ChakraProvider, FormControl, FormLabel, HStack, IconButton, Input, Tag, VStack, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";

interface Props {
    text: string,
    hideAdd?: boolean
}

const TagsStack = (props: Props) => {
    let arrayTags: string[]  = props.text.split(';');

    const [hideAdd, setHideAdd] = useState<boolean>(true);
    const [hideError, setHideError] = useState<boolean>(true);
    const [textError, setTextError] = useState<string>("Значение не задано");
    const [updateArrayTags, setUpdateArrayTags] =  useState<string[]>(arrayTags);
    const ref = useRef(null);

    const SetVisibleHandler = () => {
        setHideAdd(!hideAdd);
    }

    /** Добавление тега */
    const AddTagHandler = (newText: string) => {
        arrayTags = [...updateArrayTags, newText];
        setUpdateArrayTags(arrayTags);

    }

    /** Проверка на совпадение с уже имеющимися тегами */
    const PrepareValidationTagHandler = () => {
        console.log('++');
        const elNewTag = ref.current;
        const text: string = elNewTag !== null ? (elNewTag as HTMLInputElement).value : "";
        if (text.trim() !== "") {
            if (!updateArrayTags.some(x => x.toLowerCase() === text.toLowerCase())) {
                AddTagHandler(text.trim());
                (elNewTag as unknown as HTMLInputElement).value = "";
                setHideError(true);
                SetVisibleHandler();
            }
            else {
                setTextError("Повторяющийся тег");
                setHideError(false);
            }
            
        }
        else 
        {
            setTextError("Значение не задано");
            setHideError(false);
        }
    }

    return(
        <ChakraProvider>
            <VStack spacing={1} maxW={"60vw"} shouldWrapChildren={true}>
                <HStack spacing={4} alignItems="center" justifyContent="space-between" maxW={"58vw"}>
                    {
                        updateArrayTags.filter(x => x.trim() !== '').map((oneText, i) => ( 
                            <Tag 
                                size="md" 
                                variant='solid' 
                                colorScheme='teal'
                                key={i}
                            >
                                {oneText}
                            </Tag>
                        ))
                    }
                    <IconButton
                        display={props.hideAdd ?? true ? "none" : "block"}
                        variant='solid'
                        colorScheme='teal'
                        aria-label='Добавить тег'
                        icon={<PlusSquareIcon />} 
                        onClick={() => SetVisibleHandler()}
                    > 
                    </IconButton>
                </HStack>

                <FormControl isRequired display={hideAdd ? "none" : "block"}>
                    <FormLabel>Новый тег:</FormLabel>
                    <Input ref={ref} placeholder='массивы' />
                    <Text display={hideError ? "none" : "block"} color={"red"}>{`${textError}!!!`}</Text>
                    <Button mt={4} colorScheme='teal'
                        onClick = {() => PrepareValidationTagHandler()}>
                        Сохранить
                    </Button>
                </FormControl>

            </VStack>
        </ChakraProvider>
    );
}

export default TagsStack;