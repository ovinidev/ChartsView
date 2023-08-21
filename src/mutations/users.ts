/* eslint-disable @typescript-eslint/no-explicit-any */
import { USERS } from "@constants/entities";
import { User } from "@interfaces/users";
import { useUsers } from "@queries/users";
import { queryClient } from "@services/queryClient";
import { useMutation } from "@tanstack/react-query";

export interface CreateUserProps {
	name: string;
	email: string;
}

export const useCreateUser = () => {
	return useMutation(
		async (data: CreateUserProps) => {
			return {
				id: Math.random(),
				companyId: 1,
				unitId: 1,
				name: data.name,
				email: data.email,
			};
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData([USERS], (prevData: any) => [
					...prevData,
					data,
				]);
			},
		},
	);
};

interface UseUpdateUserProps {
	userData: User;
}

export const useUpdateUser = ({ userData }: UseUpdateUserProps) => {
	const { data: users } = useUsers({ name: "" });

	return useMutation(
		async (data: User) => {
			return {
				...userData,
				name: data.name ? data.name : userData.name,
				email: data.email ? data.email : userData.name,
			};
		},
		{
			onSuccess: (data) => {
				const userToEditIndex = users?.findIndex(
					(user) => user.id === userData.id,
				);

				if (users && userToEditIndex !== undefined) {
					users[userToEditIndex] = data;

					queryClient.setQueryData([USERS], () => users);
				}
			},
		},
	);
};

export const useDeleteUser = () => {
	const { data: users } = useUsers({ name: "" });

	return useMutation(async (data: User) => data, {
		onSuccess: (data) => {
			const usersNotBeDelete = users?.filter((user) => user.id !== data.id);

			queryClient.setQueryData([USERS], () => usersNotBeDelete);
		},
	});
};
