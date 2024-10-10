import { Center, Th } from "@chakra-ui/react";
import CustomProps from "../../../extentions/interfacesForTables/CustomProps";
import PropsTH from "../../../extentions/interfacesForTables/ProtsTH";

const TH = (props: PropsTH & CustomProps) => {
    return <Th {...props}>
            <Center>{props.header ?? ""}</Center>
        </Th>;
}

export default TH;