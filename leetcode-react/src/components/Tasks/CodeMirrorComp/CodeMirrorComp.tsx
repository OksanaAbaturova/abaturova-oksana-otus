import React, {useState} from 'react';
import {ChakraProvider, Heading, VStack, HStack, MenuButton, Menu, MenuList, MenuItem, Button} from "@chakra-ui/react";
import {githubLight} from '@uiw/codemirror-theme-github';
import {python} from "@codemirror/lang-python";
import CodeMirror from '@uiw/react-codemirror';
import { LanguageSupport } from '@codemirror/language';
import {markdown} from "@codemirror/lang-markdown";
import {javascript} from "@codemirror/lang-javascript";
import {cpp} from "@codemirror/lang-cpp";
import {html} from "@codemirror/lang-html";
import {json} from "@codemirror/lang-json";
import {java} from "@codemirror/lang-java";

const EXTENSIONS: { [key: string]: LanguageSupport[] } = {
    markdown: [markdown()],
    python: [python()],
    javascript: [javascript()],
    typescript: [javascript()],
    cpp: [cpp()],
    'c++': [cpp()],
    html: [html()],
    json: [json()],
    java: [java()],
};

const CodeMirrorComp = () => {
  const [language, setLanguage] = useState("javascript");
  const [text, setText] = useState("print('Введите код решения')");
  return (
        <ChakraProvider>
            <VStack alignItems={"stretch"} width={"ihnerit"} height={"100%"} boxShadow={'md'} p={1} borderStyle={"solid"} 
                borderWidth={1} rounded={"lg"} justify={"space-between"} align={"stretch"}>
                <HStack w={"100%"} maxH={"50px"} justify={"space-between"}>
                    <Heading colorScheme={"teal"} as='h4' size='md' color={"teal"}></Heading>
                    <Menu>
                        <MenuButton colorScheme={"teal"} as={Button}>
                            {language}
                        </MenuButton>
                        <MenuList >
                            {Object.entries(EXTENSIONS).map(([language, _], i) => (
                                <MenuItem color={"teal"} onClick={() => setLanguage(language)} key={i}>{language}</MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                </HStack>
                
                <CodeMirror
                    width={"webkit-fill-available"}
                    height={"webkit-fill-available"}
                    value={text}
                    onChange={(newValue) => setText(newValue)}
                    theme={githubLight}                    
                    extensions={[EXTENSIONS[language]]}
                    basicSetup={{autocompletion: true}}
                    minWidth={'550px'}
                    minHeight={'520px'}
                />
                
            </VStack>
        </ChakraProvider>
    );
};

export default CodeMirrorComp;
