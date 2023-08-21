import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { Table, Thead, Tbody, Tr, Flex } from "@chakra-ui/react";
import { THead } from "@components/Table/THead";
import { useCompanies } from "@queries/companies";
import { CompanyItem } from "./CompanyItem";
import { TableContainer } from "@components/Table/TableContainer";
import { Title } from "@components/Title";
import { ListSkeleton } from "@components/Skeletons/ListSkeleton";

export default function Companies() {
	const { data: companies, isLoading } = useCompanies();

	return (
		<Flex direction="column">
			<Header />

			<Title>Empresas</Title>

			{isLoading ? (
				<ListSkeleton isLoading={isLoading} />
			) : (
				<TableContainer>
					<Table variant="simple" size={{ base: "md", "4xl": "lg" }}>
						<Thead>
							<Tr>
								<THead>Id</THead>
								<THead>Nome</THead>
							</Tr>
						</Thead>
						<Tbody>
							{companies?.map((company) => {
								return <CompanyItem key={company.id} data={company} />;
							})}
						</Tbody>
					</Table>
				</TableContainer>
			)}

			<NavigationDrawer />
		</Flex>
	);
}
