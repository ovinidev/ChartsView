import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { Table, Thead, Tbody, Tr, Flex, Th } from "@chakra-ui/react";
import { THead } from "@components/Table/THead";
import { TableContainer } from "@components/Table/TableContainer";
import { useUsers } from "@queries/users";
import { UserItem } from "./UserItem";
import { Title } from "@components/Title";
import { ListSkeleton } from "@components/Skeletons/ListSkeleton";
import { InputSearch } from "@components/Form/InputSearch";
import { useSearch } from "@hooks/useSearch";
import { Pagination } from "@components/Pagination";
import { AnimateOnRender } from "@components/Motions/AnimateOnRender";
import { ModalAction, useModal } from "@hooks/useModal";
import { useState } from "react";
import { User } from "@interfaces/users";
import { CreateUserModal } from "@components/Modals/Users/CreateUserModal";
import { UpdateUserModal } from "@components/Modals/Users/UpdateUserModal";
import { Button } from "@components/Buttons/Button";
import { DeleteConfirmationModal } from "@components/Modals/DeleteConfirmationModal";
import { useDeleteUser } from "@mutations/users";
import { usePermissions } from "@hooks/usePermissions";

export default function Units() {
	const { isAdmin } = usePermissions();

	const { dispatch, state } = useModal();
	const { inputSearch, handleChangeDebounce } = useSearch();

	const [user, setUser] = useState({} as User);
	const { data: users, isLoading } = useUsers({ name: inputSearch });

	const { mutateAsync: deleteUser } = useDeleteUser();

	const handleDeleteUser = async () => {
		await deleteUser(user);
	};

	return (
		<Flex direction="column">
			<title>Usuários</title>

			<Header />

			<AnimateOnRender>
				<Title>Usuários</Title>

				{isLoading ? (
					<ListSkeleton isLoading={isLoading} />
				) : (
					<TableContainer>
						<Flex gap="4">
							<InputSearch handleChange={handleChangeDebounce} />

							{isAdmin && (
								<Button
									onClick={() => dispatch({ type: ModalAction.ADD })}
									text="Novo"
									bg="primary"
									color="#FFF"
								/>
							)}
						</Flex>

						<Table variant="simple" size={{ base: "md", "4xl": "lg" }}>
							<Thead>
								<Tr>
									<THead>Nome</THead>
									<THead>Email</THead>
									{isAdmin && <Th></Th>}
								</Tr>
							</Thead>
							<Tbody>
								{users?.map((user) => {
									return (
										<UserItem
											key={user.id}
											data={user}
											dispatch={dispatch}
											onSetUserInfo={() => setUser(user)}
										/>
									);
								})}
							</Tbody>
						</Table>
					</TableContainer>
				)}
			</AnimateOnRender>

			<Pagination
				mt="2rem"
				alignSelf="center"
				isLoading={isLoading}
				page={1}
				pageLength={5}
				totalItems={5}
			/>

			<NavigationDrawer />

			<CreateUserModal
				isOpen={state.modalAdd}
				onClose={() => dispatch({ type: ModalAction.CLOSE })}
			/>

			<UpdateUserModal
				userData={user}
				isOpen={state.modalEdit}
				onClose={() => dispatch({ type: ModalAction.CLOSE })}
			/>

			<DeleteConfirmationModal
				title="Deletar usuário"
				description="Tem Certeza que deseja deletar o usuário?"
				onDeleteRequest={handleDeleteUser}
				isOpen={state.modalDelete}
				onClose={() => dispatch({ type: ModalAction.CLOSE })}
			/>
		</Flex>
	);
}
