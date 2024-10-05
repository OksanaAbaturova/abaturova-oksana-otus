import {
    ChakraProvider,
    VStack,
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel,
    Box
} from '@chakra-ui/react';
import NameInput from '../NameInput/NameInput';
import DescriptionTextarea from '../DescriptionTextarea/DescriptionTextarea';
import InputOutputBlock from '../InputOutputBlock/InputOutputBlock';
import { InputOutputParams } from '../../../models/Task/InputOutputParams';

const TabTaskChakra = () => {
    const primerIOParams: InputOutputParams[] = [
        {
            inputData: 'Параметры на вход',        
            outputData: 'Результат на выходе',
        }
    ];

    return (
        <ChakraProvider>
            
                <VStack 
                    w={"webkit-fill-available"} 
                    h={"100%"}  
                    justifyContent={"space-between"}
                    alignItems={"stretch"}                   
                    boxShadow={'md'} 
                    p={1} 
                    borderStyle={"solid"} 
                    borderWidth={1} 
                    rounded={"lg"}
                >
                    <Box h={"10%"}>
                        <NameInput text="Первая задача" isRequired={true} isReadOnly={true}/>
                    </Box>

                    <Box h={"90%"}>
                        <Tabs size='md' variant='enclosed'>
                        <TabList justifyContent="space-between">
                            <Tab>Описание</Tab>
                            <Tab>Оценка решения</Tab>
                        </TabList>
                        <TabPanels w={"100%"} h={"100%"}>
                            <TabPanel>
                                <VStack w={"100%"} h={"100%"} justifyContent={"stretch-between"} align={"stretch"}>
                                    <DescriptionTextarea text="Описание задачи" isRequired={true} isReadonly={true} minHeight="300px" />
                                    <InputOutputBlock innerBlocks={primerIOParams} isReadOnly={true} />
                                </VStack>
                            </TabPanel>                        
                            <TabPanel>
                                <p>Итог решения задачи</p>
                            </TabPanel>
                        </TabPanels>
                        </Tabs>
                    </Box>
                </VStack>
           
        </ChakraProvider>
    );
};

export default TabTaskChakra;