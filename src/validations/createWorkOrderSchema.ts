import { z } from "zod";

export const createWorkOrderSchema = z.object({
	title: z.string().min(1, { message: "Insira o título" }),
	description: z.string().min(1, { message: "Insira a descrição" }),
	status: z.string(),
});
