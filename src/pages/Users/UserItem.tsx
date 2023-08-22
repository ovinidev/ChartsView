import { HStack, Icon, Td } from "@chakra-ui/react";
import { TData } from "@components/Table/TData";
import { TRead } from "@components/Table/TRead";
import { User } from "@interfaces/users";
import { useNavigate } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";
import { TbTrash } from "react-icons/tb";
import { Action, ModalAction } from "@hooks/useModal";
import { Dispatch } from "react";
import { usePermissions } from "@hooks/usePermissions";

interface UserItemProps {
	data: User;
	dispatch: Dispatch<Action>;
	onSetUserInfo: () => void;
}

export const UserItem = ({ data, dispatch, onSetUserInfo }: UserItemProps) => {
	const { isAdmin } = usePermissions();

	const navigate = useNavigate();

	const handleOpenEdit = (e: React.MouseEvent) => {
		e.stopPropagation();
		onSetUserInfo();
		dispatch({ type: ModalAction.EDIT });
	};

	const handleOpenDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		onSetUserInfo();
		dispatch({ type: ModalAction.DELETE });
	};

	return (
		<TRead onClick={() => navigate(`/usuarios/${data.id}`)}>
			<TData>{data.name}</TData>
			<TData>{data.email}</TData>
			{isAdmin && (
				<Td>
					<HStack spacing="4">
						<Icon
							fontSize="26"
							color="gray.700"
							as={RiPencilFill}
							onClick={handleOpenEdit}
							cursor="pointer"
						/>

						<Icon
							fontSize="26"
							color="gray.700"
							as={TbTrash}
							onClick={handleOpenDelete}
							cursor="pointer"
						/>
					</HStack>
				</Td>
			)}
		</TRead>
	);
};
