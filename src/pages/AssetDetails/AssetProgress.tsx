import { Progress, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAssetById } from "@queries/assets";

export const AssetProgress = () => {
	const { assetId } = useParams();
	const { data: asset } = useAssetById(String(assetId));

	const setColorBasedOnHeath = () => {
		if (asset) {
			if (asset?.healthscore <= 50) return "red";

			if (asset.healthscore > 50 && asset.healthscore < 70) return "yellow";

			return "green";
		}
	};

	const setColorBasedOnTemperature = () => {
		if (asset) {
			if (asset?.healthscore <= 50) return "green";

			if (asset.healthscore > 50 && asset.healthscore < 70) return "yellow";

			return "red";
		}
	};

	return (
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
					colorScheme={setColorBasedOnTemperature()}
					value={asset?.healthscore}
					borderRadius="3px"
				/>
			</Stack>
		</Stack>
	);
};
