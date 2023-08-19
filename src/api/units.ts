import { axiosInstance } from "./axiosInstance";
import { UNITS } from "@constants/entities";
import { Unit } from "@interfaces/units";

export const getUnits = async () => {
	const { data } = await axiosInstance.get<Unit[]>(UNITS);

	return data;
};

export const getUnitById = async (id: string) => {
	const { data } = await axiosInstance.get<Unit>(`${UNITS}/${id}`);

	return data;
};
