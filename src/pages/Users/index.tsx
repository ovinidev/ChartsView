import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { Table, Thead, Tbody, Tr, Flex, Heading } from "@chakra-ui/react";
import { THead } from "@components/Table/THead";
import { TableContainer } from "@components/Table/TableContainer";
import { useUsers } from "@queries/users";
import { UserItem } from "./UserItem";

export default function Units() {
	const { data: users, isLoading } = useUsers();

	return (
		<Flex direction="column">
			<Header />
			<Heading fontWeight={500} m={{ base: "1rem", "4xl": "2rem" }}>
				Usuários
			</Heading>

			{isLoading ? (
				<Heading>Carregando</Heading>
			) : (
				<TableContainer>
					<Table variant="simple" size="lg">
						<Thead>
							<Tr>
								<THead>Nome</THead>
								<THead>Email</THead>
							</Tr>
						</Thead>
						<Tbody>
							{users?.map((user) => {
								return <UserItem key={user.id} data={user} />;
							})}
						</Tbody>
					</Table>
				</TableContainer>
			)}

			<NavigationDrawer />
		</Flex>
	);
}
