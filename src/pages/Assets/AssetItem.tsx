import { TData } from "@components/Table/TData";
import { TRead } from "@components/Table/TRead";
import { Action, ModalAction } from "@hooks/useModal";
import { Asset } from "@interfaces/assets";
import { Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";
import { TbTrash } from "react-icons/tb";
import { HStack, Icon, Td } from "@chakra-ui/react";

interface AssetItemProps {
	data: Asset;
	dispatch: Dispatch<Action>;
	onSetAssetInfo: () => void;
}

export const AssetItem = ({
	data,
	dispatch,
	onSetAssetInfo,
}: AssetItemProps) => {
	const navigate = useNavigate();

	const handleOpenEdit = (e: React.MouseEvent) => {
		e.stopPropagation();
		onSetAssetInfo();
		dispatch({ type: ModalAction.EDIT });
	};

	const handleOpenDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		onSetAssetInfo();
		dispatch({ type: ModalAction.DELETE });
	};

	return (
		<TRead onClick={() => navigate(`/maquinas/${data.id}`)}>
			<TData>{data.name}</TData>
			<TData>{data.status}</TData>
			<TData>{data.healthscore}%</TData>
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
		</TRead>
	);
};
