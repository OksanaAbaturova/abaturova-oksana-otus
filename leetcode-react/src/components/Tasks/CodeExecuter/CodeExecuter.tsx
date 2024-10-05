import { Button, ChakraProvider, VStack } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

interface Props {
    srcDoc: string,
    runCode: MouseEventHandler<HTMLInputElement>
}

const iframeStyle = ({
    borderRadius: "5px",
    backgroundColor: "white"
});

// функция принимает значение атрибута `srcdoc` и метод для изменения этого значения
const CodeExecutor = (props: Props) => {
    
    return <ChakraProvider>
        <VStack align={"stretch"} spacing={2} p={"1"} height={"100%"}>
            <Button colorScheme="teal" maxW={"150px"} onClick={() => props.runCode} >Запустить</Button>
            <iframe
                style={iframeStyle}
                height={"100%"}
                srcDoc={props.srcDoc}
                title='output'
                // разрешаем выполнение скриптов
                sandbox='allow-scripts'
            />
        </VStack>
    </ChakraProvider>
}


export default CodeExecutor;
