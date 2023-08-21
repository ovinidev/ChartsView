import { Heading, HeadingProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TitleProps extends HeadingProps {
	children: ReactNode;
}

export const Title = ({ children, ...rest }: TitleProps) => {
	return (
		<Heading
			color="gray.800"
			fontSize={{ base: "26", "4xl": "32" }}
			fontWeight={500}
			m={{ base: "1rem", "4xl": "2rem" }}
			{...rest}
		>
			{children}
		</Heading>
	);
};
