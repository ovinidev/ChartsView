import { Flex, Stack, Text } from "@chakra-ui/react";
import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { useUsers } from "@queries/users";
import { useParams } from "react-router-dom";
import { useUnitById } from "@queries/units";
import { useAssets } from "@queries/assets";
import { UnitDetailsSkeleton } from "./UnitDetailsSkeleton";
import { BackButton } from "@components/Buttons/BackButton";
import { AnimateOnRender } from "@components/Motions/AnimateOnRender";

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
			<Header />

			<AnimateOnRender>
				<BackButton />

				<Flex direction="column">
					{isLoading ? (
						<UnitDetailsSkeleton isLoading={isLoading} />
					) : (
						<Stack spacing="3" p={{ base: "1.5rem", "2xl": "2rem" }}>
							<Text fontSize="32" fontWeight={500}>
								Nome: {unit?.name}
							</Text>

							<Text fontSize="26" fontWeight={400}>
								Número de funcionários: {usersInUnit?.length}
							</Text>

							<Text fontSize="26" fontWeight={400}>
								Número de máquinas: {assetsInUnit?.length}
							</Text>

							<Text fontSize="26" fontWeight={400}>
								Usuários da unidade:
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

							<Stack>
								{assetsInUnit?.map((asset) => {
									return (
										<Text fontSize="22" key={asset.id}>
											{asset.name}
										</Text>
									);
								})}
							</Stack>
						</Stack>
					)}
				</Flex>

				<NavigationDrawer />
			</AnimateOnRender>
		</Flex>
	);
}
