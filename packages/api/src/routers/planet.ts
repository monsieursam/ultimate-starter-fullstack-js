import { os } from "@orpc/server";
import z from "zod";
import { authMiddleware } from "../middleware";

export const getAllPlanets = os.handler(async () => {
	// your list code here
	return [{ id: 1, name: "Terre" }];
});

// create a new planet only for authenticated users
export const createOnePlanet = os
	.use(authMiddleware)
	.input(z.object({ name: z.string().min(1) }))
	.handler(async ({ input }) => {
		// your create code here
		return { id: 2, name: input.name };
	});
