import {
	FlexProps,
	TableContainer as ChakraTableContainer,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface TableContainerProps extends FlexProps {
	children: ReactNode;
}

export const TableContainer = ({ children, ...rest }: TableContainerProps) => {
	return (
		<ChakraTableContainer ml="3rem" {...rest}>
			{children}
		</ChakraTableContainer>
	);
};
