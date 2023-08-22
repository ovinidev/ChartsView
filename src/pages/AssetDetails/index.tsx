import { Flex, Stack, useDisclosure } from "@chakra-ui/react";
import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { useParams } from "react-router-dom";
import { useAssetById } from "@queries/assets";
import { AssetDetailsSkeleton } from "./AssetDetailsSkeleton";
import { BackButton } from "@components/Buttons/BackButton";
import { AnimateOnRender } from "@components/Motions/AnimateOnRender";
import { TimelineDrawer } from "@components/Drawers/TimelineDrawer";
import loadable from "@loadable/component";
import { AssetInfos } from "./AssetInfos";
import { AssetProgress } from "./AssetProgress";
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
							<AssetInfos onOpen={onOpen} />

							<AssetProgress />
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
