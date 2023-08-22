import {
	Checkbox,
	Flex,
	List,
	ListIcon,
	ListItem,
	Stack,
	Text,
} from "@chakra-ui/react";
import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { useParams } from "react-router-dom";
import { useWorkOrderById } from "@queries/workorders";
import { WorkOrderDetailsSkeleton } from "./WorkOrderDetailsSkeleton";
import { BackButton } from "@components/Buttons/BackButton";
import { AnimateOnRender } from "@components/Motions/AnimateOnRender";
import { DetailsLegend } from "@components/DetailsLegend";
import { BsCheckSquareFill } from "react-icons/bs";

export default function WorkOrderDetails() {
	const { workOrderId } = useParams();
	const { data: workOrder, isLoading } = useWorkOrderById(String(workOrderId));

	return (
		<Flex direction="column">
			<title>{workOrder?.title}</title>

			<Header />

			<AnimateOnRender>
				<BackButton />

				<Flex direction="column" align="center" mt="2rem">
					{isLoading ? (
						<WorkOrderDetailsSkeleton isLoading={isLoading} />
					) : (
						<Stack
							fontSize="24"
							spacing="2"
							p={{ base: "1.5rem", "2xl": "2rem" }}
							bg="#FFF"
						>
							<DetailsLegend label="Título"> {workOrder?.title}</DetailsLegend>
							<DetailsLegend label="Descrição">
								{" "}
								{workOrder?.description}
							</DetailsLegend>
							<DetailsLegend label="Prioridade">
								{" "}
								{workOrder?.priority}
							</DetailsLegend>
							<DetailsLegend label="Status"> {workOrder?.status}</DetailsLegend>

							<Stack mt="1rem">
								<Text>Tarefas:</Text>
								{workOrder?.checklist.map((task) => {
									return <Text key={task.task}>{task.task}</Text>;
								})}
							</Stack>

							<List>
								{workOrder?.checklist?.map((workOrder) => {
									return (
										<ListItem
											display="flex"
											alignItems="center"
											fontSize={{ base: "18", "4xl": "20" }}
											key={workOrder.task}
										>
											{workOrder.completed ? (
												<ListIcon as={BsCheckSquareFill} color="green.500" />
											) : (
												<Checkbox colorScheme="green" size="lg" mr="0.5rem" />
											)}
											{workOrder.task}
										</ListItem>
									);
								})}
							</List>
						</Stack>
					)}
				</Flex>

				<NavigationDrawer />
			</AnimateOnRender>
		</Flex>
	);
}
