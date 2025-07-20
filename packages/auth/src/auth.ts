import { db, schema } from "@repo/database"; // Adjust the import path as necessary
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg", // or "pg" or "mysql"
		usePlural: true, // Use plural table names
		schema,
	}),
	emailAndPassword: {
		enabled: true,
	},
});
