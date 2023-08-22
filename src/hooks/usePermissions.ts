import { useAuth } from "@contexts/useAuth";

export const usePermissions = () => {
	const { accountInfo } = useAuth();

	const { role } = accountInfo;

	const isAdmin = role === "ADMIN";
	const isUser = role === "USER";

	return { isAdmin, isUser };
};
