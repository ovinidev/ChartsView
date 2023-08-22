import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { useUsers } from "@queries/users";
import { useParams } from "react-router-dom";
import { useUnitById } from "@queries/units";
import { useAssets } from "@queries/assets";
import { UnitDetailsSkeleton } from "./UnitDetailsSkeleton";
import { BackButton } from "@components/Buttons/BackButton";
import { AnimateOnRender } from "@components/Motions/AnimateOnRender";
import { InfoCard } from "./InfoCard";
import { AiOutlineUser } from "react-icons/ai";
import { MdWebAsset } from "react-icons/md";

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
				{isLoading ? (
					<UnitDetailsSkeleton isLoading={isLoading} />
				) : (
					<Flex
						direction={{ base: "column", "4xl": "row" }}
						mt="2rem"
						justify="center"
						gap="3"
					>
						<Stack spacing="3">
							<Flex direction="column" bg="#FFF" p="2rem">
								<Heading fontSize="28">{unit?.name}</Heading>

								<Flex gap="4" mt="1rem">
									<InfoCard
										title="Número de funcionários"
										count={usersInUnit?.length}
										icon={AiOutlineUser}
									/>

									<InfoCard
										title="Número de Máquinas"
										count={assetsInUnit?.length}
										icon={MdWebAsset}
									/>
								</Flex>
							</Flex>

							<Flex direction="column" bg="#FFF" p="2rem">
								<Text fontSize="26" fontWeight={400}>
									Máquinas da unidade
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
							</Flex>
						</Stack>

						<Stack
							p="1.5rem"
							bg="#FFF"
							fontSize="32"
							justify={{ base: "center", "4xl": "flex-start" }}
							align="center"
						>
							<Heading fontSize="28" pb="1rem">
								Usuários
							</Heading>

							{usersInUnit?.map((user) => {
								return (
									<Flex key={user.id} w="30rem" p="1rem" bg="gray.200">
										<Text>{user.name}</Text>
									</Flex>
								);
							})}
						</Stack>
					</Flex>
				)}

				<NavigationDrawer />
			</AnimateOnRender>
		</Flex>
	);
}
