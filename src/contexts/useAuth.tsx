import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@services/queryClient";
import { LOCAL_STORAGE_KEY } from "@constants/localStorageKey";

export interface LoginProps {
	email: string;
}

interface AccountInfoProps {
	isAuthenticated: boolean;
	email: string;
	role: string;
}

interface AuthProviderProps {
	children: ReactNode;
}

interface AuthData {
	signIn: ({ email }: LoginProps) => Promise<void>;
	signOut: () => void;
	accountInfo: AccountInfoProps;
	handleIsLoading: (state: boolean) => void;
	isLoading: boolean;
}

const emails = ["admin@charts.com", "user@charts.com"];

const AuthContext = createContext({} as AuthData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

	const handleIsLoading = (state: boolean) => {
		setIsLoading(state);
	};

	const [accountInfo, setAccountInfo] = useState<AccountInfoProps>({
		isAuthenticated: false,
		email: "",
		role: "",
	});

	const signIn = async ({ email }: LoginProps) => {
		try {
			handleIsLoading(true);

			if (!emails.includes(email)) return;

			setAccountInfo({
				isAuthenticated: true,
				email,
				role: email.includes("admin") ? "ADMIN" : "USER",
			});

			localStorage.setItem(
				LOCAL_STORAGE_KEY,
				JSON.stringify({
					isAuthenticated: true,
					email,
					role: email.includes("admin") ? "ADMIN" : "USER",
				}),
			);

			navigate("/");
		} catch (err: any) {
			throw new Error(err.message);
		} finally {
			handleIsLoading(false);
		}
	};

	const signOut = () => {
		localStorage.removeItem(LOCAL_STORAGE_KEY);

		setAccountInfo({
			isAuthenticated: false,
			email: "",
			role: "",
		});

		queryClient.removeQueries();

		navigate("/");
	};

	useEffect(() => {
		(async function loadAuthState(): Promise<void> {
			try {
				handleIsLoading(true);

				const storage = localStorage.getItem(LOCAL_STORAGE_KEY);

				if (storage) {
					const { email, role } = JSON.parse(storage) as AccountInfoProps;

					setAccountInfo({
						isAuthenticated: true,
						email,
						role,
					});
				}
			} catch {
				signOut();
			} finally {
				handleIsLoading(false);
			}
		})();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				signIn,
				signOut,
				accountInfo,
				handleIsLoading,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};
