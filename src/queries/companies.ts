import { getCompanies } from "@api/companies";
import { COMPANIES } from "@constants/entities";
import { STALE_TIME } from "@constants/staleTime";
import { useQuery } from "@tanstack/react-query";

interface UseCompaniesProps {
	name: string;
}

export const useCompanies = ({ name }: UseCompaniesProps) => {
	return useQuery(
		[COMPANIES],
		async () => {
			const data = await getCompanies();

			return data;
		},
		{
			staleTime: STALE_TIME,
			select: (item) =>
				item.filter((company) => {
					if (name.length === 0) return company;
					return company.name
						.toLocaleLowerCase()
						.includes(name.toLocaleLowerCase());
				}),
		},
	);
};
