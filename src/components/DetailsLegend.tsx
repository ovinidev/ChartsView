import { Text, TextProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface DetailsLegendProps extends TextProps {
	label: string;
	children: ReactNode;
}

export const DetailsLegend = ({
	label,
	children,
	...rest
}: DetailsLegendProps) => {
	return (
		<Text {...rest}>
			<b>{label}:</b> {children}
		</Text>
	);
};
