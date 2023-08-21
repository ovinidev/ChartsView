import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface AssetsStatusContainerProps {
	children: ReactNode;
}

export const AssetsStatusContainer = ({
	children,
}: AssetsStatusContainerProps) => {
	return (
		<Flex
			direction={{ base: "column", "4xl": "row" }}
			mt="3rem"
			gap="4"
			justify="center"
			align="center"
		>
			{children}
		</Flex>
	);
};
