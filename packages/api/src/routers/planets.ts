import { os } from "@orpc/server";
import { db, schema } from "@repo/database";
import z from "zod";
import { authMiddleware } from "../middleware";

const { planets } = schema;

export const getAllPlanets = os.handler(async () => {
	// return a list of planets
	return db.query.planets.findMany();
});

// create a new planet only for authenticated users
export const createOnePlanet = os
	.use(authMiddleware)
	.input(z.object({ name: z.string().min(1) }))
	.handler(async ({ input }) => {
		// create a new planet
		return db.insert(planets).values({
			name: input.name,
		});
	});
