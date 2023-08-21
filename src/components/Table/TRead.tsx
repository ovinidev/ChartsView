import { TableRowProps, Tr } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TReadProps extends TableRowProps {
	children: ReactNode;
}

export const TRead = ({ children, ...rest }: TReadProps) => {
	return (
		<Tr
			transition="all 0.5s ease"
			cursor="pointer"
			_hover={{
				background: "gray.300",
			}}
			{...rest}
		>
			{children}
		</Tr>
	);
};
