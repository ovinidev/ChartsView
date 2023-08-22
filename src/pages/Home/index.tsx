import { Flex } from "@chakra-ui/react";
import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { useAssets } from "@queries/assets";
import { AssetsHealthTable } from "./AssetsHealthTable";
import { AnimateOnRender } from "@components/Motions/AnimateOnRender";
import loadable from "@loadable/component";
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
	const { data: assets } = useAssets({ name: "" });

	return (
		<Flex direction="column" pb="2rem">
			<title>Início</title>

			<Header />

			<AnimateOnRender>
				<Flex
					direction={{ base: "column", "9xl": "row" }}
					justify={{ base: "", "4xl": "center" }}
					gap="12"
					my="2rem"
				>
					<AssetsHealthTable />

					{assets && <AssetTotalUpTimeChart data={assets} />}

					{assets && <AssetStatusChart data={assets} />}
				</Flex>

				{assets && <AssetsHealthScoreChart data={assets} />}

				<NavigationDrawer />
			</AnimateOnRender>
		</Flex>
	);
}
