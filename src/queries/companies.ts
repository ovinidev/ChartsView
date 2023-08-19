import { getCompanies, getCompanyById } from "@api/companies";
import { COMPANIES } from "@constants/entities";
import { STALE_TIME } from "@constants/staleTime";
import { useQuery } from "@tanstack/react-query";

export const useCompanies = () => {
	return useQuery(
		[COMPANIES],
		async () => {
			const data = await getCompanies();

			return data;
		},
		{
			staleTime: STALE_TIME,
		},
	);
};

export const useCompanyById = (id: string) => {
	return useQuery(
		[COMPANIES],
		async () => {
			const data = await getCompanyById(id);

			return data;
		},
		{
			staleTime: STALE_TIME,
		},
	);
};
