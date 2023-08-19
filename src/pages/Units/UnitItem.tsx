import { TData } from "@components/Table/TData";
import { TRead } from "@components/Table/TRead";
import { Unit } from "@interfaces/units";
import { useNavigate } from "react-router-dom";

interface UnitItemProps {
	data: Unit;
}

export const UnitItem = ({ data }: UnitItemProps) => {
	const navigate = useNavigate();

	return (
		<TRead onClick={() => navigate(`/unidades/${data.id}`)}>
			<TData>{data.id}</TData>
			<TData>{data.name}</TData>
		</TRead>
	);
};
