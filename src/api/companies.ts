import { axiosInstance } from "./axiosInstance";
import { COMPANIES } from "@constants/entities";
import { Company } from "@interfaces/companies";

export const getCompanies = async () => {
	const { data } = await axiosInstance.get<Company[]>(COMPANIES);

	return data;
};
