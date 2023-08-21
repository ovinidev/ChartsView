import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { useParams } from "react-router-dom";
import { useWorkOrderById } from "@queries/workorders";

export default function WorkOrderDetails() {
	const { workOrderId } = useParams();
	const { data: workOrder, isLoading } = useWorkOrderById(String(workOrderId));

	return (
		<Flex direction="column">
			<Header />

			<Flex direction="column">
				{isLoading ? (
					<Heading>Carregando</Heading>
				) : (
					<Stack
						fontSize="24"
						spacing="2"
						p={{ base: "1.5rem", "2xl": "2rem" }}
					>
						<Text>Título: {workOrder?.title}</Text>
						<Text>Descrição: {workOrder?.description}</Text>
						<Text>Prioridade: {workOrder?.priority}</Text>
						<Text>Status: {workOrder?.status}</Text>

						<Stack mt="1rem">
							<Text>Tarefas:</Text>
							{workOrder?.checklist.map((task) => {
								return <Text key={task.task}>{task.task}</Text>;
							})}
						</Stack>
					</Stack>
				)}
			</Flex>

			<NavigationDrawer />
		</Flex>
	);
}
