import { getUserById, getUsers } from "@api/users";
import { USERS } from "@constants/entities";
import { STALE_TIME } from "@constants/staleTime";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
	return useQuery(
		[USERS],
		async () => {
			const data = await getUsers();

			return data;
		},
		{
			staleTime: STALE_TIME,
		},
	);
};

export const useUserById = (id: string) => {
	return useQuery(
		[USERS, { id }],
		async () => {
			const data = await getUserById(id);

			return data;
		},
		{
			staleTime: STALE_TIME,
		},
	);
};
