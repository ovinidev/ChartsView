import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { Table, Thead, Tbody, Tr, Flex, Th } from "@chakra-ui/react";
import { THead } from "@components/Table/THead";
import { useCompanies } from "@queries/companies";
import { CompanyItem } from "./CompanyItem";
import { TableContainer } from "@components/Table/TableContainer";
import { Title } from "@components/Title";
import { ListSkeleton } from "@components/Skeletons/ListSkeleton";
import { InputSearch } from "@components/Form/InputSearch";
import { useSearch } from "@hooks/useSearch";
import { Pagination } from "@components/Pagination";
import { AnimateOnRender } from "@components/Motions/AnimateOnRender";
import { CreateCompanyModal } from "@components/Modals/Companies/CreateCompanyModal";
import { ModalAction, useModal } from "@hooks/useModal";
import { Button } from "@components/Buttons/Button";
import { useCallback, useState } from "react";
import { Company } from "@interfaces/companies";
import { UpdateCompanyModal } from "@components/Modals/Companies/UpdateCompanyModal";
import { DeleteConfirmationModal } from "@components/Modals/DeleteConfirmationModal";
import { useDeleteCompany } from "@mutations/companies";
import { usePermissions } from "@hooks/usePermissions";

export default function Companies() {
	const { isAdmin } = usePermissions();

	const { dispatch, state } = useModal();
	const { inputSearch, handleChangeDebounce } = useSearch();

	const [company, setCompany] = useState({} as Company);
	const { data: companies, isLoading } = useCompanies({ name: inputSearch });

	const { mutateAsync: deleteCompany } = useDeleteCompany();

	const handleDeleteCompany = useCallback(async () => {
		await deleteCompany(company);
	}, []);

	return (
		<Flex direction="column">
			<title>Empresas</title>

			<Header />

			<AnimateOnRender>
				<Title>Empresas</Title>

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
									<THead>Id</THead>
									<THead>Nome</THead>
									{isAdmin && <Th></Th>}
								</Tr>
							</Thead>
							<Tbody>
								{companies?.map((company) => {
									return (
										<CompanyItem
											key={company.id}
											data={company}
											dispatch={dispatch}
											onSetCompanyInfo={() => setCompany(company)}
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

			<CreateCompanyModal
				isOpen={state.modalAdd}
				onClose={() => dispatch({ type: ModalAction.CLOSE })}
			/>

			<UpdateCompanyModal
				companyData={company}
				isOpen={state.modalEdit}
				onClose={() => dispatch({ type: ModalAction.CLOSE })}
			/>

			<DeleteConfirmationModal
				onDeleteRequest={handleDeleteCompany}
				title="Deletar empresa"
				description="Tem certeza que deseja deletar a empresa?"
				isOpen={state.modalDelete}
				onClose={() => dispatch({ type: ModalAction.CLOSE })}
			/>
		</Flex>
	);
}
