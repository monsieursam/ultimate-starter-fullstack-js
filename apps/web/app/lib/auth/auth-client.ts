import { stripeClient } from "@better-auth/stripe/client";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: `${import.meta.env.VITE_API_URL}/api/auth`, // Base URL of your Better Auth backend.
	plugins: [
		stripeClient({
			subscription: true, //if you want to enable subscription management
		}),
	],
});
