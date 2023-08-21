import { Flex, Image, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { useParams } from "react-router-dom";
import { useAssetById } from "@queries/assets";
import { AssetHealthScoreHistoryChart } from "@components/Charts/AssetHealthScoreHistoryChart";
import { AssetMaxTempChart } from "@components/Charts/AssetMaxTempChart";
import { AssetDetailsSkeleton } from "./AssetDetailsSkeleton";
import { BackButton } from "@components/Buttons/BackButton";
import { AnimateOnRender } from "@components/Motions/AnimateOnRender";
import { TimelineDrawer } from "@components/Drawers/TimelineDrawer";
import { Button } from "@components/Buttons/Button";

export default function AssetDetails() {
	const { isOpen, onOpen, onClose } = useDisclosure();
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

			<AnimateOnRender>
				<BackButton />

				<Flex direction="column" align="center">
					{isLoading ? (
						<AssetDetailsSkeleton isLoading={isLoading} />
					) : (
						<Stack
							mt="1rem"
							bg="#FFF"
							borderRadius="8px"
							spacing="8"
							p={{ base: "1.5rem", "2xl": "2rem" }}
						>
							<Flex
								direction={{ base: "column", "4xl": "row" }}
								gap="8"
								align="flex-start"
							>
								<Image w="20rem" src={asset?.image} alt="asset image" />

								<Stack fontWeight={400} fontSize="24">
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
									<Text>
										<b>Temperatura max:</b> {asset?.specifications.maxTemp}
									</Text>
									{asset?.specifications.power && (
										<Text>Força: {asset.specifications.power}</Text>
									)}
									{asset?.specifications.rpm && (
										<Text>
											<b>RPM:</b> {asset?.specifications.rpm}
										</Text>
									)}
								</Stack>

								<Button
									bg="primary"
									color="white"
									text="Status"
									onClick={onOpen}
								/>
							</Flex>
						</Stack>
					)}
				</Flex>

				<Stack mt="2rem" spacing="4" px={{ base: "0", "4xl": "5rem" }}>
					{asset && <AssetMaxTempChart data={asset} />}
					{asset && <AssetHealthScoreHistoryChart data={asset} />}
				</Stack>

				<NavigationDrawer />
				<TimelineDrawer isOpen={isOpen} onClose={onClose} />
			</AnimateOnRender>
		</Flex>
	);
}
