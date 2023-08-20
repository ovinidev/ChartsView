import { Flex, Heading, Stack } from "@chakra-ui/react";
import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { useWorkOrders } from "@queries/workorders";
import { WorkOrderStatusItem } from "./WorkOrderStatusItem";
import { useAssets } from "@queries/assets";
import { AssetStatusChart } from "@components/Charts/AssetStatusChart";

export default function Home() {
	const { data: workOrders, isLoading: isWorkOrdersLoading } = useWorkOrders();
	const { data: assets, isLoading: isAssetsLoading } = useAssets();

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
		<Flex direction="column">
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
						<WorkOrderStatusItem
							title="Completados"
							statusCount={completedCount}
						/>
						<WorkOrderStatusItem
							title="Em progresso"
							statusCount={inProgressCount}
						/>
						<WorkOrderStatusItem title="Falhos" statusCount={failedCount} />
					</Flex>
				)}

				{assets && <AssetStatusChart data={assets} />}
			</Stack>

			<NavigationDrawer />
		</Flex>
	);
}
