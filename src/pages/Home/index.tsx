import {
	Flex,
	Heading,
	Stack,
	Table,
	Thead,
	Tbody,
	Tr,
	TableCaption,
} from "@chakra-ui/react";
import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { useWorkOrders } from "@queries/workorders";
import { AssetStatusCountItem } from "./AssetStatusCountItem";
import { useAssets } from "@queries/assets";
import { AssetStatusChart } from "@components/Charts/AssetStatusChart";
import { TableContainer } from "@components/Table/TableContainer";
import { THead } from "@components/Table/THead";
import { TData } from "@components/Table/TData";

export default function Home() {
	const { data: workOrders, isLoading: isWorkOrdersLoading } = useWorkOrders();
	const { data: assets } = useAssets();

	const completedCount = workOrders?.filter(
		(workOrder) => workOrder.status === "completed",
	).length;

	const inProgressCount = workOrders?.filter(
		(workOrder) => workOrder.status === "in progress",
	).length;

	const failedCount = workOrders?.filter(
		(workOrder) => workOrder.status === "failed",
	).length;

	return (
		<Flex direction="column" pb="2rem">
			<Header />

			<Stack spacing="12">
				{isWorkOrdersLoading ? (
					<Heading>Carregando</Heading>
				) : (
					<Flex
						direction={{ base: "column", "4xl": "row" }}
						mt="3rem"
						gap="4"
						justify="center"
						align="center"
					>
						<AssetStatusCountItem
							title="Completados"
							statusCount={completedCount}
						/>
						<AssetStatusCountItem
							title="Em progresso"
							statusCount={inProgressCount}
						/>
						<AssetStatusCountItem title="Falhos" statusCount={failedCount} />
					</Flex>
				)}

				<Flex
					direction={{ base: "column", "4xl": "row" }}
					align={{ base: "", "4xl": "center" }}
					justify="center"
				>
					{assets && <AssetStatusChart data={assets} />}

					<TableContainer align="center">
						<Table variant="striped" size="lg">
							<Thead>
								<Tr>
									<THead>Nome</THead>
									<THead>Modelo</THead>
									<THead>Saúde</THead>
								</Tr>
							</Thead>
							<Tbody>
								{assets?.map((asset) => {
									return (
										<Tr key={asset.id}>
											<TData>{asset.name}</TData>
											<TData>{asset.model}</TData>
											<TData>{asset.healthscore}%</TData>
										</Tr>
									);
								})}
							</Tbody>
						</Table>
					</TableContainer>
				</Flex>
			</Stack>

			<NavigationDrawer />
		</Flex>
	);
}
