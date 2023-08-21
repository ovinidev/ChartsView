import {
	Flex,
	Text,
	Step,
	StepIndicator,
	StepSeparator,
	Stepper,
} from "@chakra-ui/react";
import { useAssetById } from "@queries/assets";
import { useParams } from "react-router-dom";

export const HealthStatusTimeLine = () => {
	const { assetId } = useParams();
	const { data: asset } = useAssetById(String(assetId));

	const heightBasedOnReadjustsItem = asset && asset.healthHistory.length * 95;

	return (
		<Stepper
			mt="1.5rem"
			index={0}
			size="sm"
			h={heightBasedOnReadjustsItem}
			gap="0"
			orientation="vertical"
			px="7"
		>
			{asset?.healthHistory?.map((asset) => (
				<Step key={asset.status}>
					<StepIndicator bg="#D9D9D9" border="none" />

					<Flex direction="column" color="gray.800">
						<Text fontSize="1.25rem">Status: {asset.status}</Text>
						<Text fontSize="1rem">
							em{" "}
							{new Date(asset.timestamp).toLocaleDateString("pt-BR", {
								timeZone: "UTC",
							})}
						</Text>
					</Flex>

					<StepSeparator />
				</Step>
			))}
		</Stepper>
	);
};
