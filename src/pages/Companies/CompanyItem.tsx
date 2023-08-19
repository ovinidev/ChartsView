import { TData } from "@components/Table/TData";
import { TRead } from "@components/Table/TRead";
import { Company } from "@interfaces/companies";

interface CompanyItemProps {
	data: Company;
}

export const CompanyItem = ({ data }: CompanyItemProps) => {
	return (
		<TRead
			cursor="normal"
			_hover={{
				background: "#FFF",
			}}
		>
			<TData>{data.id}</TData>
			<TData>{data.name}</TData>
		</TRead>
	);
};
