import { z } from "zod";

export const createAssetSchema = z.object({
	name: z.string().min(1, { message: "Insira o nome" }),
	status: z.string().min(1, { message: "Insira o status" }),
	healthscore: z.string().min(1, { message: "Insira a saúde da máquina" }),
});
