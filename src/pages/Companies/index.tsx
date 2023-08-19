import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { Table, Thead, Tbody, Tr, Flex, Heading } from "@chakra-ui/react";
import { THead } from "@components/Table/THead";
import { useCompanies } from "@queries/companies";
import { CompanyItem } from "./CompanyItem";
import { TableContainer } from "@components/Table/TableContainer";

export default function Companies() {
	const { data: companies, isLoading } = useCompanies();

	return (
		<Flex direction="column">
			<Header />
			<Heading fontWeight={500} m={{ base: "1rem", "4xl": "2rem" }}>
				Unidades
			</Heading>

			{isLoading ? (
				<Heading>Carregando</Heading>
			) : (
				<TableContainer>
					<Table variant="simple" size="lg">
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
