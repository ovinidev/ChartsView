import { getUserById, getUsers } from "@api/users";
import { USERS } from "@constants/entities";
import { STALE_TIME } from "@constants/staleTime";
import { useQuery } from "@tanstack/react-query";

interface UseUsersProps {
	name: string;
}

export const useUsers = ({ name }: UseUsersProps) => {
	return useQuery(
		[USERS],
		async () => {
			const data = await getUsers();

			return data;
		},
		{
			staleTime: STALE_TIME,
			select: (item) =>
				item.filter((unit) => {
					if (name.length === 0) return unit;
					return unit.name
						.toLocaleLowerCase()
						.includes(name.toLocaleLowerCase());
				}),
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
