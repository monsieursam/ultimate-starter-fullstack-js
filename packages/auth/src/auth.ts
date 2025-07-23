import { expo } from "@better-auth/expo";
import { db, schema } from "@repo/database"; // Adjust the import path as necessary
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth: ReturnType<typeof betterAuth> = betterAuth({
	plugins: [expo()],
	trustedOrigins: ["imagegenerator3000://", "https://appleid.apple.com"],
	database: drizzleAdapter(db, {
		provider: "pg", // or "pg" or "mysql"
		usePlural: true, // Use plural table names
		schema,
	}),
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		apple: {
			clientId: process.env.APPLE_CLIENT_ID as string,
			clientSecret: process.env.APPLE_CLIENT_SECRET as string,
			// Optional
			appBundleIdentifier: process.env.APPLE_APP_BUNDLE_IDENTIFIER as string,
		},
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
