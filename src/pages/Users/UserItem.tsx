import { TData } from "@components/Table/TData";
import { TRead } from "@components/Table/TRead";
import { User } from "@interfaces/users";
import { useNavigate } from "react-router-dom";

interface UserItemProps {
	data: User;
}

export const UserItem = ({ data }: UserItemProps) => {
	const navigate = useNavigate();

	return (
		<TRead onClick={() => navigate(`/unidades/${data.id}`)}>
			<TData>{data.name}</TData>
			<TData>{data.email}</TData>
		</TRead>
	);
};
