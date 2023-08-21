import { HStack, Icon, Td } from "@chakra-ui/react";
import { TData } from "@components/Table/TData";
import { TRead } from "@components/Table/TRead";
import { Unit } from "@interfaces/units";
import { useNavigate } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";
import { TbTrash } from "react-icons/tb";
import { Action, ModalAction } from "@hooks/useModal";
import { Dispatch } from "react";

interface UnitItemProps {
	data: Unit;
	dispatch: Dispatch<Action>;
	onSetUnitInfo: () => void;
}

export const UnitItem = ({ data, dispatch, onSetUnitInfo }: UnitItemProps) => {
	const navigate = useNavigate();

	const handleOpenEdit = (e: React.MouseEvent) => {
		e.stopPropagation();
		onSetUnitInfo();
		dispatch({ type: ModalAction.EDIT });
	};

	const handleOpenDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		onSetUnitInfo();
		dispatch({ type: ModalAction.DELETE });
	};

	return (
		<TRead onClick={() => navigate(`/unidades/${data.id}`)}>
			<TData>{data.id}</TData>
			<TData>{data.name}</TData>
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
