import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { Table, Thead, Tbody, Tr, Flex } from "@chakra-ui/react";
import { THead } from "@components/Table/THead";
import { TableContainer } from "@components/Table/TableContainer";
import { useUsers } from "@queries/users";
import { UserItem } from "./UserItem";
import { Title } from "@components/Title";
import { ListSkeleton } from "@components/Skeletons/ListSkeleton";

export default function Units() {
	const { data: users, isLoading } = useUsers();

	return (
		<Flex direction="column">
			<Header />

			<Title>Usuários</Title>

			{isLoading ? (
				<ListSkeleton isLoading={isLoading} />
			) : (
				<TableContainer>
					<Table variant="simple" size={{ base: "md", "4xl": "lg" }}>
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
