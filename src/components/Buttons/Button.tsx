import {
	Button as ChakraButton,
	ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

interface ButtonProps extends ChakraButtonProps {
	text: string;
}

export const Button = ({ text, ...rest }: ButtonProps) => {
	return (
		<ChakraButton
			fontWeight={700}
			transition="all 0.5s ease"
			borderRadius="8px"
			_hover={{
				filter: "brightness(0.95)",
				transform: "scale(1.03)",
			}}
			_focus={{
				background: "primary",
			}}
			{...rest}
		>
			{text}
		</ChakraButton>
	);
};
