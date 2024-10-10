import { EditIcon } from "@chakra-ui/icons";
import { 
    Box, 
    Button, 
    ButtonGroup, 
    ChakraProvider, 
    FormControl,
    FormLabel, 
    HStack,
    IconButton, 
    Input, 
    Popover, 
    PopoverArrow, 
    PopoverCloseButton, 
    PopoverContent, 
    PopoverTrigger, 
    Stack, 
    useDisclosure 
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react";
import  FocusLock from "react-focus-lock";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../features/users/usersSlice";

/**пропсы для формы */
interface FormProps {
    firstFieldRef: React.RefObject<HTMLInputElement>,
    onCancel: React.MouseEventHandler<HTMLButtonElement>,    
    firstname: string,
    lastname: string,
}

/**основные пропсы - для элемента */
interface NameProps {
    firstName?: string,
    lastName?: string,
    idU?: number
}

const FirstLastnameInput = (props: NameProps) => {
    let idValueUser: number | undefined = props.idU;
    const { onOpen, onClose, isOpen } = useDisclosure();
    const firstFieldRef = React.useRef<HTMLInputElement>(null);
    const [fname, setFname]  = useState<string>(`${props.firstName ?? 'фамилия'}`);
    const [lname, setLname]  = useState<string>(`${props.lastName ?? 'имя'}`);
    const [allName, setAllName] = useState<string>(`${fname} ${lname}`);
    const dispatch = useDispatch();

    useEffect (() => {
            setAllName(`${fname} ${lname}`);            
        }, [fname, lname]);

    /**Внутренний блок - всплывающее окно для редактирования фамиоии и имени */
    const Form = (props:  React.PropsWithChildren<FormProps> ) => {
        const [nameFirst, setNameFirst] = useState<string>(props.firstname);
        const [nameLast, setNameLast] = useState<string>(props.lastname);
        const [errors, setErrors] =  useState<string>('');

        interface PropsTextInput {
            label: string,
            idInput: string,
            defaultValue?: string
        } 
       
        const TextInput = React.forwardRef<HTMLInputElement, React.PropsWithChildren<PropsTextInput>>((props, ref) => {
            const [val, setVal] = useState<string>(props.defaultValue ?? "");    

            const onChangeTextInput= (e: React.ChangeEvent<HTMLInputElement>) => {
                setErrors('');
                setVal(e.target.value);
                if (e.target.id === 'last-name') {
                    setNameLast(e.target.value);
                }
                if (e.target.id === 'first-name') {
                    setNameFirst(e.target.value);
                }                
            }        
        
            return (
              <FormControl>
                <FormLabel htmlFor={props.idInput}>{props.label}</FormLabel>
                <Input isReadOnly={false} ref={ref} id={props.idInput} value={val} onChange={onChangeTextInput}/>
              </FormControl>
            )
        });
    
    /** Изменение данных в модальном окне ФИО */
        const OnChangeUpdateFirstLastName = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            setErrors('');
            if (nameFirst && nameLast) {
                if (nameFirst === props.firstname && nameLast === props.lastname) {
                    setErrors('Данные не изменены!');
                }
                else {
                    setFname(nameFirst);
                    setLname(nameLast);
                    if (idValueUser) {
                        dispatch(updateUser({id: idValueUser, changes: {firstname: nameFirst, lastname: nameLast}}))
                    }
                    props.onCancel(e);
                }
            }
            else {
                setErrors('Поля необходимо заполнить!');
            }
        }
    
        return (
          <Stack spacing={4}>
            <TextInput
              label='Фамилия'
              idInput='first-name'
              ref={props.firstFieldRef}
              defaultValue={nameFirst}
            />
            <TextInput 
                label='Имя' 
                idInput='last-name' 
                defaultValue={nameLast} 
            />
            <Input variant='unstyled' id="errors" hidden={errors === ""} color="red" value={errors} onChange={() => {}}/>
            <ButtonGroup display='flex' justifyContent='flex-end'>
              <Button variant='outline' onClick={(e) =>{setErrors(''); props.onCancel(e);}} >
                Отмена
              </Button>
              <Button colorScheme='teal' onClick={(e) => {OnChangeUpdateFirstLastName(e)}}>
                Изменить
              </Button>
            </ButtonGroup>
          </Stack>
        )
      };

    return <ChakraProvider>
        <HStack  >  
            <Box w={"100%"} border={"2px solid teal"} borderRadius={"5px"}>          
                <Box pl={"10px"} display='inline-block' mr={3}>
                    {allName}
                </Box>        
                <Popover
                isOpen={isOpen}
                initialFocusRef={firstFieldRef}
                onOpen={onOpen}
                onClose={onClose}
                placement='right'
                closeOnBlur={false}
                >
                <PopoverTrigger>
                    <IconButton size='sm' icon={<EditIcon />} aria-label={""} />
                </PopoverTrigger>
                <PopoverContent p={5}>
                    <FocusLock returnFocus persistentFocus={false}>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <Form 
                        firstFieldRef={firstFieldRef} 
                        firstname={fname} 
                        lastname={lname} 
                        onCancel={onClose} />
                    </FocusLock>
                </PopoverContent>
                </Popover>   
            </Box>         
        </HStack>   
    </ChakraProvider>;
};

export default FirstLastnameInput;