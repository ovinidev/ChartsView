import { Flex, Heading, Stack } from "@chakra-ui/react";
import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { useParams } from "react-router-dom";
import { useAssetById } from "@queries/assets";
import { HealthHistoryCharts } from "@components/Charts/HealthHistoryCharts";

export default function AssetDetails() {
	const { assetId } = useParams();
	const { data: asset, isLoading } = useAssetById(String(assetId));

	return (
		<Flex direction="column">
			<Header />

			<Flex direction="column">
				{isLoading ? (
					<Heading>Carregando</Heading>
				) : (
					<Stack spacing="8" p={{ base: "1.5rem", "2xl": "2rem" }}>
						{asset && <HealthHistoryCharts data={asset} />}
					</Stack>
				)}
			</Flex>

			<NavigationDrawer />
		</Flex>
	);
}
