import { useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SidebarContextData {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	isMobile?: boolean;
	isDesktop?: boolean;
}

interface SidebarProviderProps {
	children: ReactNode;
}

const SidebarContext = createContext({} as SidebarContextData);

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const isMobile = useBreakpointValue({
		base: true,
		"4xl": false,
	});

	const isDesktop = useBreakpointValue({
		base: false,
		"4xl": true,
	});

	const { pathname } = useLocation();

	useEffect(() => {
		onClose();
	}, [pathname, isMobile]);

	return (
		<SidebarContext.Provider
			value={{
				isOpen,
				onOpen,
				onClose,
				isMobile,
				isDesktop,
			}}
		>
			{children}
		</SidebarContext.Provider>
	);
};

export const useSidebar = () => {
	const context = useContext(SidebarContext);

	if (!context) {
		throw new Error("useSidebar must be used within an SidebarProvider");
	}

	return context;
};
