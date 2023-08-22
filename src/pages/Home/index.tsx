import { Flex } from "@chakra-ui/react";
import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { useAssets } from "@queries/assets";
import { AssetsHealthTable } from "./AssetsHealthTable";
import { AnimateOnRender } from "@components/Motions/AnimateOnRender";
import loadable from "@loadable/component";
import { AssetsHealthTableSkeleton } from "./AssetsHealthTable/AssetsHealthTableSkeleton";
const AssetStatusChart = loadable(
	() => import("@components/Charts/AssetStatusChart"),
);
const AssetsHealthScoreChart = loadable(
	() => import("@components/Charts/AssetsHealthScoreChart"),
);
const AssetTotalUpTimeChart = loadable(
	() => import("@components/Charts/AssetTotalUptimeChart"),
);

export default function Home() {
	const { data: assets, isLoading } = useAssets({ name: "" });

	return (
		<Flex direction="column" pb="2rem" align="center">
			<title>Início</title>

			<Header />

			<AnimateOnRender>
				<Flex
					direction={{ base: "column", "9xl": "row" }}
					justify={{ base: "", "4xl": "center" }}
					gap="4"
					my="2rem"
				>
					{isLoading ? (
						<AssetsHealthTableSkeleton isLoading={isLoading} />
					) : (
						<AssetsHealthTable />
					)}

					{isLoading ? (
						<AssetsHealthTableSkeleton isLoading={isLoading} />
					) : (
						assets && <AssetTotalUpTimeChart data={assets} />
					)}

					{isLoading ? (
						<AssetsHealthTableSkeleton isLoading={isLoading} />
					) : (
						assets && <AssetStatusChart data={assets} />
					)}
				</Flex>

				<NavigationDrawer />
			</AnimateOnRender>

			{assets && <AssetsHealthScoreChart data={assets} />}
		</Flex>
	);
}
