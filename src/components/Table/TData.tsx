import { TableCellProps, Td } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TDataProps extends TableCellProps {
	children: ReactNode;
}

export const TData = ({ children, ...rest }: TDataProps) => {
	return (
		<Td
			fontWeight={400}
			color="gray.700"
			fontSize={{ base: "16", "4xl": "18" }}
			{...rest}
		>
			{children}
		</Td>
	);
};
