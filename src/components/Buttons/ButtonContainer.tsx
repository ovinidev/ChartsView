import { HStack, StackProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ButtonContainerProps extends StackProps {
	children: ReactNode;
}

export const ButtonContainer = ({
	children,
	...rest
}: ButtonContainerProps) => {
	return (
		<HStack spacing="2" {...rest}>
			{children}
		</HStack>
	);
};
