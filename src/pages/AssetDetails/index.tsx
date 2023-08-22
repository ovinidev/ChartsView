import {
	Flex,
	Image,
	Progress,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { useParams } from "react-router-dom";
import { useAssetById } from "@queries/assets";
import { AssetDetailsSkeleton } from "./AssetDetailsSkeleton";
import { BackButton } from "@components/Buttons/BackButton";
import { AnimateOnRender } from "@components/Motions/AnimateOnRender";
import { TimelineDrawer } from "@components/Drawers/TimelineDrawer";
import { Button } from "@components/Buttons/Button";
import loadable from "@loadable/component";
const AssetHealthScoreHistoryChart = loadable(
	() => import("@components/Charts/AssetHealthScoreHistoryChart"),
);
const AssetMaxTempChart = loadable(
	() => import("@components/Charts/AssetMaxTempChart"),
);

export default function AssetDetails() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { assetId } = useParams();
	const { data: asset, isLoading } = useAssetById(String(assetId));

	const lastUptime = new Date(
		String(asset?.metrics.lastUptimeAt),
	).toLocaleDateString("pt-BR", {
		timeZone: "UTC",
	});

	const setColorBasedOnHeath = () => {
		if (asset) {
			if (asset?.healthscore <= 50) return "red";

			if (asset.healthscore > 50 && asset.healthscore < 70) return "yellow";

			return "green";
		}
	};

	return (
		<Flex direction="column">
			<title>{asset?.name}</title>
			<Header />

			<AnimateOnRender>
				<BackButton />

				<Flex direction="column" align="center">
					{isLoading ? (
						<AssetDetailsSkeleton isLoading={isLoading} />
					) : (
						<Flex
							direction={{ base: "column", "7xl": "row" }}
							mt="1rem"
							gap="4"
						>
							<Stack
								bg="#FFF"
								borderRadius="8px"
								spacing="8"
								align="center"
								p={{ base: "1.5rem", "2xl": "2rem" }}
								w={{ base: "25rem", xl: "30rem", "4xl": "45rem" }}
							>
								<Flex
									direction={{ base: "column", "7xl": "row" }}
									gap="8"
									align="flex-start"
								>
									<Image w="20rem" src={asset?.image} alt="asset image" />

									<Stack fontWeight={400} fontSize="18">
										<Text>
											<b>Nome:</b> {asset?.name}
										</Text>
										<Text>
											<b>Modelo:</b> {asset?.model}
										</Text>
										<Text>
											<b>Sensores:</b>{" "}
											{asset?.sensors.map((sensor) => {
												return sensor;
											})}
										</Text>
										<Text>
											<b>Status:</b> {asset?.status}
										</Text>
										<Text>
											<b>Ultima atualização:</b> {lastUptime}
										</Text>
										<Text>
											<b>Atualização total da coleção:</b>{" "}
											{asset?.metrics.totalCollectsUptime}
										</Text>
										<Text>
											<b>Tempo de atividade total:</b>{" "}
											{asset?.metrics.totalUptime.toFixed(2)}
										</Text>
										{asset?.specifications.power && (
											<Text>Força: {asset.specifications.power}</Text>
										)}
										{asset?.specifications.rpm && (
											<Text>
												<b>RPM:</b> {asset?.specifications.rpm}
											</Text>
										)}

										<Button
											bg="primary"
											color="white"
											text="Status"
											onClick={onOpen}
										/>
									</Stack>
								</Flex>
							</Stack>

							<Stack
								bg="#FFF"
								borderRadius="8px"
								spacing="8"
								p={{ base: "1.5rem", "7xl": "2rem" }}
								w={{ base: "100%", "7xl": "25rem" }}
							>
								<Stack>
									<Text>Saúde</Text>
									<Progress
										size="lg"
										colorScheme={setColorBasedOnHeath()}
										value={asset?.healthscore}
										borderRadius="3px"
									/>
								</Stack>

								<Stack>
									<Text>Temperatura máxima</Text>
									<Progress
										size="lg"
										colorScheme={setColorBasedOnHeath()}
										value={asset?.healthscore}
										borderRadius="3px"
									/>
								</Stack>
							</Stack>
						</Flex>
					)}

					<Stack
						w={{ base: "100%", xl: "30rem", "4xl": "55rem", "7xl": "81rem" }}
						mt="2rem"
						spacing="4"
						px={{ base: "0", "4xl": "5rem" }}
					>
						{asset && <AssetMaxTempChart data={asset} />}
						{asset && <AssetHealthScoreHistoryChart data={asset} />}
					</Stack>
				</Flex>

				<NavigationDrawer />

				<TimelineDrawer isOpen={isOpen} onClose={onClose} />
			</AnimateOnRender>
		</Flex>
	);
}
