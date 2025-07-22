import { expo } from "@better-auth/expo";
import { db, schema } from "@repo/database"; // Adjust the import path as necessary
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth: ReturnType<typeof betterAuth> = betterAuth({
	plugins: [expo()],
	trustedOrigins: ["mobile://"],
	database: drizzleAdapter(db, {
		provider: "pg", // or "pg" or "mysql"
		usePlural: true, // Use plural table names
		schema,
	}),
	emailAndPassword: {
		enabled: true,
	},
	user: {
		additionalFields: {
			revenueCatCustomerId: {
				type: "string",
				required: false,
			},
		},
	},
});
