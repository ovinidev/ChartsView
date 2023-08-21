import { z } from "zod";

export const createUserSchema = z.object({
	email: z.string().email({ message: "Email inválido" }),
	name: z.string().min(1, { message: "Insira o nome" }),
});
