import { Button, ChakraProvider } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

const ButtonBack = () => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(-1);   
    }

    const nextSymbol: string = "<";

    return <ChakraProvider>
        <Button 
            m={"2px"} 
            color={"teal"}
            onClick={clickHandler}
        >
          {nextSymbol}
        </Button>
    </ChakraProvider>
}

export default ButtonBack;