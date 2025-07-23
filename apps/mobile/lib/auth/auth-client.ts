import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/auth`, // Base URL of your Better Auth backend.
});
