/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDebounce } from "./useDebounce";

interface UseSearchPropsResponse {
	inputSearch: string;
	handleChangeDebounce: (...args: any) => void;
}

export const useSearch = (): UseSearchPropsResponse => {
	const [inputSearch, setInputSearch] = useState("");

	const handleChange = (value: string) => {
		setInputSearch(value);
	};

	const handleChangeDebounce = useDebounce(handleChange, 500);

	return { inputSearch, handleChangeDebounce };
};
