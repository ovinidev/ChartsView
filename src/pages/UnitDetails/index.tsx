import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { useUsers } from "@queries/users";
import { useParams } from "react-router-dom";
import { useUnitById } from "@queries/units";
import { useAssets } from "@queries/assets";
import { UnitDetailsSkeleton } from "./UnitDetailsSkeleton";
import { BackButton } from "@components/Buttons/BackButton";
import { AnimateOnRender } from "@components/Motions/AnimateOnRender";
import { DetailsLegend } from "@components/DetailsLegend";

export default function UnitDetails() {
	const { unityId } = useParams();
	const { data: unit, isLoading } = useUnitById(String(unityId));
	const { data: users } = useUsers({ name: "" });
	const { data: assets } = useAssets({ name: "" });

	const usersInUnit = users?.filter((user) => {
		return user.unitId === unit?.id;
	});

	const assetsInUnit = assets?.filter((asset) => {
		return asset.unitId === unit?.id;
	});

	return (
		<Flex direction="column">
			<title>{unit?.name}</title>

			<Header />

			<AnimateOnRender>
				<BackButton />

				<Flex mt="2rem" direction="column" align="center">
					{isLoading ? (
						<UnitDetailsSkeleton isLoading={isLoading} />
					) : (
						<Stack bg="#FFF" spacing="3" p={{ base: "1.5rem", "2xl": "2rem" }}>
							<DetailsLegend label="Nome" fontSize="32">
								{unit?.name}
							</DetailsLegend>

							<DetailsLegend label="Número de funcionários" fontSize="26">
								{usersInUnit?.length}
							</DetailsLegend>

							<DetailsLegend label="Número de máquinas" fontSize="26">
								{assetsInUnit?.length}
							</DetailsLegend>

							<Text fontSize="26" fontWeight={400}>
								Usuários da unidade
							</Text>

							<Stack>
								{usersInUnit?.map((user) => {
									return (
										<Text fontSize="22" key={user.id}>
											{user.name}
										</Text>
									);
								})}
							</Stack>

							<Text fontSize="26" fontWeight={400}>
								Máquinas da unidade:
							</Text>

							<Flex gap="4" flexWrap="wrap">
								{assetsInUnit?.map((asset) => {
									return (
										<Stack spacing="4" key={asset.id}>
											<Image h="15rem" src={asset.image} alt="motor" />
											<Text fontSize="22" key={asset.id}>
												{asset.name}
											</Text>
										</Stack>
									);
								})}
							</Flex>
						</Stack>
					)}
				</Flex>

				<NavigationDrawer />
			</AnimateOnRender>
		</Flex>
	);
}
