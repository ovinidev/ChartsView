import { Flex, Image, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAssetById } from "@queries/assets";
import { Button } from "@components/Buttons/Button";
import { DetailsLegend } from "@components/DetailsLegend";

interface AssetInfosProps {
	onOpen: () => void;
}

export const AssetInfos = ({ onOpen }: AssetInfosProps) => {
	const { assetId } = useParams();
	const { data: asset } = useAssetById(String(assetId));

	const lastUptime = new Date(
		String(asset?.metrics.lastUptimeAt),
	).toLocaleDateString("pt-BR", {
		timeZone: "UTC",
	});

	return (
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
				align={{ base: "center", "4xl": "flex-start" }}
			>
				<Image w="20rem" src={asset?.image} alt="asset image" />

				<Stack fontWeight={400} fontSize="18">
					<DetailsLegend label="Nome">{asset?.name}</DetailsLegend>
					<DetailsLegend label="Modelo">{asset?.model}</DetailsLegend>
					<DetailsLegend label="Sensores">
						{asset?.sensors.map((sensor) => {
							return sensor;
						})}
					</DetailsLegend>
					<DetailsLegend label="Status">{asset?.status}</DetailsLegend>
					<DetailsLegend label="Ultima atualização">{lastUptime}</DetailsLegend>
					<DetailsLegend label="Atualização total da coleção">
						{asset?.metrics.totalCollectsUptime}
					</DetailsLegend>
					<DetailsLegend label="Tempo de atividade total">
						{asset?.metrics.totalUptime.toFixed(2)}
					</DetailsLegend>
					{asset?.specifications.power && (
						<DetailsLegend label="Força">
							{asset.specifications.power}
						</DetailsLegend>
					)}
					{asset?.specifications.rpm && (
						<DetailsLegend label="RPM">
							{asset?.specifications.rpm}
						</DetailsLegend>
					)}

					<Button bg="primary" color="white" text="Status" onClick={onOpen} />
				</Stack>
			</Flex>
		</Stack>
	);
};
