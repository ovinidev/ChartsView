import {
	FlexProps,
	TableContainer as ChakraTableContainer,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface TableContainerProps extends FlexProps {
	children: ReactNode;
}

export const TableContainer = ({ children }: TableContainerProps) => {
	return <ChakraTableContainer mt="1rem">{children}</ChakraTableContainer>;
};
