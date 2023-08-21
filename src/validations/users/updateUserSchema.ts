import { z } from "zod";

export const updateUserSchema = z.object({
	email: z.string().email({ message: "Email inválido" }).optional(),
	name: z.string().optional(),
});
