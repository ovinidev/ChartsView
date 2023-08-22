import {
	Center,
	Flex,
	FormControl,
	FormErrorMessage,
	Heading,
	Image,
	Input,
	Stack,
	Text,
} from "@chakra-ui/react";
import { Button } from "@components/Buttons/Button";
import { LoginProps, useAuth } from "@contexts/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@validations/loginSchema";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginProps>({
		resolver: zodResolver(loginSchema),
	});

	const { signIn } = useAuth();

	const onSubmit: SubmitHandler<LoginProps> = (data) => {
		signIn(data);
	};

	return (
		<Center
			h="100vh"
			bg="linear-gradient(63.34deg,#2563eb -.49%,rgba(37,98,233,.961367) -.49%,rgba(37,98,232,.938459) 1.64%,rgba(30,60,142,.997332) 85.95%,#1e3a8a 100%,rgba(39,90,213,.572666) 100%,rgba(42,78,183,0) 100%),#ffffff"
		>
			<title>Login</title>
			<Flex
				direction={{ base: "column", "2xl": "row" }}
				w="90%"
				justify="center"
			>
				<Center
					bg="rgba(255,255,255,.17)"
					h="22.5rem"
					w={{ base: "100%", "2xl": "28rem" }}
				>
					<Image
						src="https://app.tractian.com/static/assets/img/tractian-login-6a65ea1f.svg"
						alt="image"
						w="100%"
					/>
				</Center>

				<Stack
					as="form"
					onSubmit={handleSubmit(onSubmit)}
					w={{ base: "100%", "2xl": "18.3rem" }}
					spacing="8"
					bg="#FFF"
					justify="center"
					px="1.3rem"
					py={{ base: "4rem", "2xl": "0" }}
				>
					<Heading textTransform="uppercase" alignSelf="center" fontSize="24">
						Login
					</Heading>

					<Text alignSelf="center" fontSize="16">
						Insira seu e-mail cadastrado
					</Text>

					<FormControl isInvalid={!!errors.email}>
						<Input
							size="sm"
							borderRadius="0"
							border="1px solid #000"
							placeholder="E-mail cadastrado"
							_placeholder={{
								color: "gray.400",
							}}
							w="100%"
							focusBorderColor="gray.600"
							transition="all 0.5s ease"
							type="email"
							_hover={{
								filter: "brightness(0.9)",
							}}
							{...register("email")}
						/>
						<FormErrorMessage fontSize="16">
							{errors.email?.message}
						</FormErrorMessage>
					</FormControl>

					<Button
						size="sm"
						type="submit"
						borderRadius="0"
						bg="#2563eb"
						color="#FFF"
						text="Acessar"
						w="100%"
					/>
				</Stack>
			</Flex>
		</Center>
	);
}
