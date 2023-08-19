import { axiosInstance } from "./axiosInstance";
import { USERS } from "@constants/entities";
import { User } from "@interfaces/users";

export const getUsers = async () => {
	const { data } = await axiosInstance.get<User[]>(USERS);

	return data;
};

export const getUserById = async (id: string) => {
	const { data } = await axiosInstance.get<User>(`${USERS}/${id}`);

	return data;
};
