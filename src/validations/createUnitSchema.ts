import { z } from "zod";

export const createUnitSchema = z.object({
	name: z.string().min(1, { message: "Insira o nome" }),
});
