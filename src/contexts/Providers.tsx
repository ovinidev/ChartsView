import { BrowserRouter } from "react-router-dom";
import { queryClient } from "@services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@styles/theme";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SidebarProvider } from "./useSidebar";

interface ProvidersProps {
	children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme}>
				<BrowserRouter>
					<SidebarProvider>{children}</SidebarProvider>
				</BrowserRouter>
			</ChakraProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
};
