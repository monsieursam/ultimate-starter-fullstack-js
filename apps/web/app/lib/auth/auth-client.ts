import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: `${import.meta.env.VITE_APP_URL}/api/auth`, // Base URL of your Better Auth backend.
});
