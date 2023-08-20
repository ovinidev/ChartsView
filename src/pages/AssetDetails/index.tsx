import { Flex, HStack, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { useParams } from "react-router-dom";
import { useAssetById } from "@queries/assets";
import { HealthScoreHistoryChart } from "@components/Charts/HealthScoreHistoryChart";
import { HealthStatusHistoryChart } from "@components/Charts/HealthStatusHistoryChart";

export default function AssetDetails() {
	const { assetId } = useParams();
	const { data: asset, isLoading } = useAssetById(String(assetId));

	const lastUptime = new Date(
		String(asset?.metrics.lastUptimeAt),
	).toLocaleDateString("pt-BR", {
		timeZone: "UTC",
	});

	return (
		<Flex direction="column">
			<Header />

			<Flex direction="column">
				{isLoading ? (
					<Heading>Carregando</Heading>
				) : (
					<Stack spacing="8" p={{ base: "1.5rem", "2xl": "2rem" }}>
						<HStack spacing="8" align="flex-start">
							<Image w="20rem" src={asset?.image} alt="asset image" />

							<Stack fontWeight={400} fontSize="24">
								<Text>Nome: {asset?.name}</Text>
								<Text>Modelo: {asset?.model}</Text>
								<Text>
									Sensores:{" "}
									{asset?.sensors.map((sensor) => {
										return sensor;
									})}
								</Text>
								<Text>Status: {asset?.status}</Text>
								<Text>última atualização: {lastUptime}</Text>
								<Text>
									Atualização total da coleção:{" "}
									{asset?.metrics.totalCollectsUptime}
								</Text>
								<Text>
									Tempo de atividade total: {asset?.metrics.totalUptime}
								</Text>
								<Text>Temperatura max: {asset?.specifications.maxTemp}</Text>
								{asset?.specifications.power && (
									<Text>Força: {asset.specifications.power}</Text>
								)}
								{asset?.specifications.rpm && (
									<Text>RPM: {asset?.specifications.rpm}</Text>
								)}
							</Stack>
						</HStack>
						{asset && <HealthStatusHistoryChart data={asset} />}
						{asset && <HealthScoreHistoryChart data={asset} />}
					</Stack>
				)}
			</Flex>

			<NavigationDrawer />
		</Flex>
	);
}
