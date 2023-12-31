import { TData } from "@components/Table/TData";
import { TRead } from "@components/Table/TRead";
import { Company } from "@interfaces/companies";
import { HStack, Icon, Td } from "@chakra-ui/react";
import { RiPencilFill } from "react-icons/ri";
import { TbTrash } from "react-icons/tb";
import { Action, ModalAction } from "@hooks/useModal";
import { Dispatch } from "react";
import { usePermissions } from "@hooks/usePermissions";
interface CompanyItemProps {
	data: Company;
	dispatch: Dispatch<Action>;
	onSetCompanyInfo: () => void;
}

export const CompanyItem = ({
	data,
	dispatch,
	onSetCompanyInfo,
}: CompanyItemProps) => {
	const { isAdmin } = usePermissions();

	const handleOpenEdit = (e: React.MouseEvent) => {
		e.stopPropagation();
		onSetCompanyInfo();
		dispatch({ type: ModalAction.EDIT });
	};

	const handleOpenDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		onSetCompanyInfo();
		dispatch({ type: ModalAction.DELETE });
	};

	return (
		<TRead
			cursor="normal"
			_hover={{
				background: "gray.50",
			}}
		>
			<TData>{data.id}</TData>
			<TData>{data.name}</TData>
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
