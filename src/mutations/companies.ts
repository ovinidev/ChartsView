/* eslint-disable @typescript-eslint/no-explicit-any */
import { COMPANIES } from "@constants/entities";
import { Company } from "@interfaces/companies";
import { useCompanies } from "@queries/companies";
import { queryClient } from "@services/queryClient";
import { useMutation } from "@tanstack/react-query";

export interface CompanyProps {
	name: string;
}

export const useCreateCompany = () => {
	return useMutation(
		async (data: CompanyProps) => {
			return {
				id: Math.random().toFixed(3),
				name: data.name,
			};
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData([COMPANIES], (prevData: any) => [
					...prevData,
					data,
				]);
			},
		},
	);
};

interface UseUpdateCompanyProps {
	companyData: Company;
}

export const useUpdateCompany = ({ companyData }: UseUpdateCompanyProps) => {
	const { data: companies } = useCompanies({ name: "" });

	return useMutation(
		async (data: Company) => {
			return {
				...companyData,
				name: data.name ? data.name : companyData.name,
			};
		},
		{
			onSuccess: (data) => {
				const assetToEditIndex = companies?.findIndex(
					(company) => company.id === companyData.id,
				);

				if (companies && assetToEditIndex !== undefined) {
					companies[assetToEditIndex] = data;

					queryClient.setQueryData([COMPANIES], () => companies);
				}
			},
		},
	);
};

export const useDeleteCompany = () => {
	const { data: companies } = useCompanies({ name: "" });

	return useMutation(async (data: Company) => data, {
		onSuccess: (data) => {
			const companiesNotBeDelete = companies?.filter(
				(company) => company.id !== data.id,
			);

			queryClient.setQueryData([COMPANIES], () => companiesNotBeDelete);
		},
	});
};
