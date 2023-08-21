import { Flex, Stack } from "@chakra-ui/react";
import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { useWorkOrders } from "@queries/workorders";
import { AssetStatusCountItem } from "./AssetStatusCountItem";
import { useAssets } from "@queries/assets";
import { AssetStatusChart } from "@components/Charts/AssetStatusChart";
import { AssetsStatusContainer } from "./AssetsStatusContainer";
import { AssetStatusCountSkeleton } from "./AssetStatusCountItem/AssetStatusCountSkeleton";
import { AssetsHealthTable } from "./AssetsHealthTable";
import { AnimateOnRender } from "@components/Motions/AnimateOnRender";

export default function Home() {
	const { data: workOrders, isLoading: isWorkOrdersLoading } = useWorkOrders({
		title: "",
	});
	const { data: assets } = useAssets({ name: "" });

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

			<AnimateOnRender>
				<Stack spacing="12">
					{isWorkOrdersLoading ? (
						<AssetStatusCountSkeleton isLoading={isWorkOrdersLoading} />
					) : (
						<AssetsStatusContainer>
							<AssetStatusCountItem
								title="Completados"
								statusCount={completedCount}
							/>
							<AssetStatusCountItem
								title="Em progresso"
								statusCount={inProgressCount}
							/>
							<AssetStatusCountItem title="Falhos" statusCount={failedCount} />
						</AssetsStatusContainer>
					)}

					<Flex
						direction={{ base: "column", "4xl": "row" }}
						align={{ base: "", "4xl": "center" }}
						justify="center"
					>
						{assets && <AssetStatusChart data={assets} />}

						<AssetsHealthTable />
					</Flex>
				</Stack>

				<NavigationDrawer />
			</AnimateOnRender>
		</Flex>
	);
}
