import { TData } from "@components/Table/TData";
import { TRead } from "@components/Table/TRead";
import { Asset } from "@interfaces/assets";
import { useNavigate } from "react-router-dom";

interface AssetItemProps {
	data: Asset;
}

export const AssetItem = ({ data }: AssetItemProps) => {
	const navigate = useNavigate();

	return (
		<TRead onClick={() => navigate(`/maquinas/${data.id}`)}>
			<TData>{data.name}</TData>
			<TData>{data.status}</TData>
			<TData>{data.healthscore}%</TData>
		</TRead>
	);
};
