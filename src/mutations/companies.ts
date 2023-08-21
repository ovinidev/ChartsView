/* eslint-disable @typescript-eslint/no-explicit-any */
import { COMPANIES } from "@constants/entities";
import { Company } from "@interfaces/companies";
import { useCompanies } from "@queries/companies";
import { queryClient } from "@services/queryClient";
import { useMutation } from "@tanstack/react-query";

export interface CreateCompanyProps {
	name: string;
}

export const useCreateCompany = () => {
	return useMutation(
		async (data: CreateCompanyProps) => {
			return {
				id: Math.random(),
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
				const userToEditIndex = companies?.findIndex(
					(company) => company.id === companyData.id,
				);

				if (companies && userToEditIndex !== undefined) {
					companies[userToEditIndex] = data;

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
