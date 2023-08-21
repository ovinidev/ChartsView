import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
} from "@chakra-ui/react";
import { HealthStatusTimeLine } from "./HealthStatusTimeLine";

interface TimelineDrawerProps {
	isOpen: boolean;
	onClose: () => void;
}

export const TimelineDrawer = ({ isOpen, onClose }: TimelineDrawerProps) => {
	return (
		<Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
			<DrawerOverlay />
			<DrawerContent borderLeftRadius="24px" color="gray.900">
				<DrawerCloseButton />
				<DrawerHeader fontSize="2rem" color="gray.900">
					Status por período
				</DrawerHeader>

				<DrawerBody p="0">
					<HealthStatusTimeLine />
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
