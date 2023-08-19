import { TableCellProps, Th } from "@chakra-ui/react";
import { ReactNode } from "react";

interface THeadProps extends TableCellProps {
	children: ReactNode;
}

export const THead = ({ children, ...rest }: THeadProps) => {
	return (
		<Th
			fontWeight={600}
			color="gray.600"
			fontSize={{ base: "16", "4xl": "18" }}
			textTransform="capitalize"
			{...rest}
		>
			{children}
		</Th>
	);
};
