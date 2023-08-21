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
				children={<Icon fontSize="1.5rem" color="#B5B5B6" as={MdSearch} />}
			/>

			<Input
				type="search"
				onChange={(e) => handleChange(e.target.value)}
				placeholder="O que procura?"
				_placeholder={{
					color: "#B5B5B6",
				}}
				borderRadius="8px"
				{...rest}
			/>
		</InputGroup>
	);
};
