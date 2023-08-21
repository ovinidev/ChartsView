import {
	Avatar,
	Checkbox,
	Flex,
	Heading,
	List,
	ListIcon,
	ListItem,
	Stack,
	Text,
} from "@chakra-ui/react";
import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { useUserById } from "@queries/users";
import { useParams } from "react-router-dom";
import { useWorkOrders } from "@queries/workorders";
import { BsCheckSquareFill } from "react-icons/bs";
import { UserDetailsSkeleton } from "./UserDetailsSkeleton";
import { BackButton } from "@components/Buttons/BackButton";
import { AnimateOnRender } from "@components/Motions/AnimateOnRender";

export default function UserDetails() {
	const { userId } = useParams();
	const { data: user, isLoading } = useUserById(String(userId));

	const { data: workOrders } = useWorkOrders({ title: "" });

	const userWorkOrders = workOrders?.filter((workOrder) => {
		return workOrder.assignedUserIds.includes(Number(user?.id));
	});

	return (
		<Flex direction="column">
			<title>{user?.name}</title>

			<Header />

			<AnimateOnRender>
				<BackButton />

				<Flex direction="column" align="center">
					{isLoading ? (
						<UserDetailsSkeleton isLoading={isLoading} />
					) : (
						<Stack spacing="8" p={{ base: "1.5rem", "2xl": "2rem" }}>
							<Flex direction={{ base: "column", "2xl": "row" }}>
								<Avatar name={user?.name} size="2xl" />

								<Stack
									spacing="1"
									m={{ base: "1rem 0 0", "2xl": "0 0 0 2rem" }}
									color="gray.800"
								>
									<Text fontSize={{ base: "24", "2xl": "36" }} fontWeight={400}>
										{user?.name}
									</Text>
									<Text fontSize={{ base: "24", "2xl": "36" }} fontWeight={400}>
										{user?.email}
									</Text>
								</Stack>
							</Flex>

							<Stack>
								<Heading fontWeight={500}>Tarefas</Heading>

								<List>
									{userWorkOrders?.map((workOrder) => {
										return workOrder.checklist.map((item) => {
											return (
												<ListItem
													display="flex"
													alignItems="center"
													fontSize={{ base: "18", "4xl": "20" }}
													key={item.task}
												>
													{item.completed ? (
														<ListIcon
															as={BsCheckSquareFill}
															color="green.500"
														/>
													) : (
														<Checkbox
															colorScheme="green"
															size="lg"
															mr="0.5rem"
														/>
													)}
													{item.task}
												</ListItem>
											);
										});
									})}
								</List>
							</Stack>
						</Stack>
					)}
				</Flex>

				<NavigationDrawer />
			</AnimateOnRender>
		</Flex>
	);
}
