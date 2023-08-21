import { TData } from "@components/Table/TData";
import { TRead } from "@components/Table/TRead";
import { useSidebar } from "@contexts/useSidebar";
import { WorkOrder } from "@interfaces/workorders";
import { useNavigate } from "react-router-dom";

interface WorkOrderItemProps {
	data: WorkOrder;
}

export const WorkOrderItem = ({ data }: WorkOrderItemProps) => {
	const navigate = useNavigate();
	const { isDesktop } = useSidebar();

	return (
		<TRead onClick={() => navigate(`/servicos/${data.id}`)}>
			<TData>{data.title}</TData>
			{isDesktop && <TData>{data.description}</TData>}
			<TData>{data.status}</TData>
		</TRead>
	);
};
