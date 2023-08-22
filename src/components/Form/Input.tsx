import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input as ChakraInput,
	InputProps as ChakraInputProps,
	Flex,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
	label: string;
	labelColor?: string;
	error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
	{ label, labelColor = "#000000", error, ...rest },
	ref: any,
) => {
	return (
		<FormControl isInvalid={!!error}>
			{label && (
				<FormLabel
					color={labelColor}
					fontSize={{ base: 16, "4xl": 20 }}
					fontWeight={400}
				>
					<Flex align="center">{label}</Flex>
				</FormLabel>
			)}
			<ChakraInput
				border="1px solid #000"
				_placeholder={{
					color: "gray.100",
				}}
				borderRadius="8px"
				size={{ base: "md", "4xl": "lg" }}
				w={{ base: 150, md: 180 }}
				focusBorderColor="gray.600"
				transition="all 0.5s ease"
				_hover={{
					filter: "brightness(0.9)",
				}}
				ref={ref}
				{...rest}
			/>
			{error && (
				<FormErrorMessage fontSize="16">{error.message}</FormErrorMessage>
			)}
		</FormControl>
	);
};

export const Input = forwardRef(InputBase);
