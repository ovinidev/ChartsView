/* eslint-disable react/no-children-prop */
import {
	Input,
	InputGroup,
	InputLeftElement,
	Icon,
	InputProps,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";

interface InputSearchProps extends InputProps {
	handleChange: (e: string) => void;
}

export const InputSearch = ({ handleChange, ...rest }: InputSearchProps) => {
	return (
		<InputGroup
			w="15rem"
			m={{ base: "0 0 0.5rem 1rem", "4xl": "0 0 0.5rem 2rem" }}
		>
			<InputLeftElement
				pointerEvents="none"
				children={<Icon fontSize="1.5rem" color="#4A5568" as={MdSearch} />}
			/>

			<Input
				type="search"
				border="1px solid #000"
				onChange={(e) => handleChange(e.target.value)}
				focusBorderColor="gray.900"
				placeholder="O que procura?"
				_placeholder={{
					color: "gray.600",
				}}
				_hover={{
					filter: "brightness(0.9)",
				}}
				borderRadius="8px"
				{...rest}
			/>
		</InputGroup>
	);
};
